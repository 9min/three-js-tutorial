(function() {
  var script = document.createElement("script");
  script.onload = function() {
    var stats = new Stats();
    stats.domElement.style.cssText =
      "position:fixed;left:0;top:0;z-index:10000";
    document.body.appendChild(stats.domElement);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = "//rawgit.com/mrdoob/stats.js/master/build/stats.min.js";
  document.head.appendChild(script);
})();

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  windowWidth / windowHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  renderer.setSize(windowWidth, windowHeight);
  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
});

scene.add(new THREE.AmbientLight(0x00020));
controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 15;

/*
// instantiate a loader
var loader = new THREE.ObjectLoader();
// load a resource
loader.load(
  // resource URL
  "models/Head.json",
  // Function when resource is loaded
  function(object) {
    scene.add(object);
  }
);
*/

// create the shape
const geometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterials = [
  // 1. RIGHT SIDE
  new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    side: THREE.DoubleSide
  }),
  // 2. LEFT SIDE
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("img/2.png"),
    side: THREE.DoubleSide
  }),
  // 3. TOP SIDE
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/3.png"),
    side: THREE.DoubleSide
  }),
  // 4. BOTTOM SIDE
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("img/4.png"),
    side: THREE.DoubleSide
  }),
  // 5. FRONT SIDE
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/5.png"),
    side: THREE.DoubleSide
  }),
  // 6. BACK SIDE
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/6.png"),
    side: THREE.DoubleSide
  })
];

// Create a MeshFaceMaterial, which allows the cube to have different materials on each face
const cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
const cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);
// Floor
const floorGeometry = new THREE.CubeGeometry(10, 1, 10);
const floorMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("img/Ground.jpg"),
  side: THREE.DoubleSide
});
const floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
floorCube.position.y = -5;
scene.add(floorCube);
// Ceiling
const ceilingGeometry = new THREE.CubeGeometry(10, 1, 10);
const ceilingMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("img/Ceiling.jpg"),
  side: THREE.DoubleSide
});
const ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingCube.position.y = 5;
scene.add(ceilingCube);
// Left Wall
const leftWallGeometry = new THREE.CubeGeometry(1, 10, 10);
const leftWallMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("img/Wall.jpg"),
  side: THREE.DoubleSide
});
const leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWallCube.position.x = -5;
scene.add(leftWallCube);
// Right Wall
const rightWallGeometry = new THREE.CubeGeometry(1, 10, 10);
const rightWallMaterial = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("img/Wall.jpg"),
  side: THREE.DoubleSide
});
const rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
rightWallCube.position.x = 5;
scene.add(rightWallCube);

const ambientLight = new THREE.AmbientLight(0xffffff, 5.0);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xff0040, 4, 50);
scene.add(light1);

const light2 = new THREE.PointLight(0x0040ff, 3, 50);
scene.add(light2);

const light3 = new THREE.PointLight(0x80ff80, 4, 50);
scene.add(light3);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xff45f6, 25);
spotLight.position.set(0, 3, 0);
scene.add(spotLight);

// game logic
const update = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;

  const time = Date.now() * 0.0005;
  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;
  light2.position.x = Math.cos(time * 0.3) * 30;
  light2.position.y = Math.sin(time * 0.5) * 40;
  light2.position.z = Math.sin(time * 0.7) * 30;
  light3.position.x = Math.sin(time * 0.7) * 30;
  light3.position.y = Math.cos(time * 0.3) * 40;
  light3.position.z = Math.sin(time * 0.5) * 30;
};

// draw scene
const render = () => {
  renderer.render(scene, camera);
};

// run game loop (update, render, repeat)
const gameLoop = () => {
  requestAnimationFrame(gameLoop);

  update();
  render();
};

gameLoop();
