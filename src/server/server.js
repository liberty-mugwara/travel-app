import express, {
  json as expressJson,
  urlencoded as expressUrlencoded,
} from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(
  cors(),
  express.static("dist/client"),
  expressJson(),
  expressUrlencoded({ extended: false })
);

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
