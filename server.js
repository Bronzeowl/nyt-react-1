// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

// Connecting to mongodb
mongoose.connect("mongodb://heroku_b5h06v63:eqql7tqnbhapdjivssu03logp2@ds127063.mlab.com:27063/heroku_b5h06v63");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// /api/saved (get) - your components will use this to query MongoDB for all saved articles

app.get('/api/saved', function(req, res) {
    Article.find({}).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

// /api/saved (post) - your components will use this to save an article to the database

app.post('/api/saved', function(req, res) {
    const title = req.body.title;
    const snippet = req.body.snippet;
    const url = req.body.url;

    Article.create({ 
        title: title, 
        snippet: snippet, 
        url: url 
    }, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc._id);
        }
    });
});

// /api/saved (delete) - your components will use this to delete a saved article in the database

app.delete('/api/saved', function(req, res) {
    Article.find({ 
        _id: req.query._id 
    }).remove().exec(function(err, data) {
        if (err) {
            console.log(err);
        }
    });
});

// * (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});