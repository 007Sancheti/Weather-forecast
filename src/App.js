import React from 'react';
import axios from 'axios';
import CurrentWeather from './components/current-weather/current-weather.component';
import HourlyForecast from './components/hourly-forecast/hourly-forecast.component';
import DailyForecast from './components/daily-forecast/daily-forecast.component';
import NavbarContainer from './components/nav-bar-container/nav-bar-container.component';

import * as Api from './api/weatherAPI';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Mumbai',
            hourlyForecast: [],
            dailyForecast: [],
            current: '',
            updatedLocation: '',
        };
    }

    findMyState = () => {
        const success = (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            axios.get(geoApiUrl).then((res) => {
                this.handleLocationChange(res.data.city);
                this.updateTemperature();
            });
        };
        const error = () => {
            console.log('Access Denied');
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };

    componentDidMount() {
        this.findMyState();
        this.updateTemperature();
    }

    handleLocationChange = (location) => {
        this.setState({ location });
    };

    updateTemperature = async () => {
        const weatherRes = await Api.getWeatherBasedOnLocation(
            this.state.location
        );
        const forecastRes = await Api.getForecast(
            weatherRes.coord.lat,
            weatherRes.coord.lon
        );

        this.setState({
            current: forecastRes.current,
            hourlyForecast: forecastRes.hourly,
            dailyForecast: forecastRes.daily,
            updatedLocation: this.state.location,
        });
    };

    render() {
        const {
            updatedLocation,
            location,
            current,
            hourlyForecast,
            dailyForecast,
        } = this.state;

        return (
            <div className='App'>
                <NavbarContainer
                    location={location}
                    updatedLocation={updatedLocation}
                    handleLocationChange={this.handleLocationChange}
                    updateTemperature={this.updateTemperature}
                />
                {current && <CurrentWeather current={current} />}
                {hourlyForecast.length > 0 && (
                    <HourlyForecast forecast={hourlyForecast} />
                )}
                {dailyForecast.length > 0 && (
                    <DailyForecast forecast={dailyForecast} />
                )}
            </div>
        );
    }
}

export default App;
