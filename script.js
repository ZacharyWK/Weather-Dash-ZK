const submitBtn = document.querySelector("#p1SubmitBtn")
const weather5Cards = document.querySelector("#weather5Cards")
const weatherCard = document.querySelector("#weatherCard")
const prevCity = JSON.parse(localStorage.getItem("prevCity"))||[];
const prevCityAside = document.querySelector("#prevCity")
const fiveDay = document.querySelector("#fiveDay")
const openHistory = document.querySelector("#openHistory")
const closeHistory = document.querySelector("#closeHistory")
const historyMenu = document.querySelector("#historyMenu")




const KEY = '4e3011a28fa6266abd9e6b8ccd169da8';
let cityInput = document.querySelector("#homeCity")

function onSubmit(event) {
    event.preventDefault();
    
    fiveDay.classList.add("fiveDay")

    console.log("INPUT: ",cityInput.value)
    let city = cityInput.value.replace(/ /g,`+`);

    prevCity.push(city);
    localStorage.setItem("prevCity", JSON.stringify(prevCity));
    makePrevBtns();
    console.log(prevCity);

    localStorage.setItem("cityNAME", city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=imperial`)
    .then(res => {
        console.log(res);
        return res.json()
        
    })
    .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
    
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=imperial`)
        .then((res => {return res.json()}))
        .then(uvDat => {
            console.log("NOW: ",uvDat);
            makeWeatherCard(uvDat);
        })
     });

    
    // 5day forecast
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=imperial`)
    .then(res => {
        return res.json()
    }).then(data => {
        //5 day forecast here i+=8
        console.log("5DAY: ",data);
        makeForecastCards(data);
    });
};

function uviGen(data) {
const lat = data.coord.lat;
const lon = data.coord.lon;
    
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY}`)
.then((res => {return res.json()}))
.then(uvDat => {
console.log("UVDAT: ",uvDat);
console.log("UVI: ",uvDat.current.uvi);
localStorage.setItem("UVI",uvDat.current.uvi);
})

}

function makeWeatherCard(data) {
weatherCard.innerHTML = "";
const weather = data.current;
const card =  document.createElement("div");
const where = document.createElement("h2");
const now = document.createElement("h3");
const temp = document.createElement("h4");
const uv = document.createElement("p");
const wind = document.createElement("p");
const humid = document.createElement("p");
const icon = document.createElement("img");

where.textContent = localStorage.getItem("cityNAME").toUpperCase().replace("+"," ").replace("+"," ");
now.textContent = "Temperature";
temp.textContent = weather.temp + " °F";
wind.textContent = "Wind Speed: " + weather.wind_speed;
humid.textContent = "Humidity: " + weather.humidity;
let weatherIcon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
icon.src = weatherIcon

let uvi = weather.uvi

uvi < 3 ? uv.textContent = "UV Index: " + uvi + " Low":
uvi > 5 ? uv.textContent = "UV Index: " + uvi + " High":
uv.textContent = "UV Index: " + uvi + " Moderate";

uvi < 3 ? uv.style.color = "limeGreen" :
uvi > 5 ? uv.style.color = "red" :
uv.style.color = "yellow";

    card.append(where);
    card.append(now);
    card.append(temp);
    card.append(uv);
    card.append(wind);
    card.append(humid);
    card.append(icon);
   
    card.classList.add("weatherCardBody")
    weatherCard.append(card);
    
};

// MAKE 5 DAY FORECAST
function makeForecastCards(data) {
weather5Cards.innerHTML = "";

for (let i = 0; i < data.list.length; i+=8) {
    const weather = data.list[i];
   
    const card =  document.createElement("div");
    const date = document.createElement("h5");
    const temp = document.createElement("h6");
    const wind = document.createElement("p");
    const humid = document.createElement("p");
    const icon = document.createElement("img");

    let weatherIcon = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    icon.src = weatherIcon
    date.textContent = weather.dt_txt.substring(0,10)
    temp.textContent = weather.main.temp + " °F"
    wind.textContent = "Wind Speed: " + weather.wind.speed
    humid.textContent = "Humidity: " + weather.main.humidity
   
    card.append(date);
    card.append(temp);
    card.append(wind);
    card.append(humid);
    card.append(icon);

    card.classList.add("weatherCardBody")
    weather5Cards.append(card);}    
};

function makePrevBtns () 
{
prevCityAside.innerHTML = "";
if (cityInput !== "")
{
prevCity.forEach
(
city => 
{
const cityBtn = document.createElement("button");
cityBtn.textContent = city.toUpperCase().replace("+"," ").replace("+"," ");
prevCityAside.append(cityBtn);

cityBtn.addEventListener
(
"click", function(event) 
{
event.preventDefault();
console.log("THIS: ",this.innerHTML)
cityInput = this.innerHTML;
onSubmitBtn(cityInput);   
}
)
}
)
}
else
{
console.log("TEST")
};

};

function onSubmitBtn(city) { 
    
    fiveDay.classList.add("fiveDay")

    prevCity.push(city);

    console.log("PREVCITY: ",prevCity);
    
    localStorage.setItem("cityNAME", city);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=imperial`)
    .then(res => {
        console.log(res);
        return res.json()
        
    })
    .then(data => {
        const lat = data.coord.lat;
        const lon = data.coord.lon;
    
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${KEY}&units=imperial`)
        .then((res => {return res.json()}))
        .then(uvDat => {
            console.log("NOW: ",uvDat);
            makeWeatherCard(uvDat);
        })
     });

    
    // 5day forecast
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}&units=imperial`)
    .then(res => {
        return res.json()
    }).then(data => {
        //5 day forecast here i+=8
        console.log("5DAY: ",data);
        makeForecastCards(data);
    }).then(reset());
};

function reset() {
cityInput = document.querySelector("#homeCity")
}

function openHistoryF(event) {
event.preventDefault();
historyMenu.classList.remove("hidden")
openHistory.classList.add("hidden")
};
function closeHistoryF(event) {
event.preventDefault();
historyMenu.classList.add("hidden")
openHistory.classList.remove("hidden")
};

openHistory.addEventListener("click", openHistoryF);
closeHistory.addEventListener("click", closeHistoryF);
submitBtn.addEventListener("click", onSubmit);
makePrevBtns();
