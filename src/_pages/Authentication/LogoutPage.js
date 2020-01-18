import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authenticationActions} from '../../_actions';

class LogoutPage extends Component {
    componentDidMount () {
        this.props.dispatch(authenticationActions.logout());
    }
    render() {
        return (
             <Redirect to="/" />
        );
    }
}

const connectedLogout = connect()(LogoutPage);
export { connectedLogout as LogoutPage };
