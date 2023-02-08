// import { Reflector } from "./Reflector.js";

window.onload = function () {
  const gui = new dat.GUI();
  const options = {
    isShowWall: false,
    x: 0,
    y: 0,
    z: 0,
  };
  //Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load("../textures/bg.png");

  //Camera
  let cameraRotationVar = 0.3;
  let cameraPositionY = 30;
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    400
  );

  camera.position.set(
    Math.sin(cameraRotationVar) * 40,
    cameraPositionY,
    Math.cos(cameraRotationVar) * 40
  );
  camera.lookAt(0, 5, 5);
  scene.add(camera);

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
  // scene.add(new THREE.AxesHelper(3));

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

  var wallObj = new THREE.Object3D();

  function showWall() {
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
    wallObj.add(wallRightPlane);

    //Wall-Left
    const wallLeftPlane = new THREE.Mesh(wall, wallMaterial);
    wallLeftPlane.position.set(-25, 15, 0);
    wallLeftPlane.rotation.z = THREE.MathUtils.degToRad(90);
    wallLeftPlane.castShadow = true;
    wallObj.add(wallLeftPlane);

    //Wall-Back
    const wallBack = new THREE.BoxGeometry(30, 1, 51);
    const wallBackPlane = new THREE.Mesh(wallBack, wallMaterial);
    wallBackPlane.position.set(0, 15, -25);
    wallBackPlane.rotation.x = THREE.MathUtils.degToRad(90);
    wallBackPlane.rotation.y = THREE.MathUtils.degToRad(90);
    wallBackPlane.castShadow = true;
    wallObj.add(wallBackPlane);

    scene.add(wallObj);
  }

  // showWall();

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

  //-----------------------------Table Section----------------------------//
  //Table top
  // const tableTextures = [
  //   "textures/table-top1.jpg",
  //   "textures/table-top2.jpg",
  //   "textures/table-top3.jpg",
  //   "textures/table-top4.jpg",
  // ];
  // let tableTextureNo = 0;
  // let tableTexture = new THREE.TextureLoader().load(
  //   tableTextures[tableTextureNo]
  // );
  // tableTexture.wrapS = THREE.RepeatWrapping;
  // tableTexture.wrapT = THREE.RepeatWrapping;
  // tableTexture.repeat.set(1, 1);
  // tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // const tableTopMaterial = new THREE.MeshStandardMaterial({
  //   map: new THREE.TextureLoader().load(tableTextures[tableTextureNo]),
  // });

  // let tableTop = new THREE.BoxGeometry(24, 0.4, 12);
  // tableTop = new THREE.Mesh(tableTop, tableTopMaterial);
  // tableTop.position.set(-10, 10.3, 0);
  // tableTop.rotation.y = THREE.MathUtils.degToRad(90);
  // tableTop.castShadow = true;
  // scene.add(tableTop);

  // //Table Support-1
  const tableSupportTextures = ["textures/table-support1.jpg"];
  let tableSupportTextureNo = 0;
  let tableSupportTexture = new THREE.TextureLoader().load(
    tableSupportTextures[tableSupportTextureNo]
  );
  tableSupportTexture.wrapS = THREE.RepeatWrapping;
  tableSupportTexture.wrapT = THREE.RepeatWrapping;
  tableSupportTexture.repeat.set(1, 1);
  tableSupportTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const tableSupportMaterial = new THREE.MeshStandardMaterial({
    map: tableSupportTexture,
    side: THREE.DoubleSide,
  });

  // function createTableSupport(posX, posY, posZ, len, rotX = false) {
  //   let tableSupport = new THREE.BoxGeometry(0.6, len, 0.6);
  //   tableSupport = new THREE.Mesh(tableSupport, tableSupportMaterial);
  //   tableSupport.position.set(posX, posY, posZ);
  //   tableSupport.castShadow = true;
  //   if (rotX == true) tableSupport.rotation.x = THREE.MathUtils.degToRad(90);

  //   return tableSupport;
  // }
  // //Support-1
  // tableTop.add(createTableSupport(-11, -5, 5, 10));

  // //Support-2
  // tableTop.add(createTableSupport(-11, -5, -5, 10));

  // //Support-3
  // tableTop.add(createTableSupport(11, -5, 5, 10));

  // //Support-4
  // tableTop.add(createTableSupport(11, -5, -5, 10));

  // //Support-5
  // tableTop.add(createTableSupport(-11, -5, 0, 10, true));

  // //Support-6
  // tableTop.add(createTableSupport(-11, -10, 0, 10.6, true));

  // //Support-7
  // tableTop.add(createTableSupport(11, -5, 0, 10, true));

  // //Support-8
  // tableTop.add(createTableSupport(11, -10, 0, 10.6, true));

  // //Chair
  // const seatShape = new THREE.Shape();
  // seatShape.moveTo(0, 0);

  // seatShape.lineTo(-2, 6);
  // seatShape.lineTo(6, 6);
  // seatShape.lineTo(4, 0);

  // const extrudeSettings = {
  //   steps: 6,
  //   depth: 0.2,
  //   bevelEnabled: true,
  //   bevelThickness: 0.3,
  //   bevelSize: 0.1,
  //   bevelOffset: 1,
  //   bevelSegments: 5,
  // };

  // const geometry = new THREE.ExtrudeGeometry(seatShape, extrudeSettings);
  // var chairSeatTexture = new THREE.TextureLoader().load(
  //   "../textures/chair-top4.jpg"
  // );
  // chairSeatTexture.wrapS = THREE.RepeatWrapping;
  // chairSeatTexture.wrapT = THREE.RepeatWrapping;
  // chairSeatTexture.repeat.set(1, 1);
  // chairSeatTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // const chairSeatMaterial = new THREE.MeshStandardMaterial({
  //   map: chairSeatTexture,
  // });
  // const seatPlane = new THREE.Mesh(geometry, chairSeatMaterial);
  // seatPlane.position.set(0, 7, -2);
  // seatPlane.rotation.x = THREE.MathUtils.degToRad(90);
  // seatPlane.rotation.z = THREE.MathUtils.degToRad(90);
  // seatPlane.castShadow = true;
  // scene.add(seatPlane);

  // function createChairSupport(posX, posY, posZ, angle) {
  // var chairSupport = new THREE.CylinderGeometry(0.3, 0.3, 7, 36);
  // const chairSupportMat = tableSupportMaterial;
  // chairSupport = new THREE.Mesh(chairSupport, chairSupportMat);
  // chairSupport.position.set(posX, posY, posZ);
  // chairSupport.rotation.x = THREE.MathUtils.degToRad(angle);
  // chairSupport.castShadow = true;
  //   return chairSupport;
  // }

  // //Chair support-1
  // seatPlane.add(createChairSupport(4.6, 0, 3.6, -85));

  // //Chair support-2
  // seatPlane.add(createChairSupport(-0.6, 0, 3.6, -85));

  // //Chair support-3
  // seatPlane.add(createChairSupport(6, 6, 3.6, -97));

  // //Chair support-4
  // seatPlane.add(createChairSupport(-2, 6, 3.6, -97));

  // var chairBackSupport1 = new THREE.BoxGeometry(5.7, 0.3, 8);
  // var chairBackTexture = new THREE.TextureLoader().load(
  //   "../textures/chair-top4.jpg"
  // );
  // chairBackTexture.wrapS = THREE.RepeatWrapping;
  // chairBackTexture.wrapT = THREE.RepeatWrapping;
  // chairBackTexture.repeat.set(1, 1);
  // chairBackTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  // const chairBackMaterial = new THREE.MeshStandardMaterial({
  //   map: chairBackTexture,
  // });
  // chairBackSupport1 = new THREE.Mesh(chairBackSupport1, chairBackMaterial);
  // chairBackSupport1.position.set(2, -0.6, -4);
  // chairBackSupport1.castShadow = true;
  // chairBackSupport1.rotation.x = THREE.MathUtils.degToRad(-5);
  // seatPlane.add(chairBackSupport1);

  var lampBottom = new THREE.CircleGeometry(1.5, 40);
  // var lampBottomMaterial = tableSupportMaterial;
  var lampBottomMaterial = new THREE.MeshBasicMaterial({
    color: 0x778bf2,
    side: THREE.DoubleSide,
  });
  lampBottom = new THREE.Mesh(lampBottom, lampBottomMaterial);
  lampBottom.rotation.x = THREE.MathUtils.degToRad(-90);
  lampBottom.position.set(0, 5, 0);
  scene.add(lampBottom);
  lampBottom.add(new THREE.AxesHelper(8));

  var lampSupport1 = new THREE.CylinderGeometry(0.15, 0.15, 3, 36);
  const lampSupportMat = tableSupportMaterial;
  lampSupport1 = new THREE.Mesh(lampSupport1, lampSupportMat);
  lampSupport1.position.set(0, 0, 1.5);
  lampSupport1.rotation.x = THREE.MathUtils.degToRad(90);
  lampSupport1.castShadow = true;
  lampBottom.add(lampSupport1);

  var lampSupport = new THREE.CylinderGeometry(0.15, 0.15, 2, 36);
  lampSupport = new THREE.Mesh(lampSupport, lampBottomMaterial);
  lampSupport.position.set(0.34, 0, 3.9);
  lampSupport.rotation.x = THREE.MathUtils.degToRad(90);
  lampSupport.rotation.z = THREE.MathUtils.degToRad(-20);
  lampSupport.castShadow = true;
  lampBottom.add(lampSupport);

  var lampSupport = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 36);
  lampSupport = new THREE.Mesh(lampSupport, lampBottomMaterial);
  lampSupport.position.set(1.18, 0, 5.33);
  lampSupport.rotation.x = THREE.MathUtils.degToRad(90);
  lampSupport.rotation.z = THREE.MathUtils.degToRad(-45);
  lampSupport.castShadow = true;
  lampBottom.add(lampSupport);

  const points = [];
  var lampHeight = 5;
  var lampTopCircle = 1;
  for (let i = 0; i < lampHeight; i++) {
    points.push(
      new THREE.Vector2(Math.sin(i * 0.2) * 4 + lampTopCircle, (i - 4) * 1)
    );
  }
  var lampTop = new THREE.LatheGeometry(points, 30);
  lampTop = new THREE.Mesh(lampTop, lampBottomMaterial);
  lampTop.rotation.x = THREE.MathUtils.degToRad(-90);
  lampTop.scale.set(.5,.5,.5);
  lampTop.position.set(0, 0, 5);
  lampBottom.add(lampTop);
  

  gui.add(options, "isShowWall").onChange(function (input) {
    options.isShowWall = input;
    if (options.isShowWall == true) {
      showWall();
    } else {
      scene.remove(wallObj);
    }
  });
  gui.add(options, "x", -100, 100);
  gui.add(options, "y", -100, 100);
  gui.add(options, "z", -100, 100);

  //Grid Helper
  // const gridHelper = new THREE.GridHelper(30);
  // scene.add(gridHelper);

  // ---------------Light----------------

  // const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  // pointLight.castShadow = true;
  // pointLight.shadow.mapSize.width = 1024;
  // pointLight.shadow.mapSize.height = 1024;
  // pointLight.position.set(-39, 39, 4);
  // scene.add(pointLight);

  // const sphereSize = 5;
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  // scene.add(pointLightHelper);

  const ambientLight = new THREE.AmbientLightProbe(0xffffff, 0.9);
  ambientLight.position.set(0, 0, 0);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    // lampSupport.position.set(options.x, options.y, options.z);
    renderer.render(scene, camera);
  }
  animate();

  // var clock = new THREE.Clock();
  // function lightMove() {
  //   const time = clock.getElapsedTime();
  //   pointLight.position.x = Math.sin(time) * -39;
  //   pointLight.position.y = 39;
  //   pointLight.position.z = Math.cos(time) * 4;
  //   requestAnimationFrame(lightMove);
  // }

  // lightMove();

  function moveCamera() {
    camera.position.x = Math.sin(cameraRotationVar) * 40;
    camera.position.y = cameraPositionY;
    camera.position.z = Math.cos(cameraRotationVar) * 40;
    camera.lookAt(0, 5, 0);
    renderer.render(scene, camera);
  }

  function keyPressEventHandle() {
    document.onkeyup = function (event) {
      switch (event.key) {
        case "ArrowUp":
          cameraPositionY += 1;
          if (cameraPositionY > 50) {
            cameraPositionY = 50;
          }
          moveCamera();
          break;
        case "ArrowDown":
          cameraPositionY -= 1;
          if (cameraPositionY < 20) {
            cameraPositionY = 20;
          }
          moveCamera();
          break;

        case "ArrowLeft":
          cameraRotationVar += 0.03;
          moveCamera();
          break;

        case "ArrowRight":
          cameraRotationVar -= 0.03;
          moveCamera();
          break;
      }
    };
  }

  keyPressEventHandle();

  function mouseClickEventHandle() {
    addEventListener("click", (event) => {
      tableTextureNo = (tableTextureNo + 1) % tableTextures.length;
      console.log(tableTextureNo);
      tableTexture.dispose();
      tableTexture = new THREE.TextureLoader().load(
        tableTextures[tableTextureNo]
      );
      tableTexture.wrapS = THREE.RepeatWrapping;
      tableTexture.wrapT = THREE.RepeatWrapping;
      tableTexture.repeat.set(1, 1);
      tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tableTopMaterial.map = tableTexture;
    });
  }

  mouseClickEventHandle();

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
