interface ITemperature {
    Units: string;
    Current: number
}

interface IWeatherForecast {
    City: string;
    Condition: string;
    Description: string;
    IconUrl: string;
    Temperatures: ITemperature[];
    Wind: string;
    Gusts: string;
    Humidity: number
}
