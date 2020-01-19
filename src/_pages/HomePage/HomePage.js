import React from 'react';
import {connect} from "react-redux";
import logo from "../../resources/logo_transparent.png";
import {newsService} from "../../_services/news.service"
import {DemoWarningBar} from "../../_components"
import {CompanyDetail} from "../../_components/CompanyDetail";

class AnonymousHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            news: [{}, {}, {}],
            selectedTicker:"AMZN"
        };
        this.newsService = newsService;

        this.CompanyDetail = React.createRef();
    }

    componentDidMount() {
        this.newsService.getHeadlines()
            .then(headlines => {
                this.setState({
                    news: headlines.articles.slice(0, 3),
                })
            })
    }

    render() {
        const symbols = ["TSLA", "AAPL", "MSFT", "AMZN", "BAC"]
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand"
                       href="#">Quando</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        {
                            <ul className="navbar-nav ml-auto" >
                                <li className="nav-item active">
                                    <a className={"nav-link"} href={"/login"}>Login <span
                                        className="sr-only">(current)</span></a>
                                </li>
                                < li className="nav-item active">
                                    <a className={"nav-link"} href={"/register"}>Register<span
                                        className="sr-only">(current)</span></a>
                                </li>

                            </ul>
                        }
                    </div>
                </nav>
                <DemoWarningBar/>
                <div className="container marketing my-auto">
                    <div className="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
                        <img src={logo} style={{width: "50%"}}/>
                        <div className="col-md-5 mx-auto">
                            <p className="lead font-weight-normal">Online planning software for hedge funds</p>
                        </div>
                    </div>

                    <div style={{textAlign: "center"}}><h4>Popular companies:</h4>
                        {
                            symbols.map((symbol, key) =>{
                                return (
                                        <a href={""} key={key} onClick={(e)=>{
                                            e.preventDefault();
                                            this.CompanyDetail.current.updateTicker(symbol);
                                        }} style={{paddingRight:"20px"}}>{symbol}</a>
                                )})
                        }
                    </div>
                    <CompanyDetail ticker ={this.state.selectedTicker} ref={this.CompanyDetail}/>

                    <hr className="featurette-divider"/>
                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">{this.state.news[0].title}</h2>
                            <p className="">{this.state.news[0].description}</p>
                            <a href={this.state.news[0].url} target={"_blank"}>Read more</a>
                        </div>
                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                 width="500" height="500" src={this.state.news[0].urlToImage}
                                 preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                                 aria-label="Placeholder: 500x500"/>
                        </div>
                    </div>

                    <hr className="featurette-divider"/>

                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">{this.state.news[1].title}</h2>
                            <p className="lead">{this.state.news[1].description}</p>
                            <a href={this.state.news[1].url} target={"_blank"}>Read more</a>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                 width="500" height="500" src={this.state.news[1].urlToImage}
                                 preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                                 aria-label="Placeholder: 500x500"/>
                        </div>
                    </div>
                    <hr className="featurette-divider"/>
                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">{this.state.news[2].title}</h2>
                            <p className="lead">{this.state.news[2].description}</p>
                            <a href={this.state.news[2].url} target={"_blank"}>Read more</a>
                        </div>
                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                 width="500" height="500" src={this.state.news[2].urlToImage}
                                 preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                                 aria-label="Placeholder: 500x500"/>
                        </div>
                    </div>
                    <hr className="featurette-divider"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    };
}

const connectedAnonHomePage = connect(mapStateToProps)(AnonymousHomePage);
export {connectedAnonHomePage as HomePage};
