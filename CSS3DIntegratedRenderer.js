import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "https://unpkg.com/three@0.158.0/examples/jsm/renderers/CSS3DRenderer.js";

class CSS3DIntegratedRenderer {
  constructor() {
    this.CSS3DRenderer = new CSS3DRenderer();
    this.TopCSS3DRenderer = new CSS3DRenderer();
    this.WebGLRenderer = new THREE.WebGLRenderer();

    this.domElement = document.createElement("div");
    this.CSS3DRenderer.domElement.style.position = "absolute";
    this.TopCSS3DRenderer.domElement.style.position = "absolute";
    this.WebGLRenderer.domElement.style.position = "absolute";
    this.domElement.appendChild(this.CSS3DRenderer.domElement);
    this.domElement.appendChild(this.WebGLRenderer.domElement);
    this.domElement.appendChild(this.TopCSS3DRenderer.domElement);

    this.CSSScene = new THREE.Scene();
    this.TopCSSScene = new THREE.Scene();
    this.castForCSS3DRaycast = new THREE.Raycaster();
    this.mousePosition = new THREE.Vector2();

    this.WebGLRenderer.domElement.addEventListener("mousemove", (event) => {
      this.updateMousePosition(event);
    });
    this.CSS3DRenderer.domElement.addEventListener("mousemove", (event) => {
      this.updateMousePosition(event);
    });
    this.domElement.tabIndex = 0;
    this.domElement.addEventListener("keypress", (event) => {
      this.onKeyPress(event);
    });
    this.TopCSS3DRenderer.domElement.style["pointer-events"] = "none";

    // Object.setPrototypeOf(Object.getPrototypeOf(this), this.WebGLRenderer);
    for(let i in this.WebGLRenderer){
      const self = this;
      const value = this.WebGLRenderer[i];
      if(i.charAt(0) == "_")i = i.substring(1)
      if(this[i] != undefined)continue;
      if(typeof(value) == "function"){
        this.__proto__[i] = (...args)=>this.WebGLRenderer[i](...args);
      }else{
        Object.defineProperty(this.__proto__,i,{
          set(value){
            self.WebGLRenderer[i] = value;
          },
          get(){
            return self.WebGLRenderer[i];
          }
        });
      }
    }
    console.log(this)
  }
  setSize(width, height) {
    this.CSS3DRenderer.setSize(width, height);
    this.WebGLRenderer.setSize(width, height);
    this.TopCSS3DRenderer.setSize(width, height);
  }
  updateMousePosition(event) {
    this.mousePosition.set(
      2 * (event.clientX / this.WebGLRenderer.domElement.width) - 1,
      -2 * (event.clientY / this.WebGLRenderer.domElement.height) + 1
    );
  }
  onKeyPress(event) {
    for (let object of this.TopCSSScene.children) {
      if (
        object.GLParent &&
        object.GLParent.type == "KeyButton" &&
        object.GLParent.keys.indexOf(event.key) != -1
      )
        object.GLParent.callKeyEvent(event);
    }
  }
  render(scene, camera) {
    this.iterateScene(scene);
    this.castForCSS3D(scene, camera);
    this.TopCSS3DRenderer.render(this.TopCSSScene, camera);
    this.WebGLRenderer.render(scene, camera);
    this.CSS3DRenderer.render(this.CSSScene, camera);
  }
  castForCSS3D(scene, camera) {
    this.castForCSS3DRaycast.setFromCamera(this.mousePosition, camera);
    const intersections = this.castForCSS3DRaycast.intersectObjects(
      scene.children,
      true
    );
    if (intersections.length > 0) {
      if (
        intersections[0].object.type === "PlaneFrame" ||
        intersections[0].object.type === "PlaneFrame_Plane"
      ) {
        this.WebGLRenderer.domElement.style["pointer-events"] = "none";
        this.CSS3DRenderer.domElement.style["pointer-events"] = "auto";
      }
    } else {
      this.WebGLRenderer.domElement.style["pointer-events"] = "auto";
      this.CSS3DRenderer.domElement.style["pointer-events"] = "none";
    }
  }
  iterateScene(scene) {
    scene.traverse((child) => {
      if (!child.isCSS3DRendererObject) return;
      child.updateTransforms();
      let scene;
      if (child.isTopObject) {
        scene = this.TopCSSScene;
      } else {
        scene = this.CSSScene;
      }
      if (!scene) return;
      if(child.deadCSS3DObject && scene.children.indexOf(child.deadCSS3DObject) != -1)scene.remove(child.deadCSS3DObject);
      if (scene.children.indexOf(child.CSS3DObject) != -1) return;
      if(child.CSS3DObject)scene.add(child.CSS3DObject);
    });
  }
}

class PlaneFrame extends THREE.Object3D {
  constructor(src, width, height) {
    super();
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.ShaderMaterial(PlaneFrameGL)
    );
    this.plane.material.side = THREE.DoubleSide;
    this.plane.type = "PlaneFrame_Plane";
    this.add(this.plane);
    this.div = document.createElement("div");
    this.iframe = document.createElement("iframe");
    this.div.style.margin = "auto";
    this.div.style.width = "10px";
    this.div.style.height = "10px";
    this.div.style.backgroundColor = "#000";

    this.width = width;
    this.height = height;

    this.iframe.style.width = width + "px";
    this.iframe.style.height = height + "px";
    this.iframe.style.transform = "translate(-50%,-50%)";
    this.iframe.style.border = "0px";
    this.iframe.src = src;

    this.div.appendChild(this.iframe);
    this.div.style.backfaceVisibility = "hidden";
    this.updateTransforms();
    this.type = "PlaneFrame";
    this.isCSS3DRendererObject = true;

    this._enabled = false;
    this.enabled = false;
  }
  updateTransforms() {
    if(this.CSS3DObject == undefined)return;
    // console.log(this);
    this.CSS3DObject.scale.copy(
      this.scale
        .clone()
        .multiply(new THREE.Vector3(1 / this.width, 1 / this.height, 1))
    );
    this.CSS3DObject.position.copy(
      new THREE.Vector3().setFromMatrixPosition(this.matrixWorld)
    );
    const quat = new THREE.Quaternion();
    this.matrixWorld.decompose(new THREE.Vector3(), quat, new THREE.Vector3());
    this.CSS3DObject.quaternion.copy(quat);
  }
  set enabled(value){
    const previousValue = this._enabled;
    this._enabled = value === true;
    if(this._enabled && previousValue == false){
      this.visible = true;
      this.CSS3DObject = new CSS3DObject(this.div);
      this.add(this.CSS3DObject);
    }else if(this._enabled == false && previousValue == true){
      this.deadCSS3DObject = this.CSS3DObject;
      this.CSS3DObject = undefined;
    }
    if(this._enabled == false){
      this.visible = false;
    }
  }
}

class KeyButton extends THREE.Object3D {
  constructor(img, key, callback) {
    super();

    this.keys = [];
    this.callback = callback;

    if (Array.isArray(key)) {
      this.keys = this.keys.concat(key);
    } else if (typeof key == "string") {
      this.keys.push(key);
    }

    this.div = document.createElement("div");
    this.iframe = document.createElement("iframe");
    this.div.style.margin = "auto";
    this.div.style.width = "0px";
    this.div.style.height = "0px";
    this.div.style.backgroundColor = "#000";

    this.width = 150;
    this.height = 150;

    this.img = document.createElement("iframe");
    this.img.src = img;
    this.img.style.border = "none";
    this.img.style.width = this.width + "px";
    this.img.style.height = this.height + "px";
    this.img.style.transform = "translate(-50%,-50%)";
    this.div.appendChild(this.img);

    this.CSS3DObject = new CSS3DObject(this.div);
    this.CSS3DObject.GLParent = this;

    this.type = "KeyButton";
    this.isCSS3DRendererObject = true;
    this.isTopObject = true;
  }
  set visible(bool) {
    this._visible = bool;
    if (this.CSS3DObject) this.CSS3DObject.visible = bool;
  }
  set opacity(value){
    this.div.style.opacity = value;
  }
  get visible() {
    return this._visible;
  }
  callKeyEvent(event) {
    this.callback && this.callback(event);
  }
  updateTransforms() {
    this.CSS3DObject.scale.set(1 / this.width, 1 / this.height, 1).multiplyScalar(0.2);
    this.CSS3DObject.position.copy(
      new THREE.Vector3().setFromMatrixPosition(this.matrixWorld)
    );
    const quat = new THREE.Quaternion();
    this.matrixWorld.decompose(new THREE.Vector3(), quat, new THREE.Vector3());
    this.CSS3DObject.quaternion.copy(quat);
  }
}

const PlaneFrameGL = {
  vertexShader: `        
        void main( ) {
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        } 
    `,
  fragmentShader: `
        void main( ) {
            gl_FragColor = vec4(0);
        }
     `,
};
export { CSS3DIntegratedRenderer, PlaneFrame, KeyButton };
