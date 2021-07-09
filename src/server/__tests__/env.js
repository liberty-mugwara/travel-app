import dotenv from "dotenv";
dotenv.config();

test("geonames username is in .env", () => {
  expect(typeof process.env.GEONAMES_USERNAME).toBe("string");
});

test("WEATHERBIT key is in .env", () => {
  expect(typeof process.env.WEATHERBIT_KEY).toBe("string");
});

test("PIXABAY key is in .env", () => {
  expect(typeof process.env.PIXABAY_KEY).toBe("string");
});
