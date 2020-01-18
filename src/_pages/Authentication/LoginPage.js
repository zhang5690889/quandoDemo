import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import user from "../../resources/user_dark.png"

import {DemoWarningBar} from '../../_components';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        //binding reducer
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        // if (this.state.username && this.state.password) {
        //     this.props.dispatch(authenticationActions.login(this.state.username, this.state.password));
        // }
    }

    render() {
        const {username, password, submitted} = this.state;
        return this.props.user != null ? (
                <Redirect push to="/"/>
            ) :
            (
                <div className={"container marketing my-auto"}>
                    <div className={"position-relative overflow-hidden p-3 p-md-5 text-center"}>
                        <form className="form-signin" onSubmit={this.handleSubmit}>
                            {this.props.loggedInFailed && <div className={"alert alert-danger"}>
                                Wrong username or password
                            </div>}
                            <img className="py-5" src={user} alt="" width="85"/>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input type="text" id="username"
                                   className="form-control" placeholder="Username"
                                   name="username" value={username} onChange={this.handleChange}
                                   required autoFocus/>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" id="password" className="form-control mt-2" name="password"
                                   placeholder="Password" onChange={this.handleChange} value={password}
                                   required/>
                            <button className="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
                            {submitted&&<DemoWarningBar/>}
                        </form>
                    </div>
                    <div className="text-center"><span>Create an account? </span>
                        <a href="/register" className="txt2 hov1"> Sign up</a>
                    </div>
                    <div className="text-center">
                        <a href="/" className="txt2 hov1">Quando</a>
                    </div>
                </div>
            )
    }
}

function mapStateToProps(state) {
    const {user, loggedInFailed} = state.authentication;
    return {
        user: user,
        loggedInFailed: loggedInFailed
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};
