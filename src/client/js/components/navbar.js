import { createElement } from "../helpers";

/**
 *
 * @param {...{name: string,type:"brand"|"link"|"button",to:string}} links - nav links data
 * @returns {HTMLElement}
 */
export const navbar = (...links) => {
  const navbar = createElement("nav", { className: "navbar" });

  links.forEach(({ type, name: text = "", to = "#" }) => {
    const className = `navbar__${
      type === "button" ? "link--button" : type || "link"
    }`;
    const navLink = createElement("a", {
      text,
      className,
      attributes: { href: to },
    });
    navbar.append(navLink);
  });
  return navbar;
};
