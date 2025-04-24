import React, { useState } from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {

    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=es`;
    let cityUrl = "&q=";

    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=es`;

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async (loc) => {
        setLoading(true);
        setLocation(loc);

        // weather
        let weatherUrl = urlWeather + cityUrl + loc;
        await fetch(weatherUrl)
            .then((response) => {
                if (!response.ok) throw { response };
                return response.json();
            })
            .then((weatherData) => {
                console.log(weatherData);
                setWeather(weatherData);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setShow(false);
            });

        // Forecast
        let forecastUrl = urlForecast + cityUrl + loc;
        await fetch(forecastUrl)
            .then((response) => {
                if (!response.ok) throw { response };
                return response.json();
            })
            .then((forecastData) => {
                console.log(forecastData);
                setForecast(forecastData);
                setLoading(false);
                setShow(true);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setShow(false);
            });
    };

    return (
        <React.Fragment>
            <Form newLocation={getLocation} />
            <Card
                showData={show}
                loadingData={loading}
                weather={weather}
                forecast={forecast}
            />
        </React.Fragment>
    );
}

export default WeatherPanel;
