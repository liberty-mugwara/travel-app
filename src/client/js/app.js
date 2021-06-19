const apiKey = "edc2c502f33ce0c763912ef65f7a3404";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const submit = document.getElementById("generate");
const entryEl = document.getElementById("entryHolder");
const historyHeadingEl = document.getElementById("history-heading");

// allows us to correctly load history
let fetchedFromApi = false;

/* ________ pre page load ________ */

getProjectData();

/* ________ utils ________ */

/**
 *
 * @param {number} number
 * @param {string} unit
 * @returns {string}
 */
const toLocaleString = (number, unit) => {
  const a = number.toLocaleString(undefined, { style: "unit", unit });
  console.log(a);
  return a;
};

/* ________ functions ________ */

/**
 *
 * @param {string} baseUrl - api url
 * @param {string} key - personal API Key
 * @returns {getWeather}
 */
const generateApiFetch = (baseUrl, key) => {
  /**
   *
   * @param {string} zipCode
   * @returns {{name: string,sys: { country: string }, main: { temp:number,
   *  humidity:number }, weather: { description: string }[],wind:{speed:number}}}
   */
  const getWeather = async zipCode => {
    const res = await fetch(
      baseUrl + `?zip=${zipCode}&appid=${key}&units=metric`
    );
    try {
      const data = await res.json();
      fetchedFromApi = true;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return getWeather;
};

const getWeatherData = generateApiFetch(baseUrl, apiKey);

async function getProjectData() {
  const res = await fetch("/weather");
  try {
    const data = await res.json();
    // update dom elements
    updateHistory(data);
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {string} url endpoint url
 * @param {{city:string, country:string, temp:number, humidity:number, weather:string,
 *  wind:{speed:string}, date:string}} data weather data
 * @returns
 */
const updateWeatherData = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

/**
 *
 * @param {{ dateEl:HTMLElement, tempEl:HTMLElement, entryHeadingEl:HTMLElement,
 *  contentHeadingEl:HTMLElement, contentDataEl:HTMLElement }} entryElements
 * @param {{city:string, country:string, temp:number, humidity:number, weather:string,
 *  wind:{speed:string}, date:string}} data
 */
const updateEntry = (entryElements, data) => {
  const { city, country, temp, humidity, weather, wind, date } = data || {};
  const { dateEl, tempEl, entryHeadingEl, contentHeadingEl, contentDataEl } =
    entryElements;
  if (entryHeadingEl) {
    entryHeadingEl.textContent = country + ": " + city;
  }
  if (dateEl) {
    dateEl.innerHTML = `<strong>Date:</strong> <span class="entry-data">${date}</span>`;
  }
  if (tempEl) {
    tempEl.innerHTML = `<strong>Temperature:</strong> <span class="entry-data">${toLocaleString(
      temp,
      "celsius"
    )}</span>
    `;
  }
  if (contentHeadingEl) {
    contentHeadingEl.textContent = "Content";
  }
  if (contentDataEl) {
    contentDataEl.innerHTML = `
    <p><strong>Weather:</strong> <span class="entry-data">${weather}</span></p>
    <p><strong>Wind speed:</strong> <span class="entry-data">${toLocaleString(
      wind.speed,
      "kilometer-per-hour"
    )}</span></p>
    <p><strong>Humidity:</strong> <span class="entry-data">${(
      humidity / 100
    ).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    })}</span></p>
    `;
  }
};

/**
 *
 * @param {{city:string, country:string, temp:number, humidity:number, weather:string,
 *  wind:{speed:string}, date:string}[]} projectData
 */
const updateHistory = (projectData = []) => {
  const historyContainerEl = document.querySelector(".history-container");
  let htmlData = "";
  if (projectData.length > 1) {
    if (historyHeadingEl.classList.contains("hidden")) {
      historyHeadingEl.classList.remove("hidden");
    }
    projectData.forEach((data, index) => {
      // don't add the current entry in history unless all is history
      if (fetchedFromApi && index === projectData.length - 1) return;
      const entryHolder = `
      <div class="entry">
        <h2 class="entry-heading">${data.country + ": " + data.city}</h2>
        <div class="date">
          <strong>Date:</strong> <span class="entry-data">${data.date}</span>
        </div>
        <div class="temp">
          <strong>Temperature:</strong> <span class="entry-data">${toLocaleString(
            data.temp,
            "celsius"
          )}</span>
        </div>
        <div class="content">
          <h3 class="content-heading">Content</h3>
          <div class="content-data">
            <p>
              <strong>Weather:</strong> <span class="entry-data">${
                data.weather
              }</span>
            </p>
            <p>
              <strong>Wind speed:</strong> <span class="entry-data">${toLocaleString(
                data.wind.speed,
                "kilometer-per-hour"
              )}</span>
            </p>
            <p>
              <strong>Humidity:</strong> <span class="entry-data">${(
                data.humidity / 100
              ).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
              })}</span>
            </p>
          </div>
        </div>
      </div>
      `;
      htmlData += entryHolder;
    });

    historyContainerEl.innerHTML = htmlData;
  }
};

/* ________ EventListeners ________ */

submit.addEventListener("click", async event => {
  event.preventDefault();
  const zipCode = document.getElementById("zip").value;
  const dateEl = document.getElementById("date");
  const tempEl = document.getElementById("temp");
  const entryHeadingEl = document.getElementById("entry-heading");
  const contentHeadingEl = document.getElementById("content-heading");
  const contentDataEl = document.getElementById("content-data");

  try {
    const {
      name: city,
      sys: { country },
      main: { temp, humidity },
      weather: [{ description: weather }],
      wind,
    } = await getWeatherData(zipCode || "");

    const date = new Date().toLocaleString();

    const weatherData = { city, country, temp, humidity, weather, wind, date };

    // prevent too many reflows
    if (!entryEl.classList.contains("hidden")) {
      entryEl.classList.add("hidden");
    }

    updateEntry(
      { dateEl, tempEl, entryHeadingEl, contentHeadingEl, contentDataEl },
      weatherData
    );
    entryEl.classList.remove("hidden");

    // update api endpoint
    const res = await updateWeatherData("weather", weatherData);
    if (res.ok) {
      // get weather data from api endpoint
      await getProjectData();
    }
  } catch (err) {}
});
