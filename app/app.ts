import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnection from "./utils/database";
import { ErrorManager, errors } from "./utils/errors";
import { RouteAggregator } from "./lib/classes/RouteAggregator";
import { Injector } from "./lib/classes/Injector";
import { SocketServer } from "./lib/classes/SocketServer";
import { ControllerExtractor } from "./lib/classes/ControllerExtractor";
import http from "http";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect DB
dbConnection().then(() => console.log("Database Connected..."));

// Initialize the dependecy injection
const injector = new Injector();

// Create the server
const httpServer = http.createServer(app);

const controllerExtractor = new ControllerExtractor();

// Aggregate all the controllers
const aggregator = new RouteAggregator(app, true);
controllerExtractor.addTask(aggregator.aggregateRoutes);

// const http = app.listen(4000, () => console.log("Server Listening on port 4000 "));

injector.registerService(SocketServer, httpServer);
const socketServer = Injector.instance.retrieveService(SocketServer)?.service as SocketServer;

controllerExtractor.addTask(socketServer.registerSockets);

controllerExtractor.executeTasks();

//Not Found Handler
app.use((req, res, next) => {
    console.log("request", req.get("Host")?.concat(" " + req.url));
    next(errors.NOT_FOUND);
});

//Error Handler
app.use(ErrorManager.handleError);

httpServer.listen(4000);
console.log("server listening on port 4000");
