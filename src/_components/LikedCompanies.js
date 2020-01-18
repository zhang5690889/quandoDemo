import React from "react";
import {userService} from "../_services/user.service";
import {Link} from "react-router-dom";

export default class LikedCompanies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.userService = userService;
        this.state = {
            companies: []
        }
    }

    componentDidMount() {
        this.userService.findLikedCompanies(this.props.username).then(companies =>
            this.setState({
                companies: companies,
            })
        )
    }

    deleteLike = (ticker) => {
        this.userService.deleteLikedCompanies(ticker, this.props.username).then(
            () => {
                this.userService.findLikedCompanies(this.props.username).then(
                    companies => this.setState({companies: companies,}))
            })
    };

    render() {
        return (
            <div>
                <table className="table table-hover ">
                    <thead className="thead-light">
                    <tr>
                        <th>Company</th>
                        <th>Description</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.companies.map((company, key) => {
                            return (
                                <tr key={key}>
                                    <th><Link to={'/companyDetail/' + company.symbol}
                                              target={"_blank"}> {company.symbol}</Link></th>
                                    <td><Link to={'/companyDetail/' + company.symbol}
                                              target={"_blank"}>{company.Name}</Link></td>
                                    <td>
                                        <button className={"btn btn-xs btn-danger"}
                                                onClick={() => this.deleteLike(company.symbol)}>
                                            <i className={"fa fa-trash"}/>
                                        </button>

                                    </td>
                                </tr>
                            )
                        })
                    }


                    </tbody>
                </table>
            </div>
        )
    }
}


