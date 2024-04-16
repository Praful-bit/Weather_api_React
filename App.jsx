import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityTable from "./Components/City/CityTable";
import WeatherApp from "./Components/WeatherApp/WeatherApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CityTable />} />
        <Route path="/weather/:cityName" element={<WeatherApp />} />
        <Route path="*" element={<CityTable />} />
      </Routes>
    </Router>
  );
};

export default App;
