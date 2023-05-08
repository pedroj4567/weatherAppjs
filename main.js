
const container = document.querySelector('.container');
const btn = document.querySelector('#btn');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const pageError404= document.querySelector('.not-found');

btn.addEventListener('click',()=>{
    const location = document.querySelector('#search').value;
    if(location  == ""){
        console.log('404 not found')
    }
    //get the data
    getData(location);
})

//fetch to the API
function getData(location){
    const APIKEY = '5ac0eb75f97a266d439f454f3d5bef28';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=metric`;
    fetch(url)
        .then(data => data.json())
        .then(result => showData(result))

}

//this function show the data
function showData(data){
    console.log(data);
    const {cod} = data;
    if(cod == '404'){
        container.style.height = "500px";
        weatherBox.style.display = 'none';
        weatherDetails.style.display = "none";
        pageError404.style.display = 'flex';
        pageError404.classList.add('fadeIn');
        return;
    }

    pageError404.style.display = 'none';
    pageError404.classList.remove('fade-in');

    //show details
    showDetails(data);
}

function showDetails({main,weather,wind}){
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector(' #temperature');
    const description = document.querySelector(' #description');
    const humidity = document.querySelector('#humiditySpan');
    const windSpeed = document.querySelector('#windSpan');

    //options 

    const weatherState = weather[0].main;
    const weatherOpions = {
        Cain : './assets/images/rainy.png',
        Clouds : './assets/images/cloud.png',
        Snow : './assets/images/snow.png',
        Haze : './assets/images/haze.png',
        Clear : './assets/images/clear.png'
    }

    image.src = weatherOpions[weatherState] || '';



    temperature.innerHTML = `${main.temp}<span>°C</span>`;
    description.innerHTML = `${weather[0].description}`;
    humidity.innerHTML= `${main.humidity}`;
    windSpeed.innerHTML = `${parseInt(wind.speed)}Km/h`;

    //assing the styles
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = "600px";


}
