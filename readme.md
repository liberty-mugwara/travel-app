[![contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Starting The App](#starting-the-app)
    - [Dev Mode](#dev-mode)
    - [Production Mode](#production-mode)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Travel App screenshot][product-screenshot]](https://mugs-travel-app.herokuapp.com)

This app obtains a desired trip location and date from the user, and displays weather and an image of the location using information obtained from external APIs.

### Built With

These are the main building blocks for this app:

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/)
- [Sass](https://sass-lang.com/)
- [Babel](https://babeljs.io/)
- [Axios](https://github.com/axios/axios)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This app requires [nodeJS >= 16.0.0](https://nodejs.org/en/download/current/) and npm >= 7

- npm
  ```sh
  npm install npm@latest -g
  ```
- An account with Geonames: [open here](http://www.geonames.org/login)

  - Useful links for Geonames:
    - [GeoNames User Manual](http://www.geonames.org/manual.html)
    - [GeoNames Blog](http://geonames.wordpress.com)
    - [GeoNames Forum](http://forum.geonames.org)
    - [GeoNames Mailinglist](http://groups.google.com/group/geonames)

- An account with Weatherbit: [open here](https://www.weatherbit.io/account/create)
- An account with Pixabay: [open here](https://pixabay.com/)
  - Useful links for Pixabay API:
    - [Pixabay API docs](https://pixabay.com/api/docs/)
    - [Pixabay API javascript example](https://pixabay.com/api/docs/#api_javascript_example)

### Installation

1. Get Weatherbit API Key [here](https://www.weatherbit.io/account/dashboard)
2. Get Pixabay API key

   To get the API key click [here](https://pixabay.com/api/docs/) and follow below instructions:

   > - On the API documentation page scroll down.
   > - Under Parameters you will find the first parameter named "Key". Select and copy the key inside the green box next to Your API Key.

   > [![Pixabay API Key screenshot][pixabay-screenshot]](#installation)

3. Clone the repo
   ```sh
   git clone https://github.com/liberty-mugwara/travel-app.git
   cd travel-app
   ```
   or clone to a specific folder
   ```sh
   git clone [folder name] https://github.com/liberty-mugwara/travel-app.git
   cd [folder name]
   ```
4. Install NPM packages

   ```sh
   npm install
   ```

5. Enter your api in `.env`

```sh
# replace the values in square brackets with your own respective values
GEONAMES_USERNAME=[username]
WEATHERBIT_KEY=[your_key]
PIXABAY_KEY=[your_key]
```

### Starting The App

#### Dev Mode

1. In one terminal run the following command

   ```sh
   npm run build-dev
   ```

2. Open another terminal and run the following command
   ```sh
   npm run build-dev
   ```

#### Production mode

run the following command:

```sh
npm run build-prod
npm run start
```

<!-- ROADMAP -->

## Roadmap

See [open issues](https://github.com/liberty-mugwara/travel-app/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

To contribute to this project follow the below steps. Your contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

[MIT](LICENSE.txt)

<!-- CONTACT -->

## Contact

Liberty Mugwara - [linkedIn][linkedin-url] - libertymugwara@live.com

Project Link: [travel app](https://github.com/liberty-mugwara/travel-app)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

The following READMEs gave me a general idea of how to write this README:

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template/master/README.md)
- [Axios](https://github.com/axios/axios/blob/master/README.md)

Here is a list of articles and repos that provided me with information when writing this README

- [Github Syntax Highlighting Docs][syntax-highlighting-docs]
- [Syntax Highlight Supported Languages][syntax-highlight-supported-lang-url]

<!-- MARKDOWN Links -->

[contributors-shield]: https://img.shields.io/github/contributors/liberty-mugwara/travel-app.svg?style=flat-square
[contributors-url]: https://github.com/liberty-mugwara/travel-app/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[syntax-highlight-supported-lang-url]: https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
[syntax-highlighting-docs]: https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks
[linkedin-url]: https://linkedin.com/in/liberty-mugwara
[product-screenshot]: src/assets/project.png
[pixabay-screenshot]: src/assets/pixabay-api-key.png
