import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import Home from './containers/Home';
import FilmDetail from './containers/FilmDetail';
import Login from './containers/Login';
import CenterMode from './containers/CenterMode';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/test" component={CenterMode}/>
                    <Route path="/film/:postId" component={FilmDetail} />
                </Switch>
            </BrowserRouter>                
        )
    }
}
