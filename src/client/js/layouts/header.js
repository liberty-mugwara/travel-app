// components
import { navbar } from "../components";

export const header = () => {
  const headerEl = document.querySelector("header");
  const fragment = document.createDocumentFragment();

  //   create navbar container
  const navbarContainer = document.createElement("div");
  navbarContainer.className = "navbar-container";

  // set navbar
  navbarContainer.append(
    navbar(
      { name: "MTravel", type: "brand", to: "#" },
      { name: "about", to: "#about-section" },
      { name: "contact", to: "#contact-section" },
      { name: "trips", to: "#trips-section" },
      { name: "create trip", type: "button", to: "#create-trip" }
    )
  );

  fragment.append(navbarContainer);
  headerEl.append(fragment);
};
