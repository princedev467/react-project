import React, { useEffect, useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const getWeather = async () => {
    if (!city) return; // prevent empty calls

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=5f6ee75c0d5b4089a2355235251112&q=${city}&aqi=yes`
      );
      const wdata = await response.json();
      setData(wdata);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button style={styles.btn} onClick={getWeather}>
          Search
        </button>
      </div>

      {data && data.current && (
        <div style={styles.card}>
          <h2>{data.location.name}, {data.location.country}</h2>
          <img src={data.current.condition.icon} alt="icon" />
          <h3>{data.current.temp_c}°C</h3>
          <p>{data.current.condition.text}</p>
          <p>Humidity: {data.current.humidity}%</p>
          <p>Wind: {data.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "Arial",
    minHeight: "50%",
    color: "#fff",
    borderRadius:"20px"
  },
  title: { fontSize: "2.5rem", fontWeight: "bold" },
  inputContainer: { marginTop: "20px" },
  input: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    width: "200px"
  },
  btn: {
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    background: "#fff",
    color: "#007BFF",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  card: {
    marginTop: "30px",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "20px",
    borderRadius: "12px",
    display: "inline-block",
    minWidth: "250px"
  }
};

export default Weather;
