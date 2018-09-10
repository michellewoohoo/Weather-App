
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

const handleInput = () =>{
    const location = document.getElementById("locationInput");
    console.log(location.value);
};




geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
            if(errorMessage){
                console.log(errorMessage);
            } else{
                console.log(JSON.stringify(results, undefined, 2));
            }
        });
    }
});



//Images:
//https://cdn.dribbble.com/users/516449/screenshots/2108293/fire-4.gif