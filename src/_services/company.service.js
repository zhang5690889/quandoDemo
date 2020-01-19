import APIURL from './config'
import {Utility} from './Utility'

export default class CompanyService {

    constructor() {
        this.url = APIURL + "company";
        this.finvizURL = 'https://finviz.com/chart.ashx?';
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

        let data = [
            {
                symbol: 'TSLA',
                Name: 'Tesla, Inc. ',
                marketcap: '$31.89B',
                IPOyear: '2010',
                Sector: 'Capital Goods',
                industry: 'Auto Manufacturing',
                Summary_Quote: 'https://www.nasdaq.com/symbol/tsla'
            },
            {
                symbol: 'AAPL',
                Name: 'Apple Inc.',
                marketcap: '$797.37B',
                IPOyear: '1980',
                Sector: 'Technology',
                industry: 'Computer Manufacturing',
                Summary_Quote: 'https://www.nasdaq.com/symbol/aapl'
            },
            {
                symbol: 'MSFT',
                Name: 'Microsoft Corporation',
                marketcap: '$918.31B',
                IPOyear: '1986',
                Sector: 'Technology',
                industry: 'Computer Software: Prepackaged Software',
                Summary_Quote: 'https://www.nasdaq.com/symbol/msft'
            },
            {
                symbol: 'AMZN',
                Name: 'Amazon.com, Inc.',
                marketcap: '$833.37B',
                IPOyear: '1997',
                Sector: 'Consumer Services',
                industry: 'Catalog/Specialty Distribution',
                Summary_Quote: 'https://www.nasdaq.com/symbol/amzn'
            },
            {
                symbol: 'BAC',
                Name: 'Bank of America Corporation',
                marketcap: '$253.68B',
                IPOyear: 'n/a',
                Sector: 'Finance',
                industry: 'Major Banks',
                Summary_Quote: 'https://www.nasdaq.com/symbol/bac'
            }
        ];
        return data.find(company => company.symbol===ticker);
    }
}
