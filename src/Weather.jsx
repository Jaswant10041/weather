import React from 'react';
import { useState } from 'react';
import './Weather.css';

const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
}
// console.log(api.key);
// console.log('API Key:', process.env);

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = e => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }

    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"
        ];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    return (
        <div>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        placeholder='Search...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main !== "undefined") ? (
                    <div>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country}
                                <div className='date'>
                                    {dateBuilder(new Date())}
                                </div>
                            </div>
                            <div className='temp'>
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className='weather'>
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default Weather;
