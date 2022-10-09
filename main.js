import './style/index.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ***** text loop on landing page *****

let title = ['Software Developer', 'Mechanical Engineer', 'Leader']
const cycle = document.querySelector("#title");
var i = 0;

const cycleText = () => {
  cycle.innerHTML = title[i];
  i = ++i % title.length;
};
cycleText();
setInterval(cycleText, 2000);


// ***** Creating a 3d scene *****
// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
camera.position.set(4, 1, 3)
// camera.position.rotation.set();

renderer.render(scene, camera);

const loader = new GLTFLoader();

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(10,10,10)

// scene.add(torus);

// loader.load('/blender/shop.glb', function (gltf) {
//   scene.add( gltf.scene );
// }, undefined, function (error) {
//   console.error( error );
// })

loader.load('/blender/pumpkin.glb', function (gltf) {
  scene.add( gltf.scene );
}, undefined, function (error) {
  console.error( error );
})

// Lights

const pointLight = new THREE.PointLight(0xfffff);
pointLight.position.set(5, 5, 5);

const pumpkinLight = new THREE.PointLight(0xffffff);
pumpkinLight.position.set(0,0,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, pumpkinLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
const cameraHelper = new THREE.CameraHelper( camera );
scene.add(lightHelper, gridHelper, cameraHelper)

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();