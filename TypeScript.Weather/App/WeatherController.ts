interface IWeatherController {      // Defines ViewModel for Weather Controller
    Query: string,                  // Weather location query
    Forecast: IWeatherForecast,     // Forecast information
    Error: string,                  // Error message
    ValidDataLoaded: boolean,       // True if forecast contains valid data
    GetWeather: (string) => void    // Method to get the weather forecast
}

( () : void => {
    
    class WeatherController implements IWeatherController {
        
        static $inject = ["WeatherService", "$scope"];
        
        constructor (private WeatherService: IWeatherService,
                     $scope: ng.IScope) {
            // When the query is available, get the weather forecast
            $scope.$watch(this.Query, () => { this.GetWeather(this.Query); } ); 
        }
        
        // Members of Interface (ViewModel)
        public Query: string;
        public Forecast: IWeatherForecast;
        public Error: string;
        public ValidDataLoaded: boolean = false;
        public GetWeather: (string) => void = this.getWeather;

        // Internal methods
        getWeather(query: string) : void {
            this.WeatherService.GetWeather(query)
                .then ((result : IWeatherForecast) => {
                    this.Forecast = result;
                    this.ValidDataLoaded = true;
                })
                .catch ((reason : IWeatherError) => {
                    this.Error = reason.ErrorMessage;
                })
        } 
        
    }
    
    angular
        .module ('weatherWidget')
        .controller('WeatherController', WeatherController);
        
})()