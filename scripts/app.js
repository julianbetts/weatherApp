const cityForm = document.querySelector('form')
const cityName = document.getElementById('cityName')
const cityTemp = document.getElementById('cityTemp')
const iconEl = document.getElementById('image')


const updateCity = async (city) => {

    const cityDets = await getCity(city)
    const weather = await getWeather(cityDets.Key)
    console.log(cityDets, weather)

    return {
        cityDets: cityDets,
        weather: weather
    }
}

const showWeatherData = (temp, name, iconID) => {
    //add city name to HTML
    cityTemp.innerText = temp
    //add temperature to HTML
    cityName.innerText = name
    showIcon(iconID)
}

const showIcon = (iconNumber) => {
    iconEl.src = './img/' + iconNumber + '.svg'
}


cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault()

    // get city value
    const cityObject = cityForm.city.value.trim()
    cityForm.reset()

    //update the ui with the new city
    updateCity(cityObject)
        .then(data => showWeatherData(data.weather.Temperature.Imperial.Value, data.cityDets.LocalizedName, data.weather.WeatherIcon))
        .catch(err => console.log(err))
})



