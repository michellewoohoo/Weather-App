var socket = io();
var inputBox = document.getElementById('locationInput');
var fahrenheit = document.getElementById('fahrenheit');
var celsius = document.getElementById('celsius');
var errorMsg = document.getElementById('errorMsg');
var gifIconMain = document.getElementById('weatherGif');
var submitBtn = document.getElementById("submitBtn");
var scale = "";
var textScale = "F\u25E6";
var weatherPicture = {
    rain: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-31-512.png",
    snow: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png",
    clearday: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png",
    clearnight: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-10-512.png",
    sleet: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-25-512.png",
    wind: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-26-512.png",
    fog: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-27-512.png",
    cloudy: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-512.png",
    partlycloudy: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-02-512.png",
    partlycloudynight: "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-11-512.png"

};

var selectIcon = function(icon) {
    if(icon === "rain"){
        return weatherPicture["rain"];
    } else if(icon === "snow") {
        return weatherPicture["snow"];
    } else if(icon === "clear-day") {
        return weatherPicture["clearday"];
    } else if(icon === "clear-night") {
        return weatherPicture["clearnight"];
    } else if(icon === "sleet") {
        return weatherPicture["sleet"];
    } else if(icon === "wind") {
        return weatherPicture["wind"];
    } else if(icon === "fog") {
        return weatherPicture["fog"];
    } else if(icon === "cloudy") {
        return weatherPicture["cloudy"];
    } else if(icon === "partly-cloudy-day") {
        return weatherPicture["partlycloudy"];
    } else if(icon === "partly-cloudy-night") {
        return weatherPicture["partlycloudynight"];
    } else{
        return weatherPicture["partlycloudy"];
    }
};

var checkScale = function(){
    if(fahrenheit.classList.contains("active")){
        return "f";
    } else{
        return "c";
    }
};

var clearScreen = function() {
    document.getElementById("bodyContent").innerHTML = "";
};

var displayOnScreen = function(data) {
    console.log("display");
    var gifDiv = document.createElement("div"); 
    var headerDiv = document.createElement("div");
    headerDiv.appendChild(document.createTextNode("Temperature in")); 
    headerDiv.appendChild(document.createElement("br"));
    headerDiv.appendChild(document.createTextNode(data.address + ":"));
    headerDiv.appendChild(document.createElement("br"));
    
    var tempDiv = document.createElement("div");
    var temp = data.temperature;
    if(scale === "c") {
        temp = ((temp-32) / 1.8).toFixed(2);
        textScale = "C\u25E6";
    }

    tempDiv.appendChild(document.createTextNode(temp.toString() + " "+ textScale));
    tempDiv.style.fontSize = "8vw";


    var bodyContent = document.getElementById("bodyContent");
    bodyContent.style.fontSize = "5vw";

    var img = document.createElement("img");
    var imgSrc = selectIcon(data.icon);
    img.setAttribute("src", imgSrc);
    gifDiv.appendChild(img);

    var footer = document.createElement("footer");
    footer.appendChild(document.createTextNode("Icons created by: Yun Liu & Kevin Moran"));
    footer.style.fontSize = "1.2vw";
    
    bodyContent.appendChild(headerDiv);
    bodyContent.appendChild(tempDiv);
    bodyContent.appendChild(gifDiv);
    bodyContent.appendChild(footer);
  
};

var checkInput = function(input) {
    if(input.value === ''){
        errorMsg.style.display = 'inline';
        return false;
    }
    scale = checkScale();
    return true;
};

submitBtn.addEventListener("click", function(){
    if(checkInput(inputBox)){
        console.log("click");
        clearScreen();
        socket.emit('getResults', inputBox.value);
        
        
    }
});
socket.on('connect',function(){
    console.log("connected");
});
socket.on('weatherData', function(data){
    console.log(data);
    displayOnScreen(data);
});


