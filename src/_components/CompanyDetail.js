import React from 'react';
import CompanyService from '../_services/company.service'
import {userService} from '../_services/user.service'

class CompanyDetail extends React.Component {

    constructor(props) {
        super(props);
        this.companyService = new CompanyService();
        this.userService = userService;


        this.state = {
            chartURL: "",
            stockDetail: "",
            user: "",
            title: "",
            start: "",
            end: "",
            strategy: "",
            planners: [],
            like: false
        }

    }

    componentDidMount() {
        let user = this.userService.getLocalUser();

        this.companyService.findCompanyDetail(this.props.ticker)
            .then(company => {
                this.setState({
                    chartURL: this.companyService.retrieveChart(this.props.ticker),
                    stockDetail: company,
                    planners: [],
                    user: user,
                })
            })
    }

    updateChartType(type) {
        let newLink = this.companyService.updateChartType(this.state.chartURL, type);
        this.setState({
            chartURL: newLink
        })
    }

    updateTimeframe(type) {
        let newLink = this.companyService.updateChartTimeframe(this.state.chartURL, type);
        this.setState({
            chartURL: newLink
        })
    }

    guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    createHandler = (e) => {
        e.preventDefault();
        let plan = {
            id: this.guidGenerator(),
            title: this.state.title,
            startDate: this.state.start,
            endDate: this.state.end,
            strategyDescription: this.state.strategy
        };

        if (plan.title || plan.startDate || plan.endDate || plan.strategyDescription) {
            this.setState({
                planners: [...this.state.planners, plan]
            })
        }
    };

    deleteHandler = (planId) => {

        this.setState({
            planners: this.state.planners.filter(planner => planner.id !== planId)
        })
    };


    updateLike = () => {
        this.setState({
            like: true,
        });
    };

    deleteLike = () => {
        this.setState({
            like: false,
        })
    };

    updateTicker(ticker) {
        this.companyService.findCompanyDetail(ticker)
            .then(company => {
                this.setState({
                    chartURL: this.companyService.retrieveChart(ticker),
                    stockDetail: company,
                    planners: []
                })
            })
    }

    render() {

        return (
            <div className={"gray-body"}>


                {
                    this.state.chartURL &&
                    <div className={""}>
                        {/*<div className="row py-2 bg-dark text-light flex-wrap">*/}
                        {/*    <h2 className={"offset-1"}>Stock details</h2>*/}
                        {/*</div>*/}
                        <div className={"container marketing mb-3"}>
                            <div className="d-md-flex flex-md-equal my-md-3 pl-md-3 border-bottom">
                                <div
                                    className=" mr-md-3  px-3 px-md-5 text-center  overflow-hidden">
                                    <div className="">
                                        <div
                                            className="btn-toolbar mb-2 mb-md-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                            <div className="btn-group flex-wrap mr-2">
                                                <span className={"lead mr-2"}>Type   </span>
                                                <button className="btn btn-sm btn-outline-secondary" value={"l"}
                                                        onClick={(event) => this.updateChartType(event.target.value)}>Line
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary" value={"c"}
                                                        onClick={(event) => this.updateChartType(event.target.value)}>Candle
                                                </button>
                                                <label className={"lead ml-3 mr-3"}>Time frame </label>
                                                <button className="btn btn-sm btn-outline-secondary" value={"d"}
                                                        onClick={(event) => this.updateTimeframe(event.target.value)}>Daily
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary" value={"w"}
                                                        onClick={(event) => this.updateTimeframe(event.target.value)}>Weekly
                                                </button>
                                                <button className="btn btn-sm btn-outline-secondary" value={"m"}
                                                        onClick={(event) => this.updateTimeframe(event.target.value)}>Monthly
                                                </button>
                                                {
                                                    <button
                                                        className={"btn btn-sm btn-outline-secondary ml-2"}
                                                        onClick={() => {
                                                            this.state.like ? this.deleteLike() : this.updateLike()
                                                        }}>Like it? <span><i className={"fa fa-heart ml-1"}
                                                                             id={this.state.like ? "red-heart" : "heart"}/></span>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <img className="img-fluid rounded img-thumbnail mx-auto my-auto"
                                             src={this.state.chartURL}
                                             alt="Responsive image"/>
                                    </div>
                                </div>
                                <div className="col-md-4 blog-sidebar">
                                    <div className="p-2">
                                        <h4 className="font-italic">About</h4>
                                        <ol className="list-unstyled mb-0">
                                            <li><strong>Symbol: </strong>{this.state.stockDetail.symbol}</li>
                                            <li><strong>Name: </strong>{this.state.stockDetail.Name}</li>
                                            <li><strong>IPO year: </strong>{this.state.stockDetail.IPOyear}</li>
                                            <li><strong>Sector: </strong>{this.state.stockDetail.Sector}</li>
                                            <li><strong>Market cap: </strong>{this.state.stockDetail.marketcap}</li>
                                            <li><strong>Industry: </strong>{this.state.stockDetail.industry}</li>
                                        </ol>

                                    </div>

                                    <iframe width="219" height="302"
                                            src="http://calculator-1.com/outdoor/?f=00ff00&r=42aaff" scrolling="no"
                                            frameBorder="0"/>
                                </div>


                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.user && this.state.user.role === "Trader" &&
                    <div className={"container marketing"}>
                        <div className="d-md-flex flex-md-equal my-md-3 pl-md-3 border-bottom">


                            <div className="bg-light mr-md-3 px-3 px-md-5 overflow-hidden mb-3">
                                <h2 className={"display-5"}>Create Plan</h2>
                                <div className="my-3 py-3">
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Name</span>
                                            </div>
                                            <input className="form-control"
                                                   aria-label="With textarea"
                                                   placeholder={"New trading plan"}
                                                   id={"title"}
                                                   value={this.state.title}
                                                   onChange={(e) => this.setState({title: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">Buy</span>
                                                </div>
                                                <input type="date"
                                                       className="form-control"
                                                       aria-describedby="basic-addon1"
                                                       value={this.state.start}
                                                       id={"start"}
                                                       onChange={(e) => this.setState({start: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="input-group mb-3 ml-auto">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">Sell</span>
                                                </div>
                                                <input type="date"
                                                       className="form-control"
                                                       aria-describedby="basic-addon1"
                                                       value={this.state.end}
                                                       onChange={(e) => this.setState({end: e.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="strategy" className={""}>Strategy</label>
                                    <textarea className="form-control"
                                              aria-label="With textarea"
                                              placeholder={"Write your strategy here"}
                                              id={'strategy'}
                                              value={this.state.strategy}
                                              onChange={(e) => this.setState({strategy: e.target.value})}/>
                                    <button className={'btn btn-outline-dark my-5  float-left btn-lg'}
                                            onClick={(e) => this.resetFormHandler(e)}>Reset
                                    </button>
                                    <button className={'btn btn-outline-dark my-5  float-right btn-lg'}
                                            onClick={(e) => this.createHandler(e)}>Create
                                    </button>
                                </div>
                            </div>
                            {this.state.user && this.state.planners.length !== 0 &&
                            <div className="bg-light mr-md-3 px-3 px-md-5 overflow-hidden mb-3">
                                <h2 className={"display-5"}>Current Plans</h2>
                                <div className="my-3 p-3">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-sm table-bordered text-center">
                                            <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Buy</td>
                                                <td>Sell</td>
                                                <td>Strategy</td>
                                                <td>Delete</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.planners.map((plan, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>{plan.title}</td>
                                                                <td>{plan.startDate}</td>
                                                                <td>{plan.endDate}</td>
                                                                <td>{plan.strategyDescription.slice(0, 20)}</td>
                                                                <td>
                                                                    <button className={"btn btn-xs btn-outline-secondary"}
                                                                            onClick={() => this.deleteHandler(plan.id)}>
                                                                        <i className={"fa fa-trash fa-xs"}/>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }

    resetFormHandler(e) {
        this.setState({
            title: "",
            start: "",
            end: "",
            strategy: ""
        })
    }
}

export {CompanyDetail};



