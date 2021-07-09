import { createElement } from "../helpers";

/**
 * @param {string} text - heading text
 * @param {{color?:"primary"|"secondary"|"tertiary"|"black"|
 *  "white"|"gray",className?:string, animated:boolean,attributes:Object.<string,string>}} options
 */
export const button = (
  text,
  { color = "primary", animated, className, attributes } = {}
) => {
  const textColor = `text-${
    ["primary", "black"].includes(color) ? "white" : "black"
  }`;

  const classNames = ["button", "bg-" + color, textColor];
  if (animated) classNames.push("button--animated");
  if (className) classNames.push(className);
  return createElement("button", { text, className: classNames, attributes });
};
