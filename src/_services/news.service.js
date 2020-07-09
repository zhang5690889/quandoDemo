export const newsService = {
    getHeadlines
};

function getHeadlines() {
    return fetch(`https://newsapi.org/v2/everything?q=stock&pageSize=100&sortBy=publishedAt&language=en&apiKey=7e29f33534d34fafb3aaed0ba7f4fae7`)
        .then(response =>
            response.json()
        )
}

