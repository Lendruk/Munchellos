import { mongoose } from "../utils/database";
import ObjectId from "../../../MunchiJS/src/database/mongo/ObjectId";
import { Property, getModelFromClass } from "../../../MunchiJS/src/decorators/model";

type Session = {
    date: string;
    device: string;
    os: string;
    systemVersion: string;
    appVersion: string;
};

export class SessionsModel extends mongoose.Document {
    @Property({ required: true, ref: "User" })
    user: ObjectId;

    @Property({ default: [] })
    logins: Session[];

    constructor(user: ObjectId, logins: Session[]) {
        super();
        this.user = user;
        this.logins = logins;
    }
}

const Sessions = getModelFromClass<SessionsModel>(SessionsModel);
export default Sessions;
