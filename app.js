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

// Serve the sensors page
app.get("/sensors", function(req, res, next) {
    res.sendfile(__dirname + '/sensors.html')
    });

app.listen(80, function () {
    console.log('Listening on port 80')
    })
