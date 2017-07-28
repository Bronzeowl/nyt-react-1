import axios from 'axios';
const nyt_key = '70f0338ff4b34f5b8f158ff57155c19d';

module.exports = {
    runQuery: (topic, startYear, endYear) => {
        var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        queryURL += '?api-key=' + nyt_key + '&q=' + topic + "&begin_date=" + start + "0101&end_date=" + end + "0101";

        return axios.get(queryURL).then(function(response) {
            if (response) {
                return response;
            }
            return "";
        });
    },

    // Get Articles
    getArticles: function() {
        return axios.get('/api/saved').then(function(results) {
            return results;
        });
    },

    // Save Article
    saveArticle: function(title, snippet, url) {
        return axios.post('/api/saved', {title: title, snippet: snippet, url: url}).then(function(results) {
            return results;
        });
    },

    // Delete Article
    deleteArticle: function(articleId) {
        return axios.delete('/api/saved', { 
          params: { _id: articleId } 
        });
    }
};