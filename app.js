var express = require('express')
var linker = require('./tulip_link.js')

/*
**  Tulip - Technology for urban livability
**
**  Author: https://github.com/JediLuke
*/

var app = express()
app.use('/', express.static('static'))  // Serve static content, including pictures used throughout the site

// Initiate connection between the things network and SkyGrid
linker.startlink()

// Serve the main page
app.get("/", function(req, res, next) {
    res.sendfile(__dirname + '/index.html')
    });

// Serve the sensors pages
app.get("/sensor1", function(req, res, next) {
    res.sendfile(__dirname + '/sensor1.html')
    });

app.get("/sensor2", function(req, res, next) {
    res.sendfile(__dirname + '/sensor2.html')
    });

app.get("/sensor3", function(req, res, next) {
    res.sendfile(__dirname + '/sensor3.html')
    });

app.get("/sensor4", function(req, res, next) {
    res.sendfile(__dirname + '/sensor4.html')
    });

app.get("/sensor5", function(req, res, next) {
    res.sendfile(__dirname + '/sensor5.html')
    });

app.get("/sensor6", function(req, res, next) {
    res.sendfile(__dirname + '/sensor6.html')
    });

app.get("/sensor7", function(req, res, next) {
    res.sendfile(__dirname + '/sensor7.html')
    });

// app.get("/all", function(req, res, next) {
//     res.sendfile(__dirname + '/sensor7.html')
//     });

// Set up server
app.listen(80, function () {
    console.log('Listening on port 80')
    })
