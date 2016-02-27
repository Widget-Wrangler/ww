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
        Error: string;
        ValidDataLoaded: boolean;
        WeatherService: IWeatherService;

        constructor (WeatherService: IWeatherService,
                     $scope: ng.IScope) {
            this.WeatherService = WeatherService;
            $scope.$watch(this.Query, () => { this.GetWeather(); } ); 
            this.ValidDataLoaded = false;
        }
        
        GetWeather() : void {
            this.WeatherService.GetWeather()
                .then ((result) => {
                    this.Forecast = <IWeatherForecast>result;
                    this.ValidDataLoaded = true;
                })
                .catch ((reason) => {
                    this.Error = (<IWeatherError>reason).ErrorMessage;
                })
        } 
        
    }
    
    angular
        .module ('weatherWidget')
        .controller('WeatherController', WeatherController);
        
})()