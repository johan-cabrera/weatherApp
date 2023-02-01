const form = document.querySelector('#form');
const getForm = document.querySelector('#get_form');
const sectionForm = document.querySelector('#weather_form');
const sectionInfo = document.querySelector('#weather_info');
const weatherTemp = document.querySelector('#weather_Temp');
const weatherPlace = document.querySelector('#weather_Place');
const weatherClouds = document.querySelector('#weather_Clouds');
const weatherHumidity = document.querySelector('#weather_Humidity');
const weatherPressure = document.querySelector('#weather_Pressure');
const weatherWind = document.querySelector('#weather_Wind');




window.addEventListener('load', ()=>{
    form.addEventListener('submit', getWeather)
    getForm.addEventListener('click', displayForm);
})

const getWeather = e=>{
    e.preventDefault();
    const data = {
        country: form['country'].value,
        city: form['city'].value
    }

    form['country'].value = '';
    form['city'].value = '';
    requestApi(data);
}

const requestApi = async (data)=>{
    const {country, city} = data;

    const appID = '66161ebf428cb0e50503fdfa4ac0d2e7';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}&units=metric`;


    const requestJSON = await fetch(url);
    const result = await requestJSON.json();

    displayWeather(result, country, city);
    
}

const displayWeather = (result, country, city)=>{
    const { main: {temp, pressure, humidity},wind: {speed}, weather: [{description}], sys: {sunset}} = result;
    const date = Date.now()/1000;

    if(date > sunset){
        sectionInfo.classList.remove('background_day');
        sectionInfo.classList.add('background_night');
    }
    else{
        sectionInfo.classList.remove('background_night');
        sectionInfo.classList.add('background_day');
    }

    weatherTemp.textContent = Number.parseInt(temp) + '°';
    weatherPlace.textContent = city + ', ' + country;
    weatherClouds.textContent = description;
    weatherHumidity.textContent = humidity + '%';
    weatherPressure.textContent = pressure + 'hPa';
    weatherWind.textContent = speed + 'km';

    sectionForm.classList.add('d-none');
    sectionInfo.classList.remove('d-none');
}

const displayForm = e=>{
    e.preventDefault();

    sectionInfo.classList.add('d-none');
    sectionForm.classList.remove('d-none');
    
}