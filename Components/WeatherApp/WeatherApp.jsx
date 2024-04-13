import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";

function WeatherApp() {
  return (
    <div className="w-607px h-829px m-auto mt-20 rounded-xl bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-900 ">
      <div className="flex justify-center gap-3.5 pt-14">
        <input
          type="text"
          className="w-80 h-16 bg-white border-none outline-none rounded-full pl-10 text-gray-600 text-lg font-normal"
          placeholder="Search"
        />
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full cursor-pointer">
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="mt-7 flex justify-center">
        <img src={cloud_icon} alt="" />
      </div>
      <div className="flex justify-center text-white text-8xl font-normal">
        27°C
      </div>
      <div className="flex justify-center text-white text-6xl font-normal">
        London
      </div>
      <div className="mt-12 text-white flex justify-center pb-4 ">
        <div className="m-auto flex items-start gap-3">
          <img src={humidity_icon} alt="" className="mt-3" />
          <div className="text-4xl font-semibold">64%</div>
          <div className="text-xl font-semibold">Humidity</div>
        </div>
        <div className="m-auto flex items-start gap-3">
          <img src={wind_icon} alt="" className="mt-3" />
          <div className="text-4xl font-semibold">20 km/h</div>
          <div className="text-xl font-semibold">Wind Speed</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
