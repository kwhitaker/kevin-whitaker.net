import MobileDetect from "mobile-detect";
import Detector from "./webgl-detect";
import "../css/index.css";

window.onload = () => {
  const detector = new MobileDetect(window.navigator.userAgent);
  const canvas = document.getElementsByClassName("gl-canvas")[0];

  if (!detector.mobile() || (detector.mobile() === null && Detector.webgl)) {
    import(/* webpackChunkName: "create-shape" */ "./create-shape").then(
      module => {
        const createShape = module.default;
        const container = document.querySelector("#container");
        container.classList.remove("fallback");
        createShape(canvas, container);
      }
    );
  }
};
