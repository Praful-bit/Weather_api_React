import { useState } from "react";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";
import axios from "axios";

const WeatherApp = () => {
  const api_key = "9d1265b3d26afd00b5dfe90ca206b3bf";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const ele = document.getElementById("cityInput");
    if (!ele || ele.value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ele.value}&units=metric&appid=${api_key}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      const humidity = document.getElementById("humidity-percent");
      const wind = document.getElementById("wind-rate");
      const temperature = document.getElementById("weather-temp");
      const location = document.getElementById("weather-location");

      humidity.innerHTML = data.main.humidity + "%";
      wind.innerHTML = Math.floor(data.wind.speed) + "Km/h";
      temperature.innerHTML = Math.floor(data.main.temp_max) + "°C";
      location.innerHTML = data.name;
      
      if(data.weather[0].icon === '01d' || data.weather[0].icon ==="01n"){
        setWicon(clear_icon);
      }else if(data.weather[0].icon === '02d' || data.weather[0].icon ==="02n"){
        setWicon(cloud_icon)
      }else if(data.weather[0].icon === '03d' || data.weather[0].icon ==="03n"){
        setWicon(drizzle_icon)
      }else if(data.weather[0].icon === '04d' || data.weather[0].icon ==="04n"){
        setWicon(drizzle_icon)
      }else if(data.weather[0].icon === '09d' || data.weather[0].icon ==="09n"){
        setWicon(rain_icon)
      }else if(data.weather[0].icon === '10d' || data.weather[0].icon ==="10n"){
        setWicon(rain_icon)
      }else if(data.weather[0].icon === '13d' || data.weather[0].icon ==="13n"){
        setWicon(snow_icon)
      }
      else{
        setWicon(clear_icon);
      }
      
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="w-607px h-829px m-auto mt-20 rounded-xl bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-900 ">
      <div className="flex justify-center gap-3.5 pt-14">
        <input
          id="cityInput"
          type="text"
          className="w-80 h-16 bg-white border-none outline-none rounded-full pl-10 text-gray-600 text-lg font-normal"
          placeholder="Search"
        />
        <div
          className="flex justify-center items-center w-14 h-14 bg-white rounded-full cursor-pointer"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="mt-7 flex justify-center">
        <img src={wicon} alt="" />
      </div>
      <div
        id="weather-temp"
        className="flex justify-center text-white text-8xl font-normal"
      >
        27°C
      </div>
      <div
        id="weather-location"
        className="flex justify-center text-white text-6xl font-normal"
      >
        London
      </div>
      <div className="mt-12 text-white flex justify-center pb-4 ">
        <div className="m-auto flex items-start gap-3">
          <img src={humidity_icon} alt="" className="mt-3" />
          <div className="text-4xl font-normal" id="humidity-percent">
            64%
          </div>
          <div className="text-xl font-normal">Humidity</div>
        </div>
        <div className="m-auto flex items-start gap-3">
          <img src={wind_icon} alt="" className="mt-3" />
          <div className="text-4xl font-normal" id="wind-rate">
            20 km/h
          </div>
          <div className="text-xl font-normal">Wind Speed</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
