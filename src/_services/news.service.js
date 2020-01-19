export const newsService = {
    getHeadlines
};

function getHeadlines() {
    return fetch(`https://newsapi.org/v2/everything?q=stock&pageSize=100&sortBy=publishedAt&language=en&apiKey=d1012daa1a634325afa18f31a8d0899e`)
        .then(response =>
            response.json()
        )
}

