import React, { useState } from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=es`;
    const cityUrl = "&q=";
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&lang=es`;

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const getLocation = async (loc) => {
        setLoading(true);

        try {
            const weatherResponse = await fetch(urlWeather + cityUrl + loc);
            if (!weatherResponse.ok) throw new Error("Error al obtener el clima");
            const weatherData = await weatherResponse.json();
            setWeather(weatherData);
        } catch (error) {
            console.error("Error en weather:", error);
            setLoading(false);
            setShow(false);
            return;
        }

        try {
            const forecastResponse = await fetch(urlForecast + cityUrl + loc);
            if (!forecastResponse.ok) throw new Error("Error al obtener el pronóstico");
            const forecastData = await forecastResponse.json();
            setForecast(forecastData);
            setLoading(false);
            setShow(true);
        } catch (error) {
            console.error("Error en forecast:", error);
            setLoading(false);
            setShow(false);
        }
    };

    return (
        <>
            <Form newLocation={getLocation} />
            <Card
                showData={show}
                loadingData={loading}
                weather={weather}
                forecast={forecast}
            />
        </>
    );
};

export default WeatherPanel;
