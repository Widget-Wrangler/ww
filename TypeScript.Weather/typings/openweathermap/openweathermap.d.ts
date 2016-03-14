// OpenWeatherMap 2.5 response
declare namespace owm {

    export interface Coord {
        lon: number;
        lat: number;
    }

    export interface Weather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    export interface Main {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        sea_level: number;
        grnd_level: number;
    }

    export interface Wind {
        speed: number;
        deg: number;
    }

    export interface Clouds {
        all: number;
    }

    export interface Sys {
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    }

    export interface Data {
        coord: Coord;
        weather: Weather[];
        base: string;
        main: Main;
        wind: Wind;
        clouds: Clouds;
        dt: number;
        sys: Sys;
        id: number;
        name: string;
        cod: number;
    }
}

