import React from 'react'
import CompanyService from "../_services/company.service"

class HomePageSharedComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
        this.companyService = new CompanyService();
    }

    searchHandler = (term) => {
        this.companyService.searchCompany(term)
            .then(results => {
                this.setState({
                    results: results.map(r => {
                        return {name: r.symbol, value: r.Name}
                    })
                })
            });
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow " id={"logged"}>
                    <a className="navbar-brand col-sm-6 mr-0" href="/">Hello, {this.props.user.username}!</a>
                    <input className="form-control form-control-dark w-100"
                           type="text" placeholder="Search tickers"
                           aria-label="Search"
                           onChange={(e) => {
                               this.searchHandler(e.target.value);
                           }}/>
                    {this.state.results.length !== 0 &&
                    <div className="ml-auto select-search-box__select select-search-box__select--display"
                         style={{width: "50%"}}>
                        <ul className="select-search-box__options">
                            {
                                this.state.results.map((result, key) =>
                                    <li role="menuitem"
                                        className="select-search-box__option select-search-box__row"
                                        data-value="annie.cruz"
                                        key={key}>
                                        <a href={'/details/' + result.name}>
                                            <strong>{result.name}</strong> {result.value}
                                        </a>
                                    </li>)}
                        </ul>
                    </div>}
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link" href="/logout">Sign out</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default HomePageSharedComponents;

