import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from 'react-redux';

import {HomePage} from '../_pages/HomePage/HomePage';
import {LoginPage} from '../_pages/Authentication/LoginPage';
import {RegisterPage} from "../_pages/Authentication/RegisterPage";

class Routing extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                </div>
            </Router>
        );
    }
}

const connectedApp = connect()(Routing);
export {connectedApp as App};
