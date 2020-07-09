import  news  from "./news.json";

export const newsService = {
    getHeadlines
};

function getHeadlines() {
   return new Promise((resolve, reject) => {
        resolve(news);
      })
}

