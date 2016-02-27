interface IWeatherController {
    Forecast: IWeatherForecast,
    ValidDataLoaded: boolean
}

( () => {
    
    class WeatherController implements IWeatherController {
        
        static $inject = ["WeatherService", "$scope"];
        
        // ViewModel
        Query: string;
        Forecast: IWeatherForecast;
        ValidDataLoaded: boolean;
//        WeatherService: IWeatherService;

        constructor (WeatherService: IWeatherService,
                     $scope: ng.IScope) {
//            this.WeatherService = WeatherService;
            $scope.$watch(this.Query, () => { this.GetWeather(WeatherService); } ); 
            this.ValidDataLoaded = false;
        }
        
        GetWeather(WeatherService: IWeatherService) : void {
            WeatherService.GetWeather()
                .then ((result) => {
                    this.Forecast = result;
                    this.ValidDataLoaded = true;
                });
        } 
        
    }
    
    angular
        .module ('weatherWidget')
        .controller('WeatherController', WeatherController);
        
})()