import axios from "axios";

var data = {
  "query": {
    "$query": {
      "$or": [
        { "categoryUri": "dmoz/Science/Environment/Climate_Change" },
        { "categoryUri": "dmoz/Business/Energy/Renewable" },
        { "categoryUri": "dmoz/Business/Environment/Environmental_Compliance" },
        { "categoryUri": "dmoz/Science/Environment/Sustainability" },
        { "categoryUri": "dmoz/Business/Environment/Engineering" }
      ]
    },
    "$filter": { "forceMaxDataTimeWindow": "31", "isDuplicate": "skipDuplicates" }
  },
  "resultType": "articles",
  "articlesSortBy": "rel",
  "includeArticleCategories": true,
  "includeArticleImage": true,
  "apiKey": "629e95fc-08db-411f-8d03-7d89aac73dd9"
};

export default getNewsData = () => {
  return axios.post('https://www.newsapi.ai/api/v1/article/getArticles', data)
}