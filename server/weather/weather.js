const request = require('request');
const APIkey='e9362ebf62a7ed9b081e3812c2a2fd5c';

var getWeather = (lat,lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to forecast.io service.');
        } else if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                icon: body.currently.icon
            });
        }else{
            callback('Unable to fetch weather.');
        }

    });      
};

module.exports.getWeather = getWeather;