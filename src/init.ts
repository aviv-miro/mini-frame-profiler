/**
 * Fires a callback function after the window has been loaded.
 * @param cb
 */
export function init(cb?: (...args: any[]) => void) {
  if (document.readyState !== "complete") {
    window.addEventListener("load", () => cb && cb());
  } else {
    cb && cb();
  }
}
