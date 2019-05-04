var camera, scene, renderer,sceneBG,cameraBG;
var geometry, material, mesh,sun,earth,mars,saturn,venus,neptune,jupiter,mercury,uranus;
var t=0;
var t1=0;
init();
animate();
var canvas = document.getElementById('jojo')

function createPlanet(radius, distance,texture) {
    var orbitContainer = new THREE.Object3D();



    var orbit = new THREE.Object3D();

    var geometry1 = new THREE.CircleGeometry(distance, 100);
    geometry1.vertices.shift();
    var line = new THREE.Line(
        geometry1,
        new THREE.LineBasicMaterial({color: 'aqua'})
    );

    line.rotation.x = Math.PI * 0.5;

    var planet = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius,20,0.2),
        new THREE.MeshPhongMaterial({map:texture})
    );
    planet.position.set(distance, 0.0, 0.0);

    orbit.add(line);
    orbit.add(planet);

    orbitContainer.add(orbit);
    scene.add(orbitContainer);

    return [orbit,planet];
}

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 0.5;

    scene = new THREE.Scene();



  //  scene.add( mesh );
    var suntexture=THREE.ImageUtils.loadTexture("../assets/images/2k_sun.jpg");
        var sphereGeometry = new THREE.SphereGeometry(0.2,20,0.2);
        var sunMaterial=new THREE.MeshPhongMaterial( {
            emissiveMap:suntexture,
            emissive:0xffff00} )
     sun = new THREE.Mesh(sphereGeometry,sunMaterial);
    var pointLight = new THREE.PointLight(0xffffff, 1.0, 3000.0);
    sun.add(pointLight);
    scene.add(sun);



    var textures=[THREE.ImageUtils.loadTexture("../assets/images/2k_earth_daymap.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_mars.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_venus_surface.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_jupiter.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_mercury.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_neptune.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_uranus.jpg"),
        THREE.ImageUtils.loadTexture("../assets/images/2k_saturn.jpg")]

    mercury=createPlanet(0.03,0.3,textures[4]);
    venus=createPlanet(0.15,0.7,textures[2]);
    earth=createPlanet(0.13,1.1,textures[0]);
    mars=createPlanet(0.12,1.5,textures[1]);
    jupiter=createPlanet(0.2,2,textures[3]);
    saturn=createPlanet(0.2,2.5,textures[7]);
    uranus=createPlanet(0.12,3,textures[6]);
    neptune=createPlanet(0.11,3.5,textures[5]);




    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.position.x = 0;
    camera.position.y = 4;
    camera.position.z = 0;
    camera.lookAt(scene.position);
    $("#jojo").append( renderer.domElement );
    renderer.render(scene,camera);



}

function animate() {

    requestAnimationFrame( animate );
    sun.rotation.y+=0.02
    mercury[0].rotation.y+=0.047;
    mercury[1].rotation.y+=0.03;
    venus[0].rotation.y+=0.035;
    venus[1].rotation.y+=0.03;
    earth[0].rotation.y+=0.029;
    earth[1].rotation.y+=0.03;
    mars[0].rotation.y+=0.024;
    mars[1].rotation.y+=0.02;
    jupiter[0].rotation.y+=0.013;
    jupiter[1].rotation.y+=0.03;
    saturn[0].rotation.y+=0.00969;
    saturn[1].rotation.y+=0.03;
    uranus[0].rotation.y+=0.00681;
    uranus[1].rotation.y+=0.03;
    neptune[0].rotation.y+=0.00543;
    neptune[1].rotation.y+=0.03;
    renderer.render( scene, camera );

}

