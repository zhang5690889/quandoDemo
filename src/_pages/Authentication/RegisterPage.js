import React from "react";
import {Redirect} from "react-router-dom";
import {userService} from "../../_services/user.service"
import {DemoWarningBar} from '../../_components';
import {connect} from "react-redux";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmedPwd: "",
            role: "",
            managerUsername: "",
            managers: "",
            submitted: false
        };
        this.userService = userService;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({submitted: true});

    };




    render() {
        const {submitted} = this.state;
        return this.props.user != null ? (
                <Redirect push to="/"/>
            ) :
            (
                <div className="container">
                    <div className={"container marketing my-auto"}>
                        <div className={"position-relative overflow-hidden p-3 p-md-5 text-center"}>
                            <form className="form-signin" onSubmit={this.handleSubmit}>
                                {
                                    this.props.registerFailed &&
                                    <div className="alert alert-danger">
                                        Username has been used
                                    </div>
                                }
                                <div className={'form-group'}>
                                    <label htmlFor="username" className={"float-left lead"}>Username</label>
                                    <input type="text"
                                           className="form-control"
                                           name="username"
                                           placeholder={"username"}
                                           onChange={(event) =>
                                               this.setState({username: event.target.value})}
                                           required/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="password" className={"float-left lead"}>Password</label>
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder={"password"}
                                           onChange={(event) => this.setState({password: event.target.value})}
                                           required/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="confirm" className={"float-left lead"}>
                                        Confirm Password
                                    </label>
                                    <input required type="password"
                                           className="form-control"
                                           name="confirm"
                                           placeholder={"password"}
                                           onChange={(event) =>
                                               this.setState({confirmedPwd: event.target.value})}/>
                                    {this.state.confirmedPwd !== this.state.password &&
                                    <div className="alert alert-danger">Password must match</div>
                                    }
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={"role"} className={"float-left lead"}>Choose your role</label>
                                    <select required
                                            className={'form-control'}
                                            name={"role"}
                                            defaultValue={"default"}
                                            onChange={(event) =>
                                                this.setState({role: event.target.value})}>
                                        <option value={"default"}>Choose your role</option>
                                        <option value={"Manager"}>
                                            Manager
                                        </option>
                                        <option value={"Trader"}>
                                            Trader
                                        </option>
                                    </select>
                                    {this.state.submitted && !this.state.role &&
                                    <div className="alert alert-danger">Role is required</div>
                                    }
                                </div>
                                {
                                    this.state.role === "Trader" &&
                                    <div className={'form-group'}>
                                        <label htmlFor={"select"} className={"float-left lead"}>Choose your
                                            manager</label>
                                        <select required className={'form-control'}
                                                name={"select"}
                                                onChange={(event) =>
                                                    this.setState({managerUsername: event.target.value})}>
                                            <option disabled selected value> -- select your manager -- </option>
                                            {this.state.managers.map(
                                                (manager, key) =>
                                                    <option key={key}
                                                            value={manager.username}>
                                                        {manager.username}
                                                    </option>
                                            )}
                                        </select>
                                        {this.state.submitted && !this.state.managerUsername &&
                                        <div className="alert alert-danger">Manager is required</div>
                                        }
                                    </div>
                                }
                                <button className="btn btn-lg btn-dark btn-block" type="submit"
                                        onSubmit={this.handleSubmit}>Register
                                </button>
                                {submitted&&<DemoWarningBar/>}
                            </form>
                        </div>
                        <div className="text-center"><span>Already have an account? </span>
                            <a href="/login" className="txt2 hov1"> Login</a>
                        </div>
                        <div className="text-center">
                            <a href="/" className="txt2 hov1">Quando</a>
                        </div>
                    </div>
                </div>
            )
    }
}

function mapStateToProps(state) {
    const {user, registerFailed} = state.authentication;
    return {
        user: user,
        registerFailed: registerFailed
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
