import { useEffect, useState } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const BoxStyle = styled.div`
  border: 1px solid #bababa;
  border-radius: 10px;
  margin: 10px 15px;
  padding: 5px;
  text-align: center;
`;

const BtnStyle = styled.button`
  background-color: white;
  border: 1px solid #bababa;
  color: #bababa;
  border-radius: 5px;
  margin: 0px 15px;
  padding: 10px;
  cursor: pointer;
`;

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20a19963301f91d2cb6d8e4fba5e0e94&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    } finally {
      setLoading(false);
    }
  };

  // const selectIcon = () => {
  //   const id = weather.weather[0].id;

  //   let iconId =
  //     weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
  //   switch (iconId) {
  //     case "0":
  //       return "linear-gradient(to right, #e55d87, #5fc3e4)";
  //     case "2":
  //       return "linear-gradient(to right, #003973, #e5e5be)";
  //     case "3":
  //       return "linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)";
  //     case "5":
  //       return "linear-gradient(to right, #02aab0, #00cdac)";
  //     case "6":
  //       return "linear-gradient(to right, #ede574, #e1f5c4)";
  //     case "7":
  //       return "linear-gradient(to right, #603813, #b29f94)";
  //     case "8":
  //       return "linear-gradient(to right, #2b5876, #4e4376)";
  //   }
  // };
  return (
    <div>
      <BtnStyle>오늘의 날씨</BtnStyle>
      <BoxStyle>
        {loading && <ClipLoader loading={loading} />}
        {weather && weather.main && weather.weather && (
          <>
            <h4>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt=""
              />
            </h4>
            <h3>{weather.name}</h3>
            <p>{weather.main.temp}℃</p>
            <p>{weather.weather[0].description}</p>
          </>
        )}
      </BoxStyle>
    </div>
  );
}

export default Weather;
