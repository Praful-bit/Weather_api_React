/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";
import { useParams } from "react-router-dom";

const WeatherApp = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = "9d1265b3d26afd00b5dfe90ca206b3bf";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
        const response = await axios.get(url);
        const data = response.data;
        setWeatherData(data);
        if (data.weather && data.weather.length > 0) {
          const icon = data.weather[0].icon;
          switch (icon) {
            case "01d":
            case "01n":
              setWicon(clear_icon);
              break;
            case "02d":
            case "02n":
              setWicon(cloud_icon);
              break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              setWicon(drizzle_icon);
              break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
              setWicon(rain_icon);
              break;
            case "13d":
            case "13n":
              setWicon(snow_icon);
              break;
            default:
              setWicon(cloud_icon);
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  return (
    
    <div className="w-607px h-829px m-auto mt-20 rounded-xl bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-900 ml-20 mr-20 " >
      <div className="mt-7 flex justify-center">
        <img src={wicon} alt="" />
      </div>
      <div
        id="weather-temp"
        className="flex justify-center text-white text-8xl font-normal"
      >
        {weatherData && Math.floor(weatherData.main.temp_max)}°C
      </div>
      <div
        id="weather-location"
        className="flex justify-center text-white text-6xl font-normal"
      >
        {weatherData && weatherData.name}
      </div>
      <div className="mt-12 text-white flex justify-center pb-4 ">
        <div className="m-auto flex items-start gap-3">
          <img src={humidity_icon} alt="" className="mt-3" />
          <div className="text-4xl font-normal">
            {weatherData && weatherData.main.humidity}%
          </div>
          <div className="text-xl font-normal">Humidity</div>
        </div>
        <div className="m-auto flex items-start gap-3">
          <img src={wind_icon} alt="" className="mt-3" />
          <div className="text-4xl font-normal">
            {weatherData && Math.floor(weatherData.wind.speed)} Km/h
          </div>
          <div className="text-xl font-normal">Wind Speed</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
