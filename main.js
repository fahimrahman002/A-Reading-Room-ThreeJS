const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// ------------- Set renderer-------------
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
let angle = 0;


// // ---------------Light----------------
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(40, 80, 4);
pointLight.castShadow = true; // default false
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight);

//0.6
const ambientLight = new THREE.AmbientLightProbe(0xffffff, 0.6);
ambientLight.position.set(40, 80, 4);
scene.add(ambientLight);


// ----------Axis helper--------------
const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

//----------------Floor------------------
const tilesTexture = new THREE.TextureLoader().load("textures/new tiles.jpg");
tilesTexture.wrapS = THREE.RepeatWrapping;
tilesTexture.wrapT = THREE.RepeatWrapping;
tilesTexture.repeat.set(15, 15);
tilesTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

let floor = new THREE.PlaneGeometry(80, 80);
const floorMaterial = new THREE.MeshStandardMaterial({
    map: tilesTexture,
});
floor = new THREE.Mesh(floor, floorMaterial);
floor.rotation.x = -90 * Math.PI / 180;
floor.receiveShadow = true; //default
scene.add(floor);



// ---------------Table-----------------

// //----Table top----
const tableTextures = ['textures/tabletop.jpg', 'textures/tabletop1.jpg', 'textures/tabletop2.jpg', 'textures/tabletop3.jpg', 'textures/tabletop4.jpg'];
let tableTextureNo = 4;
let tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
tableTexture.wrapS = THREE.RepeatWrapping;
tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(1, 1);
tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableTopMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(tableTextures[tableTextureNo]),
});

let tableTop = new THREE.BoxGeometry(24, 0.4, 14);
tableTop = new THREE.Mesh(tableTop, tableTopMaterial);
tableTop.position.set(0, 10, 0);
tableTop.castShadow = true;
scene.add(tableTop);



// // -------Table Legs--------
let tableLegTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
tableLegTexture.wrapS = THREE.RepeatWrapping;
tableLegTexture.wrapT = THREE.RepeatWrapping;
tableLegTexture.repeat.set(1, 1);
tableLegTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const tableLegMaterial = new THREE.MeshStandardMaterial({
    map: tableLegTexture,
});

let tableLeg1 = new THREE.BoxGeometry(0.8, 10, 0.8);
tableLeg1 = new THREE.Mesh(tableLeg1, tableLegMaterial);
tableLeg1.position.set(-11.5, -5, 6.5);
tableLeg1.castShadow = true;
tableTop.add(tableLeg1);

let tableLeg2 = new THREE.BoxGeometry(0.8, 10, 0.8);
tableLeg2 = new THREE.Mesh(tableLeg2, tableLegMaterial);
tableLeg2.position.set(11.5, -5, 6.5);
tableLeg2.castShadow = true;
tableTop.add(tableLeg2);

let tableLeg3 = new THREE.BoxGeometry(0.8, 10, 0.8);
tableLeg3 = new THREE.Mesh(tableLeg3, tableLegMaterial);
tableLeg3.position.set(-11.5, -5, -6.5);
tableLeg3.castShadow = true;
tableTop.add(tableLeg3);


let tableLeg4 = new THREE.BoxGeometry(0.8, 10, 0.8);
tableLeg4 = new THREE.Mesh(tableLeg4, tableLegMaterial);
tableLeg4.position.set(11.5, -5, -6.5);
tableLeg4.castShadow = true;
tableTop.add(tableLeg4);

let tableLeg5 = new THREE.BoxGeometry(0.8, 0.6, 12.5);
tableLeg5 = new THREE.Mesh(tableLeg5, tableLegMaterial);
tableLeg5.position.set(11.5, -8, 0);
tableLeg5.castShadow = true;
tableTop.add(tableLeg5);

let tableLeg6 = new THREE.BoxGeometry(0.8, 0.6, 12.5);
tableLeg6 = new THREE.Mesh(tableLeg6, tableLegMaterial);
tableLeg6.position.set(-11.5, -8, 0);
tableLeg6.castShadow = true;
tableTop.add(tableLeg6);

let tableLeg7 = new THREE.BoxGeometry(23, 0.59, 0.8);
tableLeg7 = new THREE.Mesh(tableLeg7, tableLegMaterial);
tableLeg7.position.set(0, -8, 0);
tableLeg7.castShadow = true;
tableTop.add(tableLeg7);



// ----------- Chair --------------
//Chair top
let chairTexture = new THREE.TextureLoader().load(tableTextures[2]);
chairTexture.wrapS = THREE.RepeatWrapping;
chairTexture.wrapT = THREE.RepeatWrapping;
chairTexture.repeat.set(1, 1);
chairTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const chairMaterial = new THREE.MeshStandardMaterial({
    map: chairTexture,
});

let chairTop = new THREE.BoxGeometry(6, 0.5, 6);
chairTop = new THREE.Mesh(chairTop, chairMaterial);
chairTop.position.set(0, 6, 13);
chairTop.castShadow = true;
scene.add(chairTop);

//Chair legs
let chairLeg1 = new THREE.BoxGeometry(0.62, 14, 0.6);
chairLeg1 = new THREE.Mesh(chairLeg1, chairMaterial);
chairLeg1.position.set(-2.69, 1, 3);
chairLeg1.castShadow = true;
chairTop.add(chairLeg1);

let chairLeg2 = new THREE.BoxGeometry(0.62, 14, 0.6);
chairLeg2 = new THREE.Mesh(chairLeg2, chairMaterial);
chairLeg2.position.set(2.69, 1, 3);
chairLeg2.castShadow = true;
chairTop.add(chairLeg2);

let chairLeg3 = new THREE.BoxGeometry(0.6, 6, 0.6);
chairLeg3 = new THREE.Mesh(chairLeg3, chairMaterial);
chairLeg3.position.set(2.69, -3, -2.69);
chairLeg3.castShadow = true;
chairTop.add(chairLeg3);

let chairLeg4 = new THREE.BoxGeometry(0.6, 6, 0.6);
chairLeg4 = new THREE.Mesh(chairLeg4, chairMaterial);
chairLeg4.position.set(-2.69, -3, -2.69);
chairLeg4.castShadow = true;
chairTop.add(chairLeg4);

//Chair back supports
let chairBackSupport1 = new THREE.BoxGeometry(5.9, 0.59, 0.59);
chairBackSupport1 = new THREE.Mesh(chairBackSupport1, chairMaterial);
chairBackSupport1.position.set(0, 7.5, 3);
chairBackSupport1.castShadow = true;
chairTop.add(chairBackSupport1);

let chairBackSupport2 = new THREE.BoxGeometry(5.9, 0.59, 0.59);
chairBackSupport2 = new THREE.Mesh(chairBackSupport2, chairMaterial);
chairBackSupport2.position.set(0, 5.5, 3);
chairBackSupport2.castShadow = true;
chairTop.add(chairBackSupport2);

let chairBackSupport3 = new THREE.BoxGeometry(5.9, 0.59, 0.59);
chairBackSupport3 = new THREE.Mesh(chairBackSupport3, chairMaterial);
chairBackSupport3.position.set(0, 3.5, 3);
chairBackSupport3.castShadow = true;
chairTop.add(chairBackSupport3);


// Leg support
let chairLegSupport1 = new THREE.BoxGeometry(0.59, 0.59, 5.9);
chairLegSupport1 = new THREE.Mesh(chairLegSupport1, chairMaterial);
chairLegSupport1.position.set(-2.69, -3.5, 0);
chairLegSupport1.castShadow = true;
chairTop.add(chairLegSupport1);

let chairLegSupport2 = new THREE.BoxGeometry(0.59, 0.59, 5.9);
chairLegSupport2 = new THREE.Mesh(chairLegSupport2, chairMaterial);
chairLegSupport2.position.set(2.69, -3.5, 0);
chairLegSupport2.castShadow = true;
chairTop.add(chairLegSupport2);



// -------- Book shelf---------------
let bookShelfLeft = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfLeft = new THREE.Mesh(bookShelfLeft, tableTopMaterial);
bookShelfLeft.position.set(-11.69, 4, -4.48);
bookShelfLeft.castShadow = true;
tableTop.add(bookShelfLeft);

let bookShelfRight = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfRight = new THREE.Mesh(bookShelfRight, tableTopMaterial);
bookShelfRight.position.set(11.69, 4, -4.48);
bookShelfRight.castShadow = true;
tableTop.add(bookShelfRight);

let bookShelfTop = new THREE.BoxGeometry(24, 0.59, 5.02);
bookShelfTop = new THREE.Mesh(bookShelfTop, tableTopMaterial);
bookShelfTop.position.set(0, 8, -4.49);
bookShelfTop.castShadow = true;
tableTop.add(bookShelfTop);


let bookShelfMiddle = new THREE.BoxGeometry(23, 0.59, 4.99);
bookShelfMiddle = new THREE.Mesh(bookShelfMiddle, tableTopMaterial);
bookShelfMiddle.position.set(0, 4, -4.49);
bookShelfMiddle.castShadow = true;
tableTop.add(bookShelfMiddle);

let bookShelfVerticalMiddle = new THREE.BoxGeometry(0.59, 8, 5);
bookShelfVerticalMiddle = new THREE.Mesh(bookShelfVerticalMiddle, tableTopMaterial);
bookShelfVerticalMiddle.position.set(0, 4, -4.48);
bookShelfVerticalMiddle.castShadow = true;
tableTop.add(bookShelfVerticalMiddle);


let bookShelfBack = new THREE.BoxGeometry(24, 8, 0.4);
bookShelfBack = new THREE.Mesh(bookShelfBack, tableTopMaterial);
bookShelfBack.position.set(0, 4, -6.79);
bookShelfBack.castShadow = true;
tableTop.add(bookShelfBack);

// -----------------Camera----------------
let cameraRotationVar = 0.3;
let cameraPositionY = 30;
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 100);
camera.position.x = Math.sin(cameraRotationVar) * 27;
camera.position.y = cameraPositionY;
camera.position.z = Math.cos(cameraRotationVar) * 27;
camera.lookAt(0, 5, 0);
scene.add(camera);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0x0, 1);
renderer.clear();



window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);

});


const loop = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

loop();


clock = new THREE.Clock();

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

    if (e.keyCode == '38') {
        // up key
        cameraPositionY += 1;
        if (cameraPositionY > 50) {
            cameraPositionY = 50;
        }
        moveCamera();
    }
    else if (e.keyCode == '40') {
        // down arrow
        cameraPositionY -= 1;
        if (cameraPositionY < 20) {
            cameraPositionY = 20;
        }
        moveCamera();

    }
    else if (e.keyCode == '37') {
        // left arrow
        cameraRotationVar += 0.03;
        moveCamera();
    }

    else if (e.keyCode == '39') {
        // right arrow
        cameraRotationVar -= 0.03;
        moveCamera();

    }
}


// --------------For changing table texture with mouseclick--------------
addEventListener('click', (event) => {
    tableTextureNo += 1;
    tableTextureNo = tableTextureNo % 5;

    tableTexture.dispose();
    tableTexture = new THREE.TextureLoader().load(tableTextures[tableTextureNo]);
    tableTexture.wrapS = THREE.RepeatWrapping;
    tableTexture.wrapT = THREE.RepeatWrapping;
    tableTexture.repeat.set(1, 1);
    tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    tableTopMaterial.map = tableTexture;

    tableLegMaterial.map = tableTexture;
});
