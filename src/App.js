import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { getPlacesData, getWeatherData } from "./api/index";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [childClick, setChildClick] = useState(null);

  //cords state
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // loading state

  const [isLoading, setIsLoading] = useState(false);

  // gets user coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getWeatherData(coords.lat, coords.lng).then((data) =>
        setWeatherData(data)
      );
      getPlacesData(type, bounds).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClick={childClick}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClick={setChildClick}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
