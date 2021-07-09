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
// const projectData = [];

// Router
app.use("/add-trip/", tripRoutes);

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
