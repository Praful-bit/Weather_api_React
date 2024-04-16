import { useState, useEffect } from "react";
import axios from "axios";
import WeatherApp from "../WeatherApp/WeatherApp";


const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchCitiesData();
  }, []);

  const fetchCitiesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=cou_name_en"
      );
      setCities(response.data.records);
    } catch (error) {
      console.error("Error fetching cities data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleCityClick = (cityName) => {
    window.open(`${cityName}`, "_blank");
    setSelectedCity(cityName);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {selectedCity ? (
        <WeatherApp cityName={selectedCity}/>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 mb-4"
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    City Name
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("country_name_en")}
                  >
                    Country
                  </th>
                  <th
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort("timezone")}
                  >
                    Timezone
                  </th>
                </tr>
              </thead>
              <tbody>
                {cities
                  .filter((city) =>
                    city.fields.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const aValue = a.fields[sortBy] || "";
                    const bValue = b.fields[sortBy] || "";
                    return sortOrder === "asc"
                      ? aValue.localeCompare(bValue)
                      : bValue.localeCompare(aValue);
                  })
                  .map((city) => (
                    <tr
                      key={city.recordid}
                      onClick={() => handleCityClick(city.fields.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {city.fields.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {city.fields.cou_name_en}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {city.fields.timezone}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default CityTable;
