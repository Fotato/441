/**
 * Generate a scene object with a background color
**/
function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

/**
 * Generate the camera to be used in the scene.
 **/
function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.set(0, 0, 4);
  return camera;
}

/**
 * Generate the light to be used in the scene.
 * @param {obj} scene: the current scene object
 **/
function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return light;
}

/**
 * Generate the renderer to be used in the scene
 **/
function getRenderer() {
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Generate the controls to be used in the scene
 **/
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

// create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

function loadLine()
{
    var points = [];
    points.push(new THREE.Vector3(-2, -2, 0));
    points.push(new THREE.Vector3(-2, 2, 0));
    points.push(new THREE.Vector3(2, 2, 0));
    points.push(new THREE.Vector3(2, -2, 0));
    points.push(new THREE.Vector3(-2, -2, 0));

    var geometry = new THREE.BufferGeometry().setFromPoints(points);

    return new THREE.Line(geometry, material);
}

function loadCube()
{
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial({
      color: 0x00ffff
  });
  return new THREE.Mesh(geometry, material);
}

/**
 * Load tree model
 **/

// I USED AI HERE, THIS LOADER AND Asynchronous stuff is super complex!
async function loadModel()
{
    const loader = new THREE.OBJLoader();
    const model = await loader.loadAsync('obj/tree.obj');
    return model;
}

/**
 * Render!
 **/
//const model = await loadModel();

async function start()
{
  var scene = getScene();
  var camera = getCamera();
  var light = getLight(scene);
  var renderer = getRenderer();
  var controls = getControls(camera, renderer);

  const model = await loadModel();
  scene.add(model);

  const blue_line = loadLine();
  scene.add(blue_line);

  const cube1 = loadCube();
  cube1.scale.set(0.5, 0.5, 0.5);
  cube1.position.y = -0.3;
  scene.add(cube1);

  const cube2 = loadCube();
  cube2.scale.set(0.25, 0.25, 0.25);
  cube2.position.y = -0.8;
  scene.add(cube2);

  var counter = 0;
  var line_arr = [];
  var forward = true;
  function render() {
    requestAnimationFrame(render);  

    model.rotation.y -= 0.01;
    cube1.rotation.y -= 0.01;
    cube2.rotation.x += 0.01;

    blue_line.rotation.z += 0.01;
    if (forward === true)
    {
    
      blue_line.position.z += 0.01;
      cube2.scale.x += .001;
      if (blue_line.position.z >= 4)
      {
        blue_line.position.z = 4;
        forward = false;
      }
    }
    else
    {
      blue_line.position.z -= 0.01;
      cube2.scale.x -= .001;
      if (blue_line.position.z <= -4)
      {
        blue_line.position.z = -4;
        forward = true;
      }
    }

    const ghost_line = blue_line.clone();

    ghost_line.material
    scene.add(ghost_line);
    line_arr.push(ghost_line);

    if (line_arr.length > 100)
    {
        const first_element = line_arr[0];
        scene.remove(first_element);
        first_element.geometry.dispose();
        first_element.material.dispose();
        line_arr.splice(0, 1);
    }

    if (counter >= 60)
    {
      console.log(counter)
      counter = 0;
    }
    counter++;

    renderer.render(scene, camera);
    controls.update();
  }

  render();
}

start();