import React from "react";
import {userService} from '../_services/user.service'
import {Link} from "react-router-dom";


class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: {firstName: "", lastName: "", phone: "", email: ""},
            showingAlert: false,
            companies: []
        };
        this.userService = userService;
    }

    componentDidMount() {
        this.userService.findLikedCompanies(this.props.username)
            .then(companies =>
                this.userService.getUserInfoByUsername(this.props.username)
                    .then(user => this.setState({
                        companies: companies,
                        user: user
                    }))
            );
    }

    submit = () => {
        userService.updateUserProfile(this.state.user, this.state.user.username);
        this.setState({
            showingAlert: true
        });

        setTimeout(() => {
            this.setState({
                showingAlert: false
            });
        }, 2000);
    };

    deleteLike = (ticker) => {
        this.userService.deleteLikedCompanies(ticker, this.props.username).then(
            () => {
                this.userService.findLikedCompanies(this.props.username).then(
                    companies => this.setState({companies: companies}))
            })
    };


    render() {
        return (
            <div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Profile</h1>
                </div>
                {this.state.showingAlert && <div className='alert alert-success'>
                    <strong>Saved!</strong> Thank you for updating!
                </div>}
                <div className={"row"}>
                    <div className="col-md-6 order-md-1">
                        <h4 className="mb-3">Basic information</h4>
                        <div className="needs-validation">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="firstName" value={this.state.user.firstName}
                                           name="firstName"
                                           placeholder={"first name"}
                                           onChange={(event) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   firstName: event.target.value
                                               }
                                           })}/>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName"
                                           value={this.state.user.lastName}
                                           name="lastName"
                                           placeholder={"last name"}
                                           onChange={(event) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   lastName: event.target.value
                                               }
                                           })}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                       name="email" value={this.state.user.email}
                                       onChange={(event) => this.setState({
                                           user: {
                                               ...this.state.user,
                                               email: event.target.value
                                           }
                                       })}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">Email</label>
                                <input type="tel" className="form-control" id="phone" placeholder="123-456-7890"
                                       name="phone" value={this.state.user.phone}
                                       onChange={(event) => this.setState({
                                           user: {
                                               ...this.state.user,
                                               phone: event.target.value
                                           }
                                       })}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="job">Introduction</label>
                                <textarea id={'job'}
                                          className="form-control"
                                          name="job"
                                          placeholder={"About yourself"}
                                          value={this.state.user.introduction}
                                          onChange={(event) => this.setState({
                                              user: {
                                                  ...this.state.user,
                                                  introduction: event.target.value
                                              }
                                          })}/>
                            </div>
                        </div>
                        <hr className="mb-4"/>
                        {!this.props.isReadOnly &&
                        <button className="btn btn-dark btn-lg btn-block mb-3" onClick={() => this.submit()}>Update
                        </button>
                        }

                    </div>
                    {
                        this.props.role === "Trader" &&
                        <div className="col-md-6 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className={"text-muted"}>Liked companies</span>
                                <span className="badge badge-dark badge-pill">{this.state.companies.length}</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {
                                    this.state.companies.map((company, key) =>
                                        <li className="list-group-item d-flex justify-content-between lh-condensed"
                                            key={key}>
                                            <div>
                                                <Link to={'/details/' + company.symbol}
                                                      target={"_blank"}>
                                                    <h6 className="my-0">{company.symbol}</h6></Link>
                                                <small className="text-muted">{company.Name}</small>

                                            </div>
                                            <span className="text-muted">
                                            <button className={"btn btn-xs btn-outline-dark"}
                                                    onClick={() => this.deleteLike(company.symbol)}>
                                            cancel
                                        </button></span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    }
                </div>


            </div>


        )
    }
}


export {Profile}
