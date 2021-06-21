/**
 *
 * @param  {...()=>void} layoutFns
 */
export const setLayouts = (...layoutFns) => layoutFns.forEach((fn) => fn());
