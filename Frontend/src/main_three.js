
var API=require('./API');
var planetList = [];

$(function(){
    API.getPlanetsList(function (err,data) {
        planetList = data.planetsList2;
        init();
    });



});

function init(){
    var sun,earth,mars,saturn,venus,neptune,jupiter,mercury,uranus;
    let renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let aspect = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(280, aspect, 0.1, 1500);

    camera.position.y=-3;
    camera.position.z=7;



    let textureLoader = new THREE.TextureLoader();

// Planet Proto
    let planetProto = {
        sphere: function(size) {
            let sphere = new THREE.SphereGeometry(size, 32, 32);

            return sphere;
        },
        material: function(options) {
            let material = new THREE.MeshPhongMaterial();
            if (options) {
                for (var property in options) {
                    material[property] = options[property];
                }
            }

            return material;
        },
        glowMaterial: function(intensity, fade, color) {
            // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
            let glowMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    'c': {
                        type: 'f',
                        value: intensity
                    },
                    'p': {
                        type: 'f',
                        value: fade
                    },
                    glowColor: {
                        type: 'c',
                        value: new THREE.Color(color)
                    },
                    viewVector: {
                        type: 'v3',
                        value: camera.position
                    }
                },
                vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
                ,
                fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`
                ,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            return glowMaterial;
        },
        texture: function(material, property, uri) {
            if(uri){
                let textureLoader = new THREE.TextureLoader();
                textureLoader.crossOrigin = true;
                textureLoader.load(
                    uri,
                    function(texture) {
                        material[property] = texture;
                        material.needsUpdate = true;
                    }
                );
            }

        }
    };


    let createPlanet = function(options) {
        // Create the planet's Surface
        let surfaceGeometry = planetProto.sphere(options.surface.size);
        options.surface.material.specular=new THREE.Color(options.color);
        let surfaceMaterial = planetProto.material(options.surface.material);
        let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

        let planet = new THREE.Object3D();
        surface.name = 'surface';
        planet.add(surface);

        // Create the planet's Atmosphere
        if(options.atmosphere){
            let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
            let atmosphereMaterialDefaults = {
                side: THREE.DoubleSide,
                transparent: true
            }
            let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
            let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
            let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

            // Create the planet's Atmospheric glow
            let atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
            let atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
            let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);
            atmosphere.name = 'atmosphere';
            atmosphericGlow.name = 'atmosphericGlow';
            planet.add(atmosphere);
            planet.add(atmosphericGlow);

            // Load the Atmosphere's texture
            for (let textureProperty in options.atmosphere.textures) {
                planetProto.texture(
                    atmosphereMaterial,
                    textureProperty,
                    options.atmosphere.textures[textureProperty]
                );
            }
        }
        // Load the Surface's textures
        ///*
        for (let textureProperty in options.surface.textures) {
            if(textureProperty)
            {
                planetProto.texture(
                    surfaceMaterial,
                    textureProperty,
                    options.surface.textures[textureProperty]
                );
            }

        }
        //*/

        // Mesh Configurations
        planet.receiveShadow = true;
        planet.castShadow = true;
        planet.getObjectByName('surface').geometry.center();


        return planet;
    };

    function createOrbit(radius, distance,numberOfPlanet) {
        var orbitContainer = new THREE.Object3D();
        var orbit = new THREE.Object3D();
        var geometry1 = new THREE.CircleGeometry(distance, 100);
        geometry1.vertices.shift();
        var line = new THREE.Line(
            geometry1,
            new THREE.LineBasicMaterial({color: 'aqua'})
        );
        line.visible=false;
        line.rotation.x = Math.PI * 0.5;
        var planet =createPlanet(planetList[numberOfPlanet]);
        planet.position.set(distance, 0.0, 0.0);
        orbit.add(line);
        orbit.add(planet);
        orbitContainer.add(orbit);
        scene.add(orbitContainer);
        return [orbit,planet];
    }

    let galaxyGeometry = new THREE.SphereGeometry(200, 64, 64);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
        function(texture) {
            galaxyMaterial.map = texture;
            scene.add(galaxy);
        }
    );

// Scene, Camera, Renderer Configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#jojo").append(renderer.domElement);


    var suntexture=THREE.ImageUtils.loadTexture("../assets/images/2k_sun.jpg");
    var sphereGeometry = new THREE.SphereGeometry(0.8,200,100);
    var sunMaterial=new THREE.MeshPhongMaterial( {
        emissiveMap:suntexture,
        emissive:0xffff00} )
    sun = new THREE.Mesh(sphereGeometry,sunMaterial);
    var pointLight = new THREE.PointLight(0xffffff, 1.0, 3000.0);
    sun.add(pointLight);
    scene.add(sun);

    mercury=createOrbit(0.03,2,0);
    venus=createOrbit(0.15,3,1);
    earth=createOrbit(0.13,3.6,2);
    mars=createOrbit(0.12,4.2,3);
    jupiter=createOrbit(0.2,5,4);
    saturn=createOrbit(0.2,6,5);
    uranus=createOrbit(0.12,7,6);
    neptune=createOrbit(0.11,8,7);

    mercury[0].rotation.y+=12;
    venus[0].rotation.y+=34;
    earth[0].rotation.y+=1;
    mars[0].rotation.y+=0;
    jupiter[0].rotation.y+=99;
    saturn[0].rotation.y+=144;
    uranus[0].rotation.y+=1232;
    neptune[0].rotation.y+=587;

    scene.add(camera);
    camera.lookAt(scene.position);

// Main render function
    let render = function() {



        sun.rotation.y+=0.002
        mercury[0].rotation.y+=0.0047;
        mercury[1].rotation.y+=0.003;
        venus[0].rotation.y+=0.0035;
        venus[1].rotation.y+=0.003;
        earth[0].rotation.y+=0.0029;
        earth[1].rotation.y+=0.003;
        mars[0].rotation.y+=0.0024;
        mars[1].rotation.y+=0.002;
        jupiter[0].rotation.y+=0.0013;
        jupiter[1].rotation.y+=0.003;
        saturn[0].rotation.y+=0.000969;
        saturn[1].rotation.y+=0.003;
        uranus[0].rotation.y+=0.000681;
        uranus[1].rotation.y+=0.003;
        neptune[0].rotation.y+=0.000543;
        neptune[1].rotation.y+=0.0003;
        renderer.render(scene, camera);
    };

/////
    TweenLite.ticker.addEventListener('tick', render );
    var controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 3.6;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 1;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.12;

    controls.enabled = true;
    TweenLite.ticker.addEventListener("tick", controls.update );


////////////////////////////////////////

    var timeline = new TimelineLite({
        onStart: function(){
            TweenLite.ticker.removeEventListener("tick", controls.update );
            controls.enabled = false;
        },
        onComplete: function(){
            TweenLite.ticker.addEventListener("tick", controls.update );
            controls.position0.copy(camera.position);
            controls.reset();
            controls.enabled = true;
        }
    });
    easing = 'Expo.easeInOut';


////////////////////////////////////////


    camera.reset = function(){

        var pos = { x: 0, y: 0 };
        var distance = 60;
        var speed = 1;

        if ( camera.parent !== scene ) {
            var pos = camera.position.clone();
            camera.parent.localToWorld(camera.position);
            scene.add(camera);
        }

        timeline.clear();
        timeline.to( camera.position, speed, {
            x: pos.x,
            y: pos.y,
            z: distance,
            ease: easing
        }, 0);
        timeline.to( camera.rotation, speed, { x: 0, y: 0, z: 0, ease: easing}, 0);

    };


////////////////////////////////////////

    camera.getDistance = function(object) {

        var helper = new THREE.BoundingBoxHelper(object, 0xff0000);
        helper.update();

        var width = helper.scale.x,
            height = helper.scale.y;

        // Set camera distance
        var vFOV = camera.fov * Math.PI / 180,
            ratio = 2 * Math.tan( vFOV / 2 ),
            screen = ratio * camera.aspect, //( renderer.domElement.width / renderer.domElement.height ),
            size = Math.max(height,width),
            distance = (size / screen) + (helper.box.max.z / screen);

        return distance;
    };


////////////////////////////////////////


    camera.zoom = function(object){

        var pos = camera.position.clone();
        object.worldToLocal(camera.position);
        object.add(camera);

        var speed = 1;
        timeline.clear();

        timeline.to( camera.position, speed, {
            x: pos.x,
            y: pos.y,
            z: camera.getDistance(object),
            ease: easing
        },0);

    };


////////////////////////////////////////


    var startX, startY,
        $target = $(renderer.domElement),
        selected;

    /*function mouseUp(e) {
        e = e.originalEvent || e;
        e.preventDefault();

        var x = ( e.touches ? e.touches[0].clientX : e.clientX ),
            y = ( e.touches ? e.touches[0].clientY : e.clientY ),
            diff = Math.max(Math.abs(startX - x), Math.abs(startY - y));

        if ( diff > 40 ) { return; }

        var mouse = {
            x: ( x / window.innerWidth ) * 2 - 1,
            y: - ( y / window.innerHeight ) * 2 + 1
        };

        var vector = new THREE.Vector3( mouse.x, mouse.y ).unproject( camera );
        var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        var intersects = raycaster.intersectObject( scene, true );

        if ( intersects.length > 0 && intersects[ 0 ].object !== selected ) {
            selected = intersects[ 0 ].object;
            camera.zoom(selected);
        } else {
            selected = null;
            camera.reset();
        }
    }*/

    function mouseDown( e ) {
        e = e.originalEvent || e;
        startX = ( e.touches ? e.touches[0].clientX : e.clientX );
        startY = ( e.touches ? e.touches[0].clientY : e.clientY );

        /* $target.one('mouseup touchend', mouseUp );

         setTimeout(function(){ $target.off('mouseup.part touchend.part'); },300);*/
    }


    $target.on('mousedown touchend', mouseDown );
////

    render();
}


exports.planetsList = planetList;