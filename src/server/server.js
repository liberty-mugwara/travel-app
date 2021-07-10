import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import express, {
  json as expressJson,
  urlencoded as expressUrlencoded,
} from "express";
import cors from "cors";
import chalk from "chalk";
import tripRoutes from "./routes/trips";

const app = express();
app.use(
  cors(),
  express.static("dist/client"),
  expressJson(),
  expressUrlencoded({ extended: false })
);

// API endpoint
const projectData = {};

// Router
app.get("/add-trip/:location/date/:date", async (req, res) => {
  try {
    const location = req.params.location.toLowerCase();

    if (projectData[location]) {
      return res.json(projectData[location]);
    }

    const { lat, lon, cityName, countryName } = await getLocationData(location);

    const [weather, imageUrl] = await Promise.all([
      getWeather(lat, lon),
      getCityImage(cityName, countryName),
    ]);

    projectData[location] = {
      cityName,
      countryName,
      weather,
      imageUrl,
      departure: req.params.date,
    };

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

// starting server
const port = process.env.PORT || 8081;
app.listen(port, () =>
  console.log(
    chalk.green(
      `Server ${chalk.red(
        "(" + chalk.yellow("API") + ")"
      )} is running at port: ${chalk.yellowBright(port.toString())}`
    )
  )
);

async function getLocationData(location) {
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
}

async function getWeather(latitude, longitude) {
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
}

async function getCityImage(city, country) {
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
}
