interface IWeatherController {
    Forecast: IWeatherForecast,
    ValidDataLoaded: boolean
}

( () => {
    
    class WeatherController implements IWeatherController {
        Forecast: IWeatherForecast = {
                City: "Boston",
                Condition: "Nice",
                Description: "Fake weather is always nice",
                IconUrl: "http://openweathermap.org/img/w/04n.png",
                Temperatures: [
                    { Units: "F", Current: 44.8 },
                    { Units: "C", Current: 7.1 }
                ],
                Wind: "5",
                Gusts: "999",
                Humidity: 87
            };
        ValidDataLoaded: boolean = true;        
    }
    
    angular
        .module ('weatherWidget')
        .controller('WeatherController', WeatherController);
        
})()