const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const scene = new THREE.Scene();
let angle = 0;

//----------------Floor------------------
const tilesTexture = new THREE.TextureLoader().load("textures/tiles.jpg");
tilesTexture.wrapS = THREE.RepeatWrapping;
tilesTexture.wrapT = THREE.RepeatWrapping;
tilesTexture.repeat.set(8, 10);
const geo0 = new THREE.PlaneGeometry(80, 80);
const me0 = new THREE.MeshStandardMaterial({
    map: tilesTexture,
});
tilesTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
const floor = new THREE.Mesh(geo0, me0);
scene.add(floor);



// ---------------Table-----------------

//----Table top----
const tableTexture = new THREE.TextureLoader().load("textures/tabletop.jpg");
tableTexture.wrapS = THREE.RepeatWrapping;
tableTexture.wrapT = THREE.RepeatWrapping;
tableTexture.repeat.set(1, 1);
let tableTop = new THREE.BoxGeometry(20, 12, 0.4);
let tableTopMAterial = new THREE.MeshStandardMaterial({
    map: tableTexture,
});
tableTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
tableTop = new THREE.Mesh(tableTop, tableTopMAterial);
tableTop.position.set(0, 0, 7);
scene.add(tableTop);



// -------Table Legs--------
let tableLeg1 = new THREE.BoxGeometry(0.8, 0.8, 7);
const tableLeg1Material = new THREE.MeshBasicMaterial({ color: 0x00ff });
tableLeg1 = new THREE.Mesh(tableLeg1, tableLeg1Material);
tableLeg1.position.set(-9.5, -5.5, 3.5);
scene.add(tableLeg1);

let tableLeg2 = new THREE.BoxGeometry(0.8, 0.8, 7);
const tableLeg2Material = new THREE.MeshBasicMaterial({ color: 0x00ff });
tableLeg2 = new THREE.Mesh(tableLeg2, tableLeg2Material);
tableLeg2.position.set(9.5, -5.5, 3.5);
scene.add(tableLeg2);

let tableLeg3 = new THREE.BoxGeometry(0.8, 0.8, 7);
const tableLeg3Material = new THREE.MeshBasicMaterial({ color: 0x00ff });
tableLeg3 = new THREE.Mesh(tableLeg3, tableLeg3Material);
tableLeg3.position.set(9.5, 5.5, 3.5);
scene.add(tableLeg3);


let tableLeg4 = new THREE.BoxGeometry(0.8, 0.8, 7);
const tableLeg4Material = new THREE.MeshBasicMaterial({ color: 0x00ff });
tableLeg4 = new THREE.Mesh(tableLeg4, tableLeg4Material);
tableLeg4.position.set(-9.5, 5.5, 3.5);
scene.add(tableLeg4);


// ---------------Light----------------
// const light = new THREE.PointLight(0xffffff, 1, 1000);
// light.position.set(0, 60, 10);
// light.rotation.x -= Math.PI / 2;
// scene.add(light);
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);


// -----------------Camera----------------
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 100);
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 30;
scene.add(camera);

// // rotations 
// floor.rotation.x = angle * Math.PI / 180;
// tableTop.rotation.x = angle * Math.PI / 180;
// tableLeg1.rotation.x = angle * Math.PI / 180;


renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0xffffff, 1);
renderer.clear();
const controls = new THREE.OrbitControls(camera, renderer.domElement);


window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);

});


const loop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

loop();