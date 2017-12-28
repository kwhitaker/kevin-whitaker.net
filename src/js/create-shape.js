import {
  WebGLRenderer,
  Scene,
  IcosahedronGeometry,
  PerspectiveCamera,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  Vector2,
  TweenMax
} from "three";
import { to } from "gsap/TweenMax";
import * as Stats from "stats.js";
import { noise } from "./perlin";

const cloudShape = (canvas, statsParent) => {
  if (!canvas) {
    throw new Error("No canvas element provided");
  }

  this.canvas = canvas;
  this.dimensions = {
    width: this.canvas.offsetWidth,
    height: this.canvas.offsetHeight
  };

  this.mouse = new Vector2(0.8, 0.5);
  this.scene = new Scene();
  this.renderer = new WebGLRenderer({
    canvas: this.canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });

  this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  this.renderer.setSize(this.dimensions.width, this.dimensions.height);
  this.renderer.setClearColor(0xd00169, 0);

  this.camera = new PerspectiveCamera(
    100,
    this.dimensions.width / this.dimensions.height,
    0.1,
    10000
  );
  this.camera.position.set(0, 0, 300);

  this.hemLight = new HemisphereLight(0xffbb12, 0xd00169, 0.6);
  this.scene.add(this.hemLight);

  this.dirLight = new DirectionalLight(0x191919, 0.5);
  this.dirLight.position.set(200, 300, 400);
  this.scene.add(this.dirLight);

  this.dirLight2 = this.dirLight.clone();
  this.dirLight2.position.set(-200, 300, 400);
  this.scene.add(this.dirLight2);

  this.geometry = new IcosahedronGeometry(120, 4);
  const { vertices } = this.geometry;

  for (let i = vertices.length - 1; i >= 0; i--) {
    let vector = vertices[i];
    vector._o = vector.clone();
  }

  this.material = new MeshPhongMaterial({
    emissive: 0xffbb12,
    emissiveIntensity: 0.4,
    shininess: 0
  });

  this.shape = new Mesh(this.geometry, this.material);
  this.scene.add(this.shape);

  if (process.env.NODE_ENV === "development" && statsParent) {
    this.stats = new Stats();
    this.stats.showPanel(0);
    statsParent.appendChild(this.stats.dom);
  }

  this.updateVertices = a => {
    const { vertices } = this.geometry;
    for (let i = vertices.length - 1; i >= 0; i--) {
      const vector = vertices[i];
      vector.copy(vector._o);
      const perlin = noise.simplex3(
        vector.x * 0.006 + a * 0.0002,
        vector.y * 0.006 + a * 0.0003,
        vector.z * 0.006
      );
      const ratio = perlin * 0.4 * (this.mouse.y + 0.1) + 0.8;
      vector.multiplyScalar(ratio);
    }

    this.geometry.verticesNeedUpdate = true;
  };

  this.render = a => {
    if (this.stats) {
      this.stats.begin();
    }

    this.updateVertices(a);
    this.renderer.render(this.scene, this.camera);

    if (this.stats) {
      this.stats.end();
    }
    window.requestAnimationFrame(this.render);
  };

  this.onResize = () => {
    this.canvas.style.width = "";
    this.canvas.style.height = "";
    this.dimensions = {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight
    };
    this.camera.aspect = this.dimensions.width / this.dimensions.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.dimensions.width, this.dimensions.height);
  };

  window.requestAnimationFrame(this.render);

  window.addEventListener("resize", () => {
    this.resizeTimer = clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(this.onResize, 200);
  });

  return {
    canvas: this.canvas,
    updateVertices: this.updateVertices,
    onResize: this.onResize,
    render: this.render
  };
};

export default cloudShape;
// const takeScreenshot = e => {
//   e.preventDefault();
//   const a = document.createElement("a");
//   a.href = renderer.domElement
//     .toDataURL()
//     .replace("image/png", "image/octet-stream");
//   a.download = "static-glob.png";
//   a.click();
// };
