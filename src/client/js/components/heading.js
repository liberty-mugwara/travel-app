import { createElement } from "../helpers";

/**
 * @param {string} text - heading text
 * @param {{type?:"h1"|"h2"|"h3", color?:"primary"|"secondary"|"tertiary"|"black"|
 *  "white"|"grey",className?:string}} options
 */
export const heading = (text, { type = "h2", color, className } = {}) => {
  const classNames = [
    `heading--${type === "h1" ? "main" : type === "h2" ? "sub" : "small"}`,
  ];
  if (className) classNames.push(className);
  if (color) classNames.push("text-" + color);
  return createElement(type, { text, className: classNames });
};
