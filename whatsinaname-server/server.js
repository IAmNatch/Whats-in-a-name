const axios = require ('axios');
const cheerio = require('cheerio');

// Band camp
let name = 'badbadnotgood'
let scrapeURL = 'https://' + name + '.bandcamp.com'

axios.get(scrapeURL)
.then(result => {
    let $ = cheerio.load(result.data);
    let b = $('#signupform h3')
    let btext = b.text();
    let btest = btext.includes('sign up');

    if  (btest) {
        console.log("TRY AGAIN!");
    }
    else {
        console.log("BandCamp: Your artist name is available!")
    }
}).catch(error => {
    console.log('An error has occured!')
});

//soundcloud
let soundCloudName= 'iamamonster'
let SscrapeURL= 'https://soundcloud.com/' + soundCloudName;

axios.get(SscrapeURL) 
.then(result => {
    console.log("SoundCloud: Your artist is NOT available.")
})
.catch(error => {
    if (error.request.res.statusCode) {
        console.log('SoundCloud: Your artist name is available!')
    }
    else {
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
    }
})

//youtube 
let youTubeName= 'cats'
let youTubeScrape= 'https://www.youtube.com/user/' + youTubeName; 

axios.get(youTubeScrape)
.then (result => {
    console.log("YouTube: Your artist is NOT available.")
})
.catch (error => {
    if (error.request.res.statusCode){
        console.log("Youtube: Your artist name is available!")
    } else {
        console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
    }
})

//facebook 

let facebookName = 'wildcatss'
let facebookNameUrl = 'http://graph.facebook.com/' + facebookName;

axios.get(facebookNameUrl) 
.then(result => {

}).catch ((error) =>{
    let response = error.response.data.error.message
    let responseResult = response.includes('required')
    if (responseResult) {
        console.log("Facebook: Sorry, your URL is taken!")
    }
    else {
        console.log("Facebook: Your URL is available! ")
    }
})