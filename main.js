import  './style/index.css' assert { type: 'css' };
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


let title = ['Software Developer', 'Mechanical Engineer', 'Leader']
const cycle = document.querySelector("#title");
var i = 0;

const cycleText = () => {
  cycle.innerHTML = title[i];
  i = ++i % title.length;
};
cycleText();
setInterval(cycleText, 2000);