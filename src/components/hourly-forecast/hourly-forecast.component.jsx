import React from 'react';

import './hourly-forecast.css';

const HourlyForecast = ({ forecast }) => {
    const items = forecast.map((f, index) => {
        const image = {
            url: `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
            alt: `Image of  ${f.weather[0].description}`,
        };
        const description = f.weather[0].description;
        const unixTimestamp = f.dt;
        let hour = new Date(unixTimestamp * 1000).getHours();
        let ampm = 'AM';
        if (hour === 0) hour = 12;
        else if (hour > 12) {
            hour = hour - 12;
            ampm = 'PM';
        }

        return (
            <div key={index} className='forecast-item'>
                <p className='forecast-item__time'>
                    {hour} {ampm}
                </p>
                <p className='forecast-item__temp'>
                    {f.temp} °
                </p>
                <img
                    src={image.url}
                    alt={image.alt}
                />
                <p className='forecast-item__description'>{description}</p>
            </div>
        );
    });

    return (
        <div className='forecast'>
            <h3 className='forecast-title'>Hourly Forecast</h3>
            <div className='forecast-items'>{items}</div>
        </div>
    );
};

export default HourlyForecast;
