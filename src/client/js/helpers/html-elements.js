/**
 *
 * @param {HTMLElement} element
 * @param {Record<string,string>} attributes
 */
export const setAttributes = (element, attributes) => {
  if (element && attributes) {
    Object.entries(attributes).forEach(([attr, value]) => {
      element.setAttribute(attr, value);
    });
  }
};

/**
 *
 * @param {HTMLElement} element
 * @param {string | string[]} className
 */
export const setClassNames = (element, className) => {
  if (element && className) {
    if (typeof className === "string") {
      element.classList.add(className);
    } else {
      element.classList.add(...className);
    }
  }
};

/**
 *
 * @param {keyof HTMLElementTagNameMap} tagName
 * @param {{text:string,className:string | string[],attributes:Record<string,string>
 *  } options
 */
export const createElement = (
  tagName,
  { text, className, attributes } = {}
) => {
  const element = document.createElement(tagName);

  // set textContent
  if (text) element.textContent = text;

  setClassNames(element, className);
  setAttributes(element, attributes);
  return element;
};
