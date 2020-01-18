import React from 'react';
import CompanyService from '../_services/company.service'

class SearchCompany extends React.Component {

    constructor(props) {
        super(props);
        this.courseService = new CompanyService();
        this.state = {
            searchResult: [],
            selectedCompany: ""
        }
    }

    componentDidMount() {

        // this.props.dispatch(authenticationActions.getAll());
    }

    searchCompany(term) {
        this.courseService.searchCompany(term).then(
            result => {
                this.setState({
                    searchResult: result
                });
            }
        )
    }

    retrieveChart(company) {
        this.setState({
            selectedCompany: company
        })
    }

    render() {
        return (
            <div className="mt-5 mb-2">
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-search"/></span>
                    <input className="form-control"
                           placeholder="Search By Company name or Ticker symbol"
                           onChange={(event) => this.searchCompany(event.target.value)}/>
                </div>
                {
                    this.state.searchResult.length !== 0 &&
                        <div className={"d-flex justify-content-around mt-3"}>
                            <div className={"p-2"}><h5>Ticker</h5></div>
                            <div className={"p-2"}><h5>Company</h5></div>
                            <div className={"p-2"}><h5>Summary</h5></div>
                        </div>

                }
                {
                    this.state.searchResult.map((company, key) =>
                        <div className={"row mt-2 ml-5"}
                             key={key}>
                            <div className={"col-3 ml-2"}>
                                <a href={'/companyDetail/' + company.symbol}>{company.symbol}</a>
                            </div>
                            <div className={"col-3 ml-2"}>
                                <div>{company.Name}</div>
                            </div>
                            <div className={"col-3 ml-2"}>
                                <a href={company.Summary_Quote}>{company.Summary_Quote}</a>
                            </div>
                        </div>
                    )}

            </div>


        );
    }
}

export {SearchCompany};