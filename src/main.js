import * as THREE from "three";
import orbit from "three-orbit-controls";

let orbitControls = orbit(THREE);
function createRenderer() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  // console.log(renderer);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("white");
  renderer.setPixelRatio(window.devicePixelRatio);
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
  return new THREE.Scene();
}

function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    45, // Field of View
    window.innerWidth / window.innerHeight, // Ratio
    0.1, // Near (Macro)
    1000 // Far
  );
  camera.position.set(-30, 40, 30); // x, y ,z
  camera.lookAt(0, 0, 0);
  return camera;
}

function createCube() {
  let num = Math.random() * 10;
  let geometry = new THREE.BoxGeometry(num, num, num);
  let material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });
  let mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function createSphere() {
  let geo = new THREE.SphereGeometry(4, 30, 30);
  let mat = new THREE.MeshLambertMaterial({
    color: "salmon",
  });
  let mesh = new THREE.Mesh(geo, mat);
  return mesh;
}

function createLight() {
  let light = new THREE.PointLight("white");
  return light;
}
function getRandomColor() {
  let colors = [
    "dodgerblue",
    "tomato",
    "limegreen",
    "rebeccapurple",
    "gold",
    "lavender",
    "lightcoral",
    "papayawhip",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let cube = createCube();
let sphere = createSphere();
let light = createLight();

new orbitControls(camera);

cube.position.set(10, 10, -10);
sphere.position.set(20, 0, 0);
light.position.set(5, 10, 10);

scene.add(cube, sphere, light);

let cubes = [];
let cubeCount = 500;

for (let i = 1; i <= cubeCount; i += 1) {
  let newCube = createCube();
  newCube.position.x = Math.random() * 500 - 250;
  newCube.position.y = Math.random() * 500 - 250;
  newCube.position.z = Math.random() * 500 - 250;
  cubes.push(newCube);
}
scene.add(...cubes);

function animate() {
  cube.position.x += 0.02;
  cube.position.y += -0.02;
  cube.rotation.y += 0.02;
  cube.rotation.x += 0.02;
  cube.rotation.z += 0.02;

  light.position.y += 0.1;
  light.position.x += 0.1;
  light.position.z += 0.1;

  cubes.forEach(function (c) {
    c.rotation.x += Math.random() * 0.01;
    c.rotation.y += Math.random() * 0.01;
    c.rotation.z += Math.random() * 0.01;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
