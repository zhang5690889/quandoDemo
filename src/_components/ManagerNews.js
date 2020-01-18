import React from "react";
import {newsService} from "../_services/news.service"
import CompanyService from "../_services/company.service";

export default class ManagerNews extends React.Component {

    constructor(props) {
        super(props);
        this.newsService = newsService;
        this.companyService = new CompanyService();
        this.state = {
            results: [],
            news: [],
            selectedNews: "",
            companies: [],
        }
    }

    componentDidMount() {
        this.newsService.getHeadlines()
            .then(headlines =>
                this.setState({
                    news: headlines.articles.slice(0, 50),
                }))
    }

    selectNews(news) {
        this.setState(
            {
                selectedNews: news,
            }
        );
        this.getRelatedCompanyByNews(news.url)
    }

    getRelatedCompanyByNews(url) {
        this.newsService.getRelatedCompanyByNews(url).then(companies => {
            this.setState(
                {
                    companies: companies,
                }
            )
        })
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

    newsRelatedTo(ticker) {

        let dto = {
            newsURL: this.state.selectedNews.url,
            newsTitle: this.state.selectedNews.title,
            ticker: ticker
        };
        this.newsService.newsRelatedTo(dto).then(companies => {
            this.setState({
                results: [],
                companies: companies
            });

        });
        document.getElementById("add-ticker-news-input").value = "";

    }

    deleteCompany(ticker) {
        let dto = {
            newsURL: this.state.selectedNews.url,
            ticker: ticker
        };
        this.newsService.deleteCompany(dto).then(companies => {
            this.setState({
                companies: companies
            });

        });
    }


    render() {
        return (
            <div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Associate news with tickers</h1>
                </div>
                {
                    this.state.news.map((news, key) => {
                            return (
                                <div key={key} className={"my-2"}>
                                    <a href={news.url} target={"_blank"}>
                                        {news.title}
                                    </a>
                                    <div>
                                        <button className={"btn btn-sm btn-outline-dark mr-5 mt-1 mb-2"}
                                                onClick={() => this.selectNews(news)}>Show All Ticker Info
                                        </button>
                                    </div>
                                    {this.state.selectedNews === news &&
                                    <div>
                                        <input className="form-control form-control-dark w-100"
                                               type="text" placeholder="Search tickers"
                                               id="add-ticker-news-input"
                                               aria-label="Search"
                                               onChange={(e) => {
                                                   this.searchHandler(e.target.value);
                                               }}/>
                                        {this.state.results.length !== 0 &&
                                        <div
                                            className="ml-auto select-search-box__select select-search-box__select--display"
                                            style={{width: "50%"}}>
                                            <ul className="select-search-box-news">
                                                {

                                                    this.state.results.map((result, key) =>
                                                        <li role="menuitem"
                                                            className="select-search-box__option select-search-box__row"
                                                            data-value="annie.cruz"
                                                            key={key}>
                                                            <a style={{color: "blue"}} onClick={() => {
                                                                this.newsRelatedTo(result.name)
                                                            }}>
                                                                <strong>{result.name}</strong> {result.value}
                                                            </a>
                                                        </li>)}
                                            </ul>


                                        </div>
                                        }
                                        {this.state.companies.length !== 0 && <div>
                                            <div className={"related-company"}> Related Company Tickers:</div>
                                            {
                                                this.state.companies.map((company, key) => {
                                                    return (
                                                    <li key={key}>
                                                        <a href={"/details/" + company} target={"_blank"}>{company}</a>
                                                        <button className={"btn fa fa-trash ml-3"}
                                                                onClick={() => this.deleteCompany(company)}/>
                                                    </li>)
                                                })}
                                        </div>}

                                    </div>}
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}







