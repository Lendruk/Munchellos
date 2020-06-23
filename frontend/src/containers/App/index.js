import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Board } from '../Board';
import Homepage from '../Homepage';
import { Sidebar } from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import * as Styles from '../ContentContainer/styles';

class App extends React.Component {
    get isLoggedInUser() {
        try {
            const { user, token } = this.props.login;
            return Boolean(user && token);
        } catch (err) {
            return false;
        }
    }

    renderNotFound() {
        return (
            <>
                {/*<Route exact path="/not-found" component={NotFound} />
                <Redirect to="/not-found" />*/}
            </>
        );
    }

    renderRoutes() {
        if (!this.isLoggedInUser || !localStorage.getItem("token")) {
            return (
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Redirect to="/" />
                    {this.renderNotFound()}
                </Switch>
            );
        }

        if (this.isLoggedInUser) {
            return (
                <>
                    <DndProvider backend={HTML5Backend}>
                        <Navbar />
                        <Styles.Container>
                            <Sidebar>

                            </Sidebar>
                            <div style={{ flex: 1 }}>
                                <Switch>
                                    <Route exact path="/" component={Board} />
                                    <Redirect to="/" />
                                    {this.renderNotFound()}
                                </Switch>
                            </div>
                        </Styles.Container>
                    </DndProvider>
                </>
            );
        }
    }

    render() {
        return (
            <>
                {this.renderRoutes()}
                <ToastContainer
                    toastClassName="BBToast"
                    bodyClassName="BBToastBody"
                    hideProgressBar
                    closeButton={<></>}
                    position={toast.POSITION.BOTTOM_RIGHT}
                    autoClose={3000}
                />
            </>
        );
    }
}

App.propTypes = {
    login: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    login: state => state.login,
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(App);