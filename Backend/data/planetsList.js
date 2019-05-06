var planetList=[
    {
        name:"Mercury",
        description:"Eternal",
        info:" Alamar",
        longRead:"The home of Rally and safari",
        surface: {
            color:'orange',
            size: 0.2,
            material: {
                bumpScale: 0.0005,
                specular:null,
                shininess: 3
            },
            textures: {
                map: 'assets/images/mercury/mercurymap.jpg',
                bumpMap: 'assets/images/mercury/mercurybump.jpg',
                specularMap:null
            }
        },
        atmosphere: null
    },
    {
        name:"Venus",
        description:"Love full",
        info:" Brontes , Braxis",
        longRead:"The planet has lots of recreation centers and resort",
        surface: {
            size: 0.21,
            color:'grey',
            material: {
                bumpScale: 0.005,
                specular:null,
                shininess: 4
            },
            textures: {
                map: 'assets/images/venusmap.jpg',
                bumpMap: 'assets/images/venusbump.jpg',
                specularMap:null
            }
        },
        atmosphere: null

    },
    {
        name:"Earth",
        description:"Home planet",
        info:" Aiur , Ravara , Torus",
        longRead:"Cradle of humanity and the most expensive planet to live",
        surface: {
            size: 0.23,
            color:'grey',
            material: {
                bumpScale: 0.009,
                specular: null,
                shininess: 10
            },
            textures: {
                map: 'assets/images/earth/earthmap1k.jpg',
                bumpMap: 'assets/images/earth/earthbump1k.jpg',
                specularMap: 'assets/images/earth/earthspec1k.jpg'
            }
        },
        atmosphere: {
            size: 0.003,
            material: {
                opacity: 0.8
            },
            textures: {
                map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
                alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg'
            },
            glow: {
                size: 0.02,
                intensity: 0,
                fade: 90,
                color: 0x93cfef
            }
        }

    },

    {
        name:"Mars",
        description:"Blood full",
        info:"Mar'Sara , Zerus",
        longRead:"Got the second name due to two wars between colonists.",
        surface: {
            size: 0.21,
            color:'red',
            material: {
                bumpScale: 0.006,
                specular: null,
                shininess: 2
            },
            textures: {
                map: 'assets/images/mars/mars_1k_color.jpg',
                bumpMap: 'assets/images/mars/marsbump1k.jpg',
                specularMap:null
            }
        },
        atmosphere: null

    },
    {
        name:"Jupiter",
        description:"The biggest",
        info:"RedStone",
        longRead:"Majority of colonists are workers of local gas-extracting enterprise",
        surface: {
            size: 0.5,
            color:'grey',
            material: {
                bumpScale: 0.5,
                specular: null,
                shininess: 1
            },
            textures: {
                map: 'assets/images/jupiter/jupiter2_4k.jpg',
                bumpMap: null,
                specularMap:null
            }
        },
        atmosphere: null

    },

    {
        name:"Saturn",
        description:"FullMetal",
        info:"Korhal",
        longRead:"Most colonists are workers of local metal-extracting enterprise ",
        surface: {
            size: 0.25,
            color:'grey',
            material: {
                bumpScale: 0.05,
                specular: null,
                shininess: 4
            },
            textures: {
                map: 'assets/images/saturn/saturnmap.jpg',
                bumpMap: null,
                specularMap:null
            }
        },
        atmosphere: null

    },

    {
        name:"Uranus",
        description:"Classic",
        info:"Char",
        longRead:"Most of the time colonists contemplate the winter blizzards",
        surface: {
            size: 0.3,
            color:'blue',
            material: {
                bumpScale: 0.05,
                specular: null,
                shininess: 1
            },
            textures: {
                map: 'assets/images/uranus/uranusmap.jpg',
                bumpMap: null,
                specularMap:null
            }
        },
        atmosphere: null

    },

    {
        name:"Neptune",
        description:"Ice Gigant",
        info:"Tarsonis",
        longRead:"Home of gasiceboardists and winter olympic games",
        surface: {
            size: 0.3,
            color:'blue',
            material: {
                bumpScale: 0.05,
                specular:null,
                shininess: 3
            },
            textures: {
                map: 'assets/images/neptune/neptunemap.jpg',
                bumpMap: null,
                specularMap:null
            }
        },
        atmosphere: null

    },

    {
        info:"Jotun",
        surface: {
            size: 0.1,
            color:'grey',
            material: {
                bumpScale: 0.05,
                specular: null,
                shininess: 3
            },
            textures: {
                map: 'assets/images/neptune/neptunemap.jpg',
                bumpMap: null,
                specularMap:null
            }
        },
        atmosphere: null

    },
    {
        info:"IgnisFati",
        surface: {
            size: 0.4,
            color:'blue',
            material: {
                bumpScale: 0.05,
                specular: null,
                shininess: 3
            },
            textures: {
                map: 'assets/images/pluto/plutomap2k.jpg',
                bumpMap: 'assets/images/pluto/plutobump2k.jpg',
                specularMap:null
            }
        },
        atmosphere: null
    },
    {
        info:"Gloria",
        surface: {
            size: 0.4,
            color:"blue",
            material: {
                bumpScale: 0.05,
                specular: null,
                shininess: 3
            },
            textures: {
                map: 'assets/images/pluto/plutomap2k.jpg',
                bumpMap: 'assets/images/pluto/plutobump2k.jpg',
                specularMap:null
            }
        },
        atmosphere: null
    }

];

exports.planetsList2 = planetList;