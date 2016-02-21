interface IWeatherService {
    GetWeather(): IWeatherForecast
}

( () => {
    
    class WeatherService implements IWeatherService {
        GetWeather() {
            return null;
        }
    }
    
    angular
        .module ('weatherWidget')
        .service('WeatherService', WeatherService);
        
})()