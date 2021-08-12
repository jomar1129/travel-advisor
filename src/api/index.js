import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
// const options = {
//   params: {
//     bl_latitude: sw.lat,
//     tr_latitude: ne.lat,
//     bl_longitude: sw.lng,
//     tr_longitude: ne.lng,
//   },
//   headers: {
//     "x-rapidapi-key": "6de42463bdmshdd82fda237050d3p1ff56ajsnad36ef4a3dc0",
//     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//   },
// };

export const getPlacesData = async (type, bounds) => {
  const sw = bounds.sw;
  const ne = bounds.ne;
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: { lon: lng, lat: lat },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
