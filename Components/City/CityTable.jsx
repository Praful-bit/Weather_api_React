import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "animate.css";

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  return (
    <div className="container mx-auto px-4 py-8">
      <>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 mr-2"
          />
          <span className="text-gray-500 text-xl animate__animated animate__fadeIn">
            (Use Ctrl + Click or Middle Mouse Button to open in new tab)
          </span>
        </div>
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
                  <tr key={city.recordid}>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        to={`/weather/${encodeURIComponent(city.fields.name)}`}
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                          if (!(e.ctrlKey || e.metaKey || e.button === 1)) {
                            e.preventDefault(); // Prevent default navigation behavior for simple click
                            // Navigate to weather page within the current tab
                            // You can use history.push or any other navigation logic here
                          }
                        }}
                        onMouseDown={(e) => {
                          if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
                            // Left click behavior: Open in the same tab if it's a simple click
                            // You can add navigation logic here if needed
                          } else if (e.button === 1 || e.ctrlKey || e.metaKey) {
                            window.open(
                              `/weather/${encodeURIComponent(
                                city.fields.name
                              )}`,
                              "_blank"
                            );
                          }
                        }}
                      >
                        {city.fields.name}
                      </Link>
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
    </div>
  );
};

export default CityTable;
