const express = require("express");
const cors = require("cors");
// No need to add the body-parser package I am using express > 4.16.0

const app = express();
app.use(express.static("src/client"));
app.use(cors());

// Please don't punish me here
// body parser has been re-added under the methods express.json() and express.urlencoded().
// I am using express > 4.16.0
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoint
const projectData = [];

// Router
app.get("/weather", (req, res) => {
  res.json(projectData);
});

app.post("/weather", addWeather);

function addWeather(req, res) {
  projectData.push(req.body);
  res.end();
}

// starting server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running at port: ${port}`));
