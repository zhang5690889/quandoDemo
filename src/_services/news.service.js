import APIURL from './config'

export const newsService = {
    getHeadlines
};

function getHeadlines() {
    return fetch(`${APIURL}news/getHeadlines`)
        .then(response => response.json())
}

