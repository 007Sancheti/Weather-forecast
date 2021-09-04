import React from 'react';

import './daily-forecast.css';

const DailyForecast = ({ forecast }) => {
    const items = forecast.map((f, index) => {
        const image = {
            url: `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
            alt: `Image of  ${f.weather[0].description}`,
        };
        const description = f.weather[0].description;
        const unixTimestamp = f.dt;
        let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let date = new Date(unixTimestamp * 1000);
        let day = days[date.getDay()];
        let dayOfMonth = date.getDate();
        let month = date.getMonth() + 1;

        return (
            <div key={index} className='daily-forecast__item'>
                <div>
                    <p>{day}</p>
                    <p>
                        {month}/{dayOfMonth}
                    </p>
                </div>

                <p className="daily-forecast__item__temp">
                    {f.temp.max} ° / {f.temp.min} °
                </p>
                <div>
                    <img src={image.url} alt={image.alt} />
                </div>
                <p className='daily-forecast-item__description'>
                    {description}
                </p>
            </div>
        );
    });

    return (
        <div>
            <h3 className='forecast-title'>Daily Forecast</h3>
            <div className='daily-forecast__items'>{items}</div>
        </div>
    );
};

export default DailyForecast;
