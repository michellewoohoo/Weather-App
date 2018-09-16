
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('getResults', (address) => {
        geocode.geocodeAddress(address, (errorMessage, results) => {
            console.log(results);
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(results, undefined, 2));
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weather) => {
                    if(errorMessage){
                        console.log(errorMessage);
                    } else{
                        results.temperature = weather.temperature;
                        socket.emit('weatherData', results);
                        console.log(JSON.stringify(results, undefined, 2));
                    }
                });
            }
        });
    });
});
server.listen(8000, () => {
    console.log('Server is up on port 8000');
});




