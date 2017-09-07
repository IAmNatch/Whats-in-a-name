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

app.listen(8080, function() {
    console.log('Server is running!');
});

app.get('/bandcamp/name/:nameID', (req, res) => {
    let name = req.params.nameID;
    bandcamp(name, res);
});

app.get('/facebook/name/:nameID', (req, res) => {
    let name = req.params.nameID;
    facebook(name, res);
});

app.get('/soundcloud/name/:nameID', (req, res) => {
    let name = req.params.nameID;
    soundcloud(name, res);
});

app.get('/bandcamp/name/:nameID', (req, res) => {
    let name = req.params.nameID;
    bandcamp(name, res);
});

// Band camp

function bandcamp (name, res) {
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
                results = false;
                res.send(results)
            }
            else {
            // If the B test does NOT include.
                console.log('bandCamp: true');
                results = true;
                res.send(results)
            }
        }).catch(error => {
            console.log('An error has occured in bandcamp');
        });
}


//soundcloud
function soundcloud(name, res, results) {
    let scrapeURL= 'https://soundcloud.com/' + name;

    axios.get(scrapeURL)
        .then(result => {
            console.log('soundcloud: true');
            results = true;
            res.send(results);
        })
        .catch(error => {
            if (error.request.res.statusCode) {
                console.log('soundcloud: false');
                results = false;
                res.send(results);
            }
            else {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}

//youtube
function youtube (name, res, results){
    let youTubeScrape= 'https://www.youtube.com/user/' + name;
    axios.get(youTubeScrape)
        .then ((result, reject) => {
            console.log('youtube: true');
            results = true;
            res.send(result);
        })
        .catch (error => {
            if (error.request.res.statusCode){
                console.log('youtube: false');
                results = false;
                res.send(results)
            } else {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
}
//facebook

function facebook (name, res, results){
    let facebookNameUrl = 'http://graph.facebook.com/' + name;

    axios.get(facebookNameUrl)
        .then(result => {

        }).catch ((error) =>{
            let response = error.response.data.error.message;
            let responseResult = response.includes('exist');

            if (responseResult) {
                console.log('facebok: ' + false);
                result = false;
                res.send(result)
            }
            else {
                console.log('facebook: ' + true);
                result = true;
                res.send(result);
            }
        });
}
