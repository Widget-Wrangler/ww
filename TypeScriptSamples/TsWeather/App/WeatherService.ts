interface IWeatherService {     // WeatherService interface
    GetWeather(string): ng.IPromise<IWeatherForecast | IWeatherError>
}

(() => {

    class WeatherService implements IWeatherService {

        static $inject = ["$http", "$q", "appId"];
        constructor(
            private $http: ng.IHttpService, 
            private $q: ng.IQService, 
            private appId: string) { }

        // Implement IWeatherService
        public GetWeather: (string) => ng.IPromise<IWeatherForecast | IWeatherError> =
            this.getWeather;

        // getWeather - Get the weather from a web service            
        getWeather(query: string) {

            let defer = this.$q.defer();
            let promise: ng.IPromise<IWeatherForecast> = defer.promise;

            this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + query +
                '&appid=' + this.appId)
                .then((response: ng.IHttpPromiseCallbackArg<owm.Data>) => {
                    let data = response.data;
                    let result : IWeatherForecast = 
                        {
                            City: data.name,
                            Condition: data.weather[0].main,
                            Description: data.weather[0].description,
                            IconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                            Temperatures: this.GetTemps(data.main.temp),
                            Wind: data.wind.speed,
                            Humidity: data.main.humidity
                        };
                    defer.resolve(result);
                })
                .catch ((reason: ng.IHttpPromiseCallbackArg<void>) => {
                    defer.reject (
                        // IWeatherError
                        {
                            ErrorMessage: 'Error ' + reason.status + ': ' + reason.statusText
                        }
                    );
                });
                
            return promise;
        }

        GetTemps(temp: any): [ITemperature] {
            return [
                {
                    "Units": "Farenheit",
                    "Current": ((temp - 273) * (9 / 5)) + 32
                }, {
                    "Units": "Celsius",
                    "Current": temp - 273
                }, {
                    "Units": "Kelvin",
                    "Current": temp
                }
            ];
        }
    }

    angular
        .module('weatherWidget')
        .service('WeatherService', WeatherService)
       .constant ('appId', 'ecb1f756686518281c429bf5b7498d70');

})()