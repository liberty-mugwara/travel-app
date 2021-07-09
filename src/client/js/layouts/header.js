import { createElement } from "../helpers";
import { navbar, heading, button } from "../components";
import headerBg from "../../img/header.jpg";

export const header = () => {
  const headerEl = document.querySelector("#main-header");
  headerEl.style.backgroundImage = `linear-gradient(
    to right bottom,
    rgba(214, 19, 97, 0.7),
    rgba(19, 97, 214, 0.8),
    rgba(97, 214, 19, 0.6)),
    url(${headerBg}
  )`;
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

  // set header text
  const textBox = createElement("section", { className: "navbar__text-box" });
  const hGroup = createElement("hgroup", {
    className: "main-header__headings",
  });
  hGroup.append(
    heading("Travel Planner", { type: "h1" }),
    heading("For the love of travelling", { type: "h2" })
  );

  textBox.append(hGroup);
  fragment.append(
    navbarContainer,
    textBox,
    button("Create Trip", {
      className: "mt-lg",
      animated: true,
    })
  );
  headerEl.append(fragment);
};
