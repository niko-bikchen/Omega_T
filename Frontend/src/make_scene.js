




var makeScene=function (options, domElementId){
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
        options.surface.material.specular=new THREE.Color(options.surface.color);
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

    let scene = new THREE.Scene();
    let Scontainer = domElementId;
    let renderer = new THREE.WebGLRenderer(Scontainer);
    let aspect = (Scontainer.offsetWidth - 20) / Scontainer.offsetHeight;
    let camera = new THREE.PerspectiveCamera(20, aspect, 0.1, 200);
    let cameraRotation = 0.1;
    let cameraRotationSpeed = 0.001;
    let cameraAutoRotation = true;
    let orbitControls = new THREE.OrbitControls(camera);


    // Lights
    let spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);

    // Texture Loader
    let textureLoader = new THREE.TextureLoader();

    var mars =createPlanet(options);

    let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

    // Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
        function (texture) {
            galaxyMaterial.map = texture;
            scene.add(galaxy);
        }
    );

    // Scene, Camera, Renderer Configuration
    renderer.setSize(Scontainer.offsetWidth - 26, Scontainer.offsetHeight);
    Scontainer.append(renderer.domElement);

    camera.position.set(1, 1, 1);
    orbitControls.enabled = !cameraAutoRotation;

    scene.add(camera);
    scene.add(spotLight);
    scene.add(mars);

    // Light Configurations
    spotLight.position.set(2, 0, 1);



    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener('resize', function () {
        camera.aspect = Scontainer.offsetWidth / Scontainer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(Scontainer.offsetWidth - 20, Scontainer.offsetHeight);
    });
    // Main render function
    let render = function () {
        if (cameraAutoRotation) {
            cameraRotation += cameraRotationSpeed;
            camera.position.y = 0;
            camera.position.x = 2 * Math.sin(cameraRotation);
            camera.position.z = 2 * Math.cos(cameraRotation);
            camera.lookAt(mars.position);

        }
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();

}
module.exports=makeScene;