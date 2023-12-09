import axios from "axios";
import { useState, useEffect } from "react";


const Pais = ({ pais }) => {

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);
  const climaUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${pais.capital}`;

  useEffect(() => {
    console.log('effect');
    axios
      .get(climaUrl)
      .then(response => {
        console.log('promise fulfilled');
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [climaUrl]);
  return (
    <div>
      <h1>{pais.name.common}</h1>
      <p>Capital:{pais.capital}</p>
      <p>Population: {pais.population}</p>
      <h1>Languages</h1>
      <ul>
        {Object.values(pais.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={pais.flags.png} alt="" />
      <h2>Weather</h2>
      {weather && (
        <div>
          <p>
            <b>Temperature:</b> {weather.current.temperature} Celsius
          </p>
          <img src={weather.current.weather_icons[0]} alt="" />
          <p><b>Wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>

      )}

    </div>
  )
}

export default Pais;