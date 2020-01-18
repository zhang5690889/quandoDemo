import APIURL from './config'

export const newsService = {
    getHeadlines,
    getRelatedCompanyByNews,
    newsRelatedTo,
    deleteCompany,
};

function getHeadlines() {
    return fetch(`${APIURL}news/getHeadlines`)
        .then(response => response.json())
}

function getRelatedCompanyByNews(url) {
    return fetch(`${APIURL}news/getRelatedCompanyByNews?newsURL=`+ url)
        .then(response => response.json())
}


function newsRelatedTo(dto) {
    return fetch(`${APIURL}news/newsRelatedTo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dto)
    }).then(response=> response.json())
}

function deleteCompany(dto) {
    return fetch(`${APIURL}news/deleteRelatedCompany`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dto)
    }).then(response=> response.json())

}

