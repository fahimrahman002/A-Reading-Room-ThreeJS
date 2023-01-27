// import { Reflector } from "./Reflector.js";

window.onload = function () {
  //Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load("../textures/bg.png");

  //Camera

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 50);

  //Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  //Axes Helper(The X axis is red. The Y axis is green. The Z axis is blue)
  scene.add(new THREE.AxesHelper(3));

  //Plane - Floor
  const floorTexture = new THREE.TextureLoader().load("textures/floor2.jpg");
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = THREE.MathUtils.degToRad(90);
  plane.receiveShadow = true;
  scene.add(plane);

  // Mirror
  //   const geometry = new THREE.PlaneGeometry(5, 10);
  //   const groundMirror = new Reflector(geometry, {
  //     clipBias: 0.003,
  //     textureWidth: window.innerWidth * window.devicePixelRatio,
  //     textureHeight: window.innerHeight * window.devicePixelRatio,
  //     color: 0x777777,
  //   });
  //   groundMirror.position.set(0, 5, 1);
  //   groundMirror.rotateZ(-Math.PI + 0.031);
  //   scene.add(groundMirror);

  //-----------------------------Wall Section---------------------------------//
  //Wall
  const wall = new THREE.BoxGeometry(30, 1, 50);
  let wallTexture = new THREE.TextureLoader().load("textures/wall1.jpg");
  const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTexture,
    side: THREE.DoubleSide,
  });
  //Wall-Right
  const wallRightPlane = new THREE.Mesh(wall, wallMaterial);
  wallRightPlane.position.set(25, 15, 0);
  wallRightPlane.rotation.z = THREE.MathUtils.degToRad(90);
  wallRightPlane.castShadow = true;
  scene.add(wallRightPlane);

  //Wall-Left
  const wallLeftPlane = new THREE.Mesh(wall, wallMaterial);
  wallLeftPlane.position.set(-25, 15, 0);
  wallLeftPlane.rotation.z = THREE.MathUtils.degToRad(90);
  wallLeftPlane.castShadow = true;
  scene.add(wallLeftPlane);

  //Wall-Back
  const wallBack = new THREE.BoxGeometry(30, 1, 51);
  const wallBackPlane = new THREE.Mesh(wallBack, wallMaterial);
  wallBackPlane.position.set(0, 15, -25);
  wallBackPlane.rotation.x = THREE.MathUtils.degToRad(90);
  wallBackPlane.rotation.y = THREE.MathUtils.degToRad(90);
  wallBackPlane.castShadow = true;
  scene.add(wallBackPlane);

  //-----------------------------Table Section----------------------------//
  //Table top
  const tableTextures = ["textures/table-top1.jpg", "textures/table-top2.jpg"];
  let tableTextureNo = 1;
  let tableTexture = new THREE.TextureLoader().load(
    tableTextures[tableTextureNo]
  );
  tableTexture.wrapS = THREE.RepeatWrapping;
  tableTexture.wrapT = THREE.RepeatWrapping;
  tableTexture.repeat.set(1, 1);
  tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const tableTopMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(tableTextures[tableTextureNo]),
  });

  let tableTop = new THREE.BoxGeometry(24, 0.4, 12);
  tableTop = new THREE.Mesh(tableTop, tableTopMaterial);
  tableTop.position.set(-18, 10, 0);
  tableTop.rotation.y = THREE.MathUtils.degToRad(90);
  tableTop.castShadow = true;
  scene.add(tableTop);

  //Table Support-1
  const tableSupportTextures = [
    "textures/table-support1.jpg",
    "textures/table-support2.jpg",
  ];
  let tableSupportTextureNo = 1;
  let tableSupportTexture = new THREE.TextureLoader().load(
    tableSupportTextures[tableSupportTextureNo]
  );
  tableSupportTexture.wrapS = THREE.RepeatWrapping;
  tableSupportTexture.wrapT = THREE.RepeatWrapping;
  tableSupportTexture.repeat.set(1, 1);
  tableSupportTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const tableSupportMaterial = new THREE.MeshStandardMaterial({
    map: tableSupportTexture,
  });

  const gui = new dat.GUI();
  const options = {
    x: 0,
    y: 0,
    z: 0,
  };

  let tableSupport1 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport1 = new THREE.Mesh(tableSupport1, tableSupportMaterial);
  tableSupport1.position.set(-13, 5, 11);
  tableSupport1.castShadow = true;
  scene.add(tableSupport1);

  let tableSupport2 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport2 = new THREE.Mesh(tableSupport2, tableSupportMaterial);
  tableSupport2.position.set(-23, 5, 11);
  tableSupport2.castShadow = true;
  scene.add(tableSupport2);

  let tableSupport3 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport3 = new THREE.Mesh(tableSupport3, tableSupportMaterial);
  tableSupport3.position.set(-13, 5, -11);
  tableSupport3.castShadow = true;
  scene.add(tableSupport3);

  let tableSupport4 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport4 = new THREE.Mesh(tableSupport4, tableSupportMaterial);
  tableSupport4.position.set(-23, 5, -11);
  tableSupport4.castShadow = true;
  scene.add(tableSupport4);

  let tableSupport5 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport5 = new THREE.Mesh(tableSupport5, tableSupportMaterial);
  tableSupport5.position.set(-18.2, 5.5, 10.95);
  tableSupport5.rotation.z = THREE.MathUtils.degToRad(90);
  tableSupport5.castShadow = true;
  scene.add(tableSupport5);

  let tableSupport6 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport6 = new THREE.Mesh(tableSupport6, tableSupportMaterial);
  tableSupport6.position.set(-18.2, 0.3, 10.95);
  tableSupport6.rotation.z = THREE.MathUtils.degToRad(90);
  tableSupport6.castShadow = true;
  scene.add(tableSupport6);

  let tableSupport7 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport7 = new THREE.Mesh(tableSupport7, tableSupportMaterial);
  tableSupport7.position.set(-18.2, 5.5, -10.95);
  tableSupport7.rotation.z = THREE.MathUtils.degToRad(90);
  tableSupport7.castShadow = true;
  scene.add(tableSupport7);

  let tableSupport8 = new THREE.BoxGeometry(0.6, 10, 0.6);
  tableSupport8 = new THREE.Mesh(tableSupport8, tableSupportMaterial);
  tableSupport8.position.set(-18.2, 0.3, -10.95);
  tableSupport8.rotation.z = THREE.MathUtils.degToRad(90);
  tableSupport8.castShadow = true;
  scene.add(tableSupport8);

  //   gui.add(options, "x", -50, 50);
  //   gui.add(options, "y", -50, 50);
  //   gui.add(options, "z", -50, 50);

  //Grid Helper
  const gridHelper = new THREE.GridHelper(30);
  scene.add(gridHelper);

  // ---------------Light----------------
  const pointLight = new THREE.PointLight(0xffffff, 1, 250);
  pointLight.castShadow = true; // default false
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLightProbe(0xffffff, 0.4);
  ambientLight.position.set(40, 80, 0);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }
  animate();

  function lightMove() {
    const time = clock.getElapsedTime();
    pointLight.position.x = Math.sin(time) * 80;
    pointLight.position.y = 60;
    pointLight.position.z = Math.cos(time) * 80;
    requestAnimationFrame(lightMove);
  }

  lightMove();

  function moveCamera() {
    camera.position.x = Math.sin(cameraRotationVar) * 27;
    camera.position.y = cameraPositionY;
    camera.position.z = Math.cos(cameraRotationVar) * 27;
    camera.lookAt(0, 5, 0);
    renderer.render(scene, camera);
  }

  document.onkeydown = checkKey;

  function checkKey(e) {
    if (e.keyCode == "38") {
      // up key
      cameraPositionY += 1;
      if (cameraPositionY > 50) {
        cameraPositionY = 50;
      }
      moveCamera();
    } else if (e.keyCode == "40") {
      // down arrow
      cameraPositionY -= 1;
      if (cameraPositionY < 20) {
        cameraPositionY = 20;
      }
      moveCamera();
    } else if (e.keyCode == "37") {
      // left arrow
      cameraRotationVar += 0.03;
      moveCamera();
    } else if (e.keyCode == "39") {
      // right arrow
      cameraRotationVar -= 0.03;
      moveCamera();
    }
  }

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
