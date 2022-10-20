import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const days = {
  0: "Sun.",
  1: "Mon.",
  2: "Tues.",
  3: "Wed.",
  4: "Thurs.",
  5: "Fri.",
  6: "Satur.",
};

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Bengaluru");
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let day = today.getDay();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=efec70dacc559562b64d3c624d00b0f1&query=${city}`
      )
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
      });
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e?.target[0]?.value);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          placeholder="city Name"
          className="city-input"
          required
        />
        <br />
        <br />
        <button className="btn">Get Weather Data</button>
      </form>
      <p>{weatherData?.location?.name}</p>
      <div className="data-display">
        <div>
          <p>{days[day] + formattedToday}</p>
          <p>
            {today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds()}
          </p>
        </div>

        <div>
          <span className="temperature">
            {weatherData?.current?.temperature}
          </span>
          <sup className="sup-c">
            <sup>o</sup>C
          </sup>
          <p>
            Wind: {weatherData?.current?.wind_dir}{" "}
            {weatherData?.current?.wind_speed} mi/h
          </p>
        </div>

        <div>
          <img src={weatherData?.current?.weather_icons[0]} />
          <p>{weatherData?.current?.weather_descriptions[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
