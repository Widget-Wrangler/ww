interface IWeatherService {
    GetWeather(): ng.IPromise<IWeatherForecast>
}

(() => {

    class WeatherService implements IWeatherService {

        static $inject = ["$http", "$q"];

        $http: ng.IHttpService;
        $q: ng.IQService;

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.$http = $http;
            this.$q = $q;
        }

        GetWeather() {

            var defer = this.$q.defer();
            var promise: ng.IPromise<IWeatherForecast> = defer.promise;

            var location: string = "Boston, MA"
            var appId: string = "ecb1f756686518281c429bf5b7498d70";
            this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location +
                '&appid=' + appId)
                .then((response: any) => {
                    var data = response.data;
                    var forecast: IWeatherForecast = {
                        City: <string>data.name,
                        Condition: <string>data.weather[0].main,
                        Description: <string>data.weather[0].description,
                        IconUrl: <string>"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                        Temperatures: this.GetTemps(data.main.temp),
                        Wind: <string>data.wind.speed,
                        Gusts: <string>data.wind.gust,
                        Humidity: <number>data.main.humidity,
                        IsValid: true,
                        ErrorMessage: ""
                    }
                    defer.resolve(forecast);
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
        .service('WeatherService', WeatherService);

})()