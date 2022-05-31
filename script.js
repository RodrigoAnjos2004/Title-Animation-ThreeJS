let scene;
let camera;
let renderer;
let circle;
let skeleton;
let particle;

//function
function init(){
  //scene
  scene = new THREE.Scene();
  
  //Variaveis camera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  
  // camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 300;
  scene.add(camera);
  
  //renderer
  renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
  })
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);
  
  //3d object
  circle = new THREE.Object3D();
  skeleton = new THREE.Object3D();
  particle = new THREE.Object3D();
  
  scene.add(circle);
  scene.add(skeleton);
  scene.add(particle);
  
  //add Geomentry
  let geometry = new THREE.TetrahedronGeometry(2,1);
  let geomet = new THREE.IcosahedronGeometry(7,1);
  let geomet2 = new THREE.IcosahedronGeometry(19,4);
  
  //Material
  let material = new THREE.MeshPhongMaterial({
    color: 0x000000,
    shading: THREE.FLatShading
  });
  
  let mat = new THREE.MeshPhongMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  
   let mat2 = new THREE.MeshPhongMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  
  //Particulas
  for(let i = 0; i < 1000; i++){
    let mesh = new THREE.Mesh(geometry, mat2);
    mesh.position.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    mesh.position.multiplyScalar(90 + (Math.random()*900));
    mesh.rotation.set(
      Math.random() * 3,
      Math.random() * 3,
      Math.random() * 3
    );
    particle.add(mesh);
  }
  
//planeta interno
  let innerPlanet = new THREE.Mesh(geomet, material);
  innerPlanet.scale.x = innerPlanet.scale.y = innerPlanet.scale.z = 16;
  circle.add(innerPlanet);
  
//Planeta Externo
  let outerPlanet = new THREE.Mesh(geomet2, mat);
  outerPlanet.scale.x = outerPlanet.scale.y = outerPlanet.scale.z = 11;
  skeleton.add(outerPlanet);
  
//luz ambiente
  let ambientLight = new THREE.AmbientLight(0xd4d4d4);
  scene.add(ambientLight);
  
// luz direcional    
   let dLight = [];
    dLight[0] = new THREE.DirectionalLight(0xffffff, 1);
    dLight[0].position.set(1, 0, 0);
    dLight[1] = new THREE.DirectionalLight(0xfffafa, 1);
    dLight[1].position.set(0.75, 1, 0.5);
    dLight[2] = new THREE.DirectionalLight(0xd9db72, 1);
    dLight[2].position.set(-0.75, -1, 0.5);
    scene.add(dLight[0]);
    scene.add(dLight[1]);
    scene.add(dLight[2]);

    animate();
    window.addEventListener('resize', onWindowResize, false);
  
}

function animate() {
    requestAnimationFrame(animate);

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0070;
    particle.rotation.z -= 0.0015;

    circle.rotation.x -= 0.0020;
    circle.rotation.y -= 0.0020;

    skeleton.rotation.x +=  0.0030;
    skeleton.rotation.y +=  0.0030;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.onload = init;