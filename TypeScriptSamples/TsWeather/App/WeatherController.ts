interface IWeatherController {
    Forecast: IWeatherForecast,
    ValidDataLoaded: boolean
}

( () => {
    
    class WeatherController implements IWeatherController {
        Forecast: IWeatherForecast = null;
        ValidDataLoaded: boolean = false;        
    }
    
    angular
        .module ('weatherWidget')
        .controller('WeatherController', WeatherController);
        
})()