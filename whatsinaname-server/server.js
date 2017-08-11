const axios = require ('axios');
const cheerio = require('cheerio');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.listen(3001, function() {
    console.log('Server is running!');
});

app.all('/name/:nameID', function(req, res) {
    let name = req.params.nameID;

    function check(name, res) {
        console.log('Check function has run!');
        bandCamp(name, res);
    }

    check(name, res);

    // res.send(name);
});

// Band camp

function bandCamp (name, res) {
    let scrapeURL = 'https://' + name + '.bandcamp.com';

    axios.get(scrapeURL)
        .then(result => {
            let $ = cheerio.load(result.data);
            let b = $('#signupform h3');
            let btext = b.text();
            let btest = btext.includes('sign up');
            let results = {};

            if  (btest) {
            // If the B test includes sign up, return false. It's not available.
                console.log('bandCamp: false');
                results.bandcamp = false;
                soundCloud(name, res, results);
            }
            else {
            // If the B test does NOT include.
                console.log('bandCamp: true');
                results.bandcamp = true;
                soundCloud(name, res, results);
            }
        }).catch(error => {
            console.log('An error has occured!');
        });
}


//soundcloud
function soundCloud(name, res, results) {
    let scrapeURL= 'https://soundcloud.com/' + name;

    axios.get(scrapeURL)
        .then(result => {
            console.log('soundcloud: true');
            results.soundcloud = true;
            youTube(name, res, results);
        })
        .catch(error => {
            if (error.request.res.statusCode) {
                console.log('soundcloud: false');
                results.soundcloud = false;
                youTube(name, res, results);
            }
            else {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}

//youtube
function youTube (name, res, results){
    let youTubeScrape= 'https://www.youtube.com/user/' + name;
    axios.get(youTubeScrape)
        .then ((result, reject) => {
            console.log('youtube: true');
            results.youtube = true;
            faceBook(name, res, results);
        })
        .catch (error => {
            if (error.request.res.statusCode){
                console.log('youtube: false');
                results.youtube = false;
                faceBook(name, res, results);
            } else {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}
//facebook

function faceBook (name, res, results){
    let facebookNameUrl = 'http://graph.facebook.com/' + name;

    axios.get(facebookNameUrl)
        .then(result => {

        }).catch ((error) =>{
            let response = error.response.data.error.message;
            let responseResult = response.includes('exist');

            if (responseResult) {
                console.log('facebok: ' + false);
                results.facebook = false;
                toFrontEnd(res, results);

            }
            else {
                console.log('facebook: ' + true);
                results.facebook = true;
                toFrontEnd(res, results);
            }
        });
}

function toFrontEnd (res, results) {
    res.send(results);
}
