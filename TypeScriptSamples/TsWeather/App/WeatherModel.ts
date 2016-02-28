// IWeatherForecast - A weather forecast
interface IWeatherForecast {
    City: string;
    Condition: string;
    Description: string;
    IconUrl: string;
    Temperatures: ITemperature[];
    Wind: string;
    Gusts: string;
    Humidity: number;
}

// ITemperature - a single temperature referenced in a weather forecast
interface ITemperature {
    Units: string;
    Current: number
}

// IWeatherError - error encountered when retrieving the weather
interface IWeatherError {
    ErrorMessage: string;
}
