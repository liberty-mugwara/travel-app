import { updateMyTrip } from "../js/app";

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
    imageUrl: travelImageDefault,
  };
  const myTrip = updateMyTrip(testData);
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
