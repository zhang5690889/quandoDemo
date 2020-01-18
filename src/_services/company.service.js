import APIURL from './config'
import {Utility} from './Utility'

export default class CompanyService {

    constructor() {
        this.url = APIURL + "company";
        this.finvizURL = 'https://finviz.com/chart.ashx?';
    }

    searchCompany(term) {
        return fetch(this.url + '/searchCompany?term=' + term, {
            method: 'GET'
        }).then(response =>
        {
            return response.json()
        })
    }

    retrieveChart(ticker,type = 'c',isAdvanced = 0, timeFrame = 'd'){
        return this.finvizURL+Utility.buildURLQuery({
            t:ticker,
            ty:type,
            ta:isAdvanced,
            p:timeFrame
        });
    }


    updateChartType(oldLink, newType)
    {
        let oldParams = Utility.getAllUrlParams(oldLink);
        oldParams['ty'] = newType;
        return this.finvizURL+Utility.buildURLQuery(oldParams);
    }

    updateChartTimeframe(oldLink, newTimeframe) {
        let oldParams = Utility.getAllUrlParams(oldLink);
        oldParams['p'] = newTimeframe;
        return this.finvizURL+Utility.buildURLQuery(oldParams);
    }


    findCompanyDetail(ticker) {
        return fetch(this.url + '/findCompanyDetail?ticker=' + ticker, {
            method: 'GET'
        }).then(response =>
        {
            return response.json()
        })

    }

    getRelatedNews(ticker) {
        return fetch(this.url + '/getRelatedNews?ticker=' + ticker, {
            method: 'GET'
        }).then(response =>
        {
            return response.json()
        })
    }
}
