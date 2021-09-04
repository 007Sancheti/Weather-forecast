import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5/';

const getWeatherBasedOnLocation = (location) => {
    return axios
        .get(
            `${baseURL}/weather?q=${location}&APPID=${process.env.REACT_APP_WEATHER_FORECAST_API}`
        )
        .then((res) => res.data);
};

const getForecast = (lat, lon) => {
    return axios
        .get(
            `${baseURL}/onecall?lat=${lat}&lon=${lon}&APPID=${process.env.REACT_APP_WEATHER_FORECAST_API}&units=metric`
        )
        .then((res) => res.data);
};

export const findMyState = () => {
    const success = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        axios
            .get(
                geoApiUrl
            )
            .then((res) => res.data);
    };
    const error = () => {
        console.log('Access Denied');
    };
    navigator.geolocation.getCurrentPosition(success, error);
};

export { getWeatherBasedOnLocation, getForecast };
