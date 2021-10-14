import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'



// Debug
//const gui = new dat.GUI()

//Loading
//const textureLoader = new THREE.TextureLoader()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// Torus

const part1Texture = new THREE.TextureLoader().load('/textures/nebula3.jpg');
const part1normal = new THREE.TextureLoader().load('/textures/normal.jpg');  

const particlesMaterial = new THREE.MeshStandardMaterial({
    map: part1Texture,
    normalMap: part1normal  
  })

const particlesMaterial2 = new THREE.PointsMaterial({
  size:0.07,color: 0xf0ffff,  
    
  })  
const particlesMaterial2_ = new THREE.PointsMaterial({
  size:0.0002,color: 0xffffff, 
 
  })    

const part3Texture = new THREE.TextureLoader().load('/textures/nebula3.jpg');
const part3normal = new THREE.TextureLoader().load('/textures/normal.jpg');  
const particlesMaterial3 = new THREE.MeshStandardMaterial(
    {
    map: part3Texture,
    normalMap: part3normal   
    }
  ) 
particlesMaterial3.metalness= 0.7;
particlesMaterial3.roughness= 0.2;
particlesMaterial3.color = new THREE.Color(0x292929)   



particlesMaterial.metalness= 0.7;
particlesMaterial.roughness= 0.2;
particlesMaterial.color = new THREE.Color(0x292929)  

const clustermaterial1 = new THREE.MeshBasicMaterial(
    {
        map: part1Texture,
        normalMap: part1normal  
    }
)
clustermaterial1.color = new THREE.Color(0xff00ff);
clustermaterial1.metalness =0.7 ; 
clustermaterial1.roughness =0.2;


const geometry = new THREE.TorusKnotBufferGeometry(2 , 0.1,64,9, 20,11);

const geometry2 = new THREE.SphereBufferGeometry(500, 10, 20, 50);
const geometry3 = new THREE.TorusBufferGeometry(3, 0.1, 100,3)
const geometry2_ = new THREE.TorusKnotBufferGeometry(200 , 40,64,9, 20,11);

const torus = new THREE.Mesh(geometry, particlesMaterial);

const torus2 = new THREE.Points(geometry2, particlesMaterial2);
const torus3 = new THREE.Mesh(geometry3,particlesMaterial3);
const torus2_= new THREE.Points(geometry2_,particlesMaterial2_);


torus.position.set(-7, 0.5, -5);
torus2.position.set(0, 0, 5);
//torus2_.position.set(-6,0.1,30)
torus2_.position.set(-1,0.1,3)
torus3.position.set(4,0.5,-5);


// STARS

const clusters1geo1 = new THREE.BufferGeometry;
const clustersCnt1 = 200;

const posArray1 = new Float32Array(clustersCnt1*3); 

for (let i=0; i<clustersCnt1*3; i++ ){
    posArray1[i] = Math.random()-0.5
};
clusters1geo1.setAttribute('positiom',new THREE.BufferAttribute(posArray1,3))
const clustersmesh1 = new THREE.Points(clusters1geo1,clustermaterial1)

scene.add(torus,torus2,torus3,torus2_,clustersmesh1);

//STARS

// Lights

//Background lighting 
//THREE.PointLightHelper()


//const blueLight = new THREE.PointLight(0x3677ac,50,40,1,70);
const whiteLight = new THREE.PointLight(0xffffff,200,50,40,1,30);
whiteLight.position.set (-7,0.5,-5);
scene.add(whiteLight);

const bluLight = new THREE.PointLight(0x00000f,200,50,40,1,30);
bluLight.position.set (-7,0.5,-5);
scene.add(bluLight);

const triangleLight = new THREE.PointLight(0xff0000,200,30,40,1,70);
triangleLight.position.set (7,0.5,-4);
scene.add(triangleLight);

const triangleLight2 = new THREE.PointLight(0xadd8e6 ,200,30,40,1,70);
triangleLight2.position.set (-5,0.5,-4);
scene.add(triangleLight2);

//mopnlight1
const aquaLight = new THREE.PointLight(0xe1ff,500,50,40,1,70);
//aquaLight.position.set (4,5,-5);
scene.add(aquaLight);
//aquaLight.position.z = 20;
//aquaLight.position.y = 1;
//aquaLight.position.setX(-10);
aquaLight.position.set(-7,-2,25);

//moonlight2
const redLight = new THREE.PointLight(0xff0000,200,50,40,1,70);
redLight.position.set (34,6,-5);
scene.add(redLight);

redLight.position.z = 35;
redLight.position.setX(-10);



const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

//const ambientLight = new THREE.AmbientLight(0xffffff,1);
//ambientLight.position.set(0, 0, 0)
//scene.add(pointLight);
///STAR
//Create Multi particles 
// Avatar

const ZTexture = new THREE.TextureLoader().load('/textures/me.jpg');

const Z = new THREE.Mesh(new THREE.BoxGeometry(1.3,1.3,1.3), new THREE.MeshBasicMaterial({ map: ZTexture }));

scene.add(Z);

// Moon

const moonTexture = new THREE.TextureLoader().load('/textures/nebula3.jpg');
const normalTexture = new THREE.TextureLoader().load('textures/normal.jpg');
const moongeo = new THREE.SphereGeometry(3,32,32);
const moon_material = new THREE.MeshStandardMaterial( {
  map: moonTexture,
  normalMap: normalTexture
});
moon_material.metalness= 0.7;
moon_material.roughness= 0.2;
moon_material.color = new THREE.Color(0x292929)    
    
const moon = new THREE.Mesh(moongeo,moon_material);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

Z.position.z = -5;
Z.position.x = 4;
Z.position.y = 0.7;
///MOON


// Background

const spaceTexture = new THREE.TextureLoader().load('/textures/nebula.jpg');
scene.background = spaceTexture;
////



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3
camera.position.y = 0
camera.position.z = 30
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
   // alpha:true
});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
////

function addStar() {
    const geometry_23 = new THREE.SphereGeometry(0.03, 600, 24);
    const material_23 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starplus = new THREE.Mesh(geometry_23, material_23);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    starplus.position.set(x, y, z);
  
    scene.add(starplus);
  
    starplus.position.z += 0.2;
  
    renderer.render(scene, camera);
  
  }
  
  Array(200).fill().forEach(addStar);
/////
/**
 * Animate
 
 * 
 */

const clock = new THREE.Clock()
//////////
//Mouse Scrolling Effect
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    //moon.rotation.x += 0.05;
    //moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;
    //torus.position.x -=0.1;
   // Z.rotation.y += 0.01;
    //Z.rotation.z += 0.01;
    
    
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.002;
    camera.rotation.y = t * -0.0002;
   
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();
  
////
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    torus.rotation.Z = Math.PI / 2;
    torus.rotation.y += 0.0005;
    torus.rotation.z += 0.009;
    torus2.rotation.y += 0.0009;
    torus2.rotation.z += 0.0008;
    torus2.rotation.x +=0.0004;


    torus3.rotation.z +=0.002;
    moon.rotation.z += 0.002;
    Z.rotation.y -= 0.01
    Z.rotation.z += 0.005

    torus2_.rotation.y -= 0.00006;
  
    torus2_.rotation.z -= 0.0008;
    torus2_.rotation.x -=0.00004;
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()