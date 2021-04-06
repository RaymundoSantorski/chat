import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { LoggedRouter } from './LoggedRouter';

export const PublicRouter = () => {

    const { socket: name } = useSelector(state => state.sockets);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/chat/login">
                        {name ? <Redirect to="/chat/" /> : <Login />}
                    </Route>
                    <Route exact path="/chat/register">
                        {name ? <Redirect to="/chat/" /> : <Register />}
                    </Route>
                    <Route path="/chat/">
                        <LoggedRouter />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
