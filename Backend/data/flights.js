var flights = [{
        id: 1,

        start_planet_id: 2,
        start_planet: "Earth",
        start_starport: "Torus",


        destination_planet_id: 3,
        destination_planet: "Mars",
        destination_starport: "Zerus",

        date_start: {
            day: '7',
            month: '5',
            year: '2019'
        },

        date_end: {
            day: '7',
            month: '5',
            year: '2019'
        },

        time_start: "12:00",
        time_end: "14:00",
        duration: "2",

        ship: "CR90 Corvette",

        standard: {
            vacant: 40,
            occupied: [],
            price: 100
        },

        lux: {
            vacant: 40,
            occupied: [],
            price: 200
        }
    },
    {
        id: 2,

        start_planet_id: 0,
        start_planet: "Mercury",
        start_starport: "Alamar",

        destination_planet_id: 4,
        destination_planet: "Upiter",
        destination_starport: "Redstone",

        date_start: {
            day: '7',
            month: '5',
            year: '2019'
        },

        date_end: {
            day: '7',
            month: '5',
            year: '2019'
        },

        time_start: "12:00",
        time_end: "16:00",
        duration: "4",

        ship: "Radiant VII",

        standard: {
            vacant: 40,
            occupied: [],
            price: 200
        },

        lux: {
            vacant: 40,
            occupied: [],
            price: 350
        }
    },
    {
        id: 3,

        start_planet_id: 1,
        start_planet: "Venus",
        start_starport: "Pridewater",


        destination_planet_id: 2,
        destination_planet: "Earth",
        destination_starport: "Aiur",

        date_start: {
            day: '7',
            month: '5',
            year: '2019'
        },

        date_end: {
            day: '7',
            month: '5',
            year: '2019'
        },

        time_start: "17:00",
        time_end: "19:00",
        duration: "2",

        ship: "Tantive IV",

        standard: {
            vacant: 40,
            occupied: [],
            price: 130
        },

        lux: {
            vacant: 40,
            occupied: [],
            price: 300
        }
    },
    {
        id: 4,

        start_planet_id: 3,
        start_planet: "Mars",
        start_starport: "Mar'Sara",


        destination_planet_id: 1,
        destination_planet: "Venus",
        destination_starport: "Braxis",

        date_start: {
            day: '7',
            month: '5',
            year: '2019'
        },

        date_end: {
            day: '7',
            month: '5',
            year: '2019'
        },

        time_start: "10:00",
        time_end: "12:00",
        duration: "2",

        ship: "Tantive IV",

        standard: {
            vacant: 40,
            occupied: [],
            price: 160
        },

        lux: {
            vacant: 40,
            occupied: [],
            price: 350
        }
    },
    {
        id: 5,

        start_planet_id: 2,
        start_planet: "Earth",
        start_starport: "Torus",


        destination_planet_id: 3,
        destination_planet: "Mars",
        destination_starport: "Zerus",

        date_start: {
            day: '7',
            month: '5',
            year: '2019'
        },

        date_end: {
            day: '7',
            month: '5',
            year: '2019'
        },

        time_start: "13:00",
        time_end: "15:00",
        duration: "2",

        ship: "CR90 Corvette",

        standard: {
            vacant: 40,
            occupied: [],
            price: 100
        },

        lux: {
            vacant: 40,
            occupied: [],
            price: 200
        }
    },
];

exports.flights = flights;