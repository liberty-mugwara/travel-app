import { setLayouts } from "./helpers";
import travelImageDefault from "../img/default-travel.jpg";
import axios from "axios";
// layouts
import { header } from "./layouts";

const apiUrl = "http://localhost:8081";

// global variables
const tripLocationImage = document.getElementById("trip-location-image");
const tripDestination = document.getElementById("trip-destination");
const tripDeparture = document.getElementById("trip-departure");
const tripTemp = document.getElementById("trip-temp");
const tripWeather = document.getElementById("trip-weather");

// saved trip json data
const tripsJson = localStorage.getItem("trips");
let trips = [];

let myTrip = {
  cityName: "City Name",
  countryName: "Country Name",
  departure: "Date of departure",
  weather: {
    app_temp: "Temperature",
    temp: "Temperature",
    description: "Weather description",
  },
  imageUrl: travelImageDefault,
};

// use saved data if available
if (tripsJson) {
  const tripsData = JSON.parse(tripsJson);
  trips = Object.entries(tripsData).map(([key, value]) => value);
  if (trips.length) {
    myTrip = trips[0];
  }
}

// set layouts
setLayouts(header);
setTripUI(myTrip);
updateTripsListUI();

export const addTripHandler = async (event) => {
  try {
    event.preventDefault();
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const message = `${!date ? "Departure date is required" : ""}\n ${
      !location ? "location is required" : ""
    }`;

    if (!location || !date) {
      return alert(message);
    }

    const { data } = await axios.post(`${apiUrl}/add-trip`, { location, date });
    // update trip data
    updateMyTrip(data);
    // set ui
    setTripUI(data);
  } catch (err) {
    alert("an error occurred");
  }
};

export const scrollToAddTrip = () => {
  const addTripSection = document.getElementById("add-trip-section");
  addTripSection.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const saveTrip = () => {
  const tripsJson = localStorage.getItem("trips");
  let tripsData = {};
  if (tripsJson) {
    tripsData = JSON.parse(tripsJson);
  } else {
    localStorage.setItem("trips", JSON.stringify({}));
  }

  tripsData[myTrip.cityName] = myTrip;
  trips = Object.entries(tripsData).map(([key, value]) => value);
  localStorage.setItem("trips", JSON.stringify(tripsData));
  updateTripsListUI();
  alert(`saved trip to ${myTrip.countryName}/${myTrip.cityName}`);
};

export const updateMyTrip = (data) => {
  myTrip = data;
  return myTrip;
};

export const viewTrip = (data) => {
  console.log(data);
  updateMyTrip(data);
  setTripUI(data);
  const myTripSection = document.getElementById("my-trip");
  myTripSection.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const removeTrip = () => {
  const tripsJson = localStorage.getItem("trips");
  let tripsData = {};
  if (tripsJson) {
    tripsData = JSON.parse(tripsJson);
  } else {
    localStorage.setItem("trips", JSON.stringify({}));
  }

  if (tripsData[myTrip.cityName]) {
    delete tripsData[myTrip.cityName];
    localStorage.setItem("trips", JSON.stringify(tripsData));

    trips = Object.entries(tripsData).map(([key, value]) => value);
    updateTripsListUI();
    return alert(`removed trip to ${myTrip.countryName}/${myTrip.cityName}`);
  }
  alert("Nothing to remove");
};

function setTripUI({
  imageUrl,
  cityName,
  countryName,
  weather,
  departure,
} = {}) {
  tripLocationImage.setAttribute("src", imageUrl || travelImageDefault);
  tripDestination.textContent = `${countryName}/${cityName}`;
  tripDeparture.textContent = departure;
  tripTemp.innerHTML = `Typical weather for then is:<br> 
    <strong>Temperature:</strong> ${weather.temp}, <strong>Feels like:</strong> ${weather.app_temp}
    `;
  tripWeather.textContent = weather.description;
}

function updateTripsListUI() {
  const tripsList = document.getElementById("trip-list");
  tripsList.innerHTML = trips.map(
    (trip) => `<li class="trips-list-item bg-gray mb-sx">
  <span>${trip.countryName}/${trip.cityName}</span> 
  <button class="button bg-primary text-white" onclick='return Client.viewTrip(${JSON.stringify(
    trip
  )})'>
              View
  </button>
  </li>`
  );
}
