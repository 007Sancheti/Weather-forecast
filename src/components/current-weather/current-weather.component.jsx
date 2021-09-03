import React from 'react';

import './current-weather.css';

const CurrentWeather = ({ current }) => {
    const temperature = current.temp;
    const description = current.weather[0].description;
    const image = {
        url: `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`,
        alt: `Image of  ${current.weather[0].description}`,
    };
    const feelsLike = current.feels_like;

    return (
        <div className='current-weather'>
            <div className='current-weather__main-content'>
                <div>
                    <span className='current-weather__temperature'>
                        {temperature}
                        <span className='current-weather__degree'>°</span>
                    </span>
                    <p className='current-weather__description'>
                        {description}
                    </p>
                </div>
                <img width='150' src={image.url} alt={image.alt} />
            </div>
            <div>
                <p className='current-weather__feels-like'>
                    Feels like {feelsLike}°
                </p>
            </div>
        </div>
    );
};

export default CurrentWeather;
