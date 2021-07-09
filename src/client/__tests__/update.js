import { updateMyTrip } from "../js/updateMyTrip";

test("myTrip updates correctly", () => {
  const testData = {
    cityName: "Harare",
    countryName: "Zimbabwe",
    departure: "01/02/21",
    weather: {
      app_temp: "56",
      temp: "56",
      description: "78",
    },
    imageUrl: "yes.png",
  };
  let oldData = {
    cityName: "City Name",
    countryName: "Country Name",
    departure: "Date of departure",
    weather: {
      app_temp: "Temperature",
      temp: "Temperature",
      description: "Weather description",
    },
    imageUrl: "test.png",
  };
  const myTrip = updateMyTrip(oldData, testData);
  let correct = true;
  Object.keys(myTrip).forEach((key) => {
    if (typeof myTrip[key] !== "object") {
      if (myTrip[key] !== testData[key]) {
        correct = false;
      }
    } else {
      if (JSON.stringify(myTrip[key]) !== JSON.stringify(testData[key])) {
        correct = false;
      }
    }
  });
  expect(correct).toBe(true);
});
