import { Router } from "express";
import axios from "axios";

const router = Router();

const getLocationData = async (location) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://api.geonames.org/searchJSON?",
      params: {
        name: location,
        name_equals: location,
        style: "full",
        maxRows: 3,
        username: process.env.GEONAMES_USERNAME || "",
      },
    });
    const target = res.data.geonames[0];
    if (target) {
      return {
        lat: target.lat,
        lon: target.lng,
        cityName: target.name,
        countryName: target.countryName,
      };
    }
  } catch (err) {
    throw err;
  }
};

const getWeather = async (latitude, longitude) => {
  try {
    console.log(longitude, latitude);
    const res = await axios({
      method: "get",
      url: "https://api.weatherbit.io/v2.0/current?",
      params: {
        key: process.env.WEATHERBIT_KEY || "",
        lat: latitude,
        lon: longitude,
      },
    });

    const data = res.data.data[0];

    return {
      description: data.weather.description,
      temp: data.temp,
      app_temp: data.app_temp,
    };
  } catch (err) {
    throw err.data;
  }
};

const getCityImage = async (city, country) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://pixabay.com/api/",
      params: {
        q: `${country}+${city}`,
        key: process.env.PIXABAY_KEY || "",
        image_type: "photo",
        orientation: "horizontal",
        category: "places",
        per_page: 3,
      },
    });

    const images = res.data.hits;
    if (images.length) {
      return images[0].webformatURL;
    } else {
      const response = await axios({
        method: "get",
        url: "https://pixabay.com/api/",
        params: {
          q: `${country}`,
          key: process.env.PIXABAY_KEY || "",
          image_type: "photo",
          orientation: "horizontal",
          category: "places",
          per_page: 3,
        },
      });

      const imgs = response.data.hits;
      if (imgs.length) {
        return imgs[0].webformatURL;
      }
    }

    return "";
  } catch (err) {
    throw err;
  }
};

router.get("/:location/date/:date", async (req, res) => {
  try {
    const { lat, lon, cityName, countryName } = await getLocationData(
      req.params.location
    );

    const [weather, imageUrl] = await Promise.all([
      getWeather(lat, lon),
      getCityImage(cityName, countryName),
    ]);

    res.json({
      cityName,
      countryName,
      weather,
      imageUrl,
      departure: req.params.date,
    });
  } catch (err) {
    res.status(404).json({ message: "not found" });
    console.error(err);
  }
});

export default router;
