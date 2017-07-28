// Require mongoose
var mongoose = require("mongoose");
// Create Schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        required: true
    }
});

// Create Article model
var Article = mongoose.model("Article", ArticleSchema);

// Export
module.exports = Article;