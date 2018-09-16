
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
})
.help()
.alias('help', 'h')
.argv;


var getWeather = (lat,lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to forecast.io service.');
        } else if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature
            });
        }else{
            callback('Unable to fetch weather.');
        }

    });      
};



var encodedAddress = encodeURIComponent(argv.address);
var geocodedUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodedUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find address');
    }
    const APIkey='e9362ebf62a7ed9b081e3812c2a2fd5c';
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}`;

    return axios.get(weatherUrl).then((response) => {
        console.log(JSON.stringify(response.data.currently.temperature, undefined, 2));
    }).catch((e) => {
        console.log('Unable to connect to API service')
    });
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API service')
    } else {
        console.log(e.message);
    }
});



//Images:
//https://cdn.dribbble.com/users/516449/screenshots/2108293/fire-4.gif