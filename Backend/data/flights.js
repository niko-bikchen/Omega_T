var flights = [{
        id: 1,

        start_planet_id:0,
        start_planet: "Oliv",
        start_starport: "Delkon",


        destination_planet_id:1,
        destination_planet: "Gulara",
        destination_starport: "Galendros",

        date_start: {
            day: 26,
            month: 4,
            year: 2019
        },

        date_end: {
            day: 26,
            month: 4,
            year: 2019
        },

        time_start: "12:00",
        time_end: "16:00",
        duration: "3",

        ship: "Turbofalcon XXZ",

        standard: {
            vacant: 40,
            occupied: []
        },
    },
    {
        id: 2,

        start_planet_id:2,
        start_planet: "Bruphiphus",
        start_starport: "Teranova",

        destination_planet_id:3,
        destination_planet: "Doria O476",
        destination_starport: "Yarnis",

        date_start: {
            day: 26,
            month: 4,
            year: 2019
        },

        date_end: {
            day: 26,
            month: 4,
            year: 2019
        },

        time_start: "12:00",
        time_end: "16:00",
        duration: "3",

        ship: "Turbofalcon XXX",

        standard: {
            vacant: 40,
            occupied: []
        },

        lux: {
            vacant: 40,
            occupied: []
        }
    },
    {
        id: 3,

        start_planet_id:0,
        start_planet: "Oliv",
        start_starport: "Delkon",


        destination_planet_id:1,
        destination_planet: "Gulara",
        destination_starport: "Galendros",

        date_start: {
            day: 26,
            month: 4,
            year: 2019
        },

        date_end: {
            day: 26,
            month: 4,
            year: 2019
        },

        time_start: "17:00",
        time_end: "19:00",
        duration: "2",

        ship: "Turbofalcon XXZ",

        standard: {
            vacant: 40,
            occupied: []
        },
    }
];

exports.flights = flights;