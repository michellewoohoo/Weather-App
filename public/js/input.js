var socket = io();
const inputBox = document.getElementById('locationInput');
const fahrenheit = document.getElementById('fahrenheit');
const celsius = document.getElementById('celsius');
const errorMsg = document.getElementById('errorMsg');
const gifIconMain = document.getElementById('weatherGif');
const submitBtn = document.getElementById("submitBtn");

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
    tempDiv.appendChild(document.createTextNode(data.temperature.toString()));
    tempDiv.style.fontSize = "8vw";


    var bodyContent = document.getElementById("bodyContent");
    bodyContent.style.fontSize = "5vw";
    bodyContent.appendChild(gifDiv);
    bodyContent.appendChild(headerDiv);
    bodyContent.appendChild(tempDiv);
};

var checkInput = function(input) {
    if(input.value === ''){
        errorMsg.style.display = 'inline';
        return false;
    }
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


