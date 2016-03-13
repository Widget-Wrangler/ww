(function () {
    var WeatherService = (function () {
        function WeatherService($http, $q, appId) {
            this.$http = $http;
            this.$q = $q;
            this.appId = appId;
            // Implement IWeatherService
            this.GetWeather = this.getWeather;
        }
        // getWeather - Get the weather from a web service            
        WeatherService.prototype.getWeather = function (query) {
            var _this = this;
            var defer = this.$q.defer();
            var promise = defer.promise;
            this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + query +
                '&appid=' + this.appId)
                .then(function (response) {
                var data = response.data;
                var result = {
                    City: data.name,
                    Condition: data.weather[0].main,
                    Description: data.weather[0].description,
                    IconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    Temperatures: _this.GetTemps(data.main.temp),
                    Wind: data.wind.speed,
                    Humidity: data.main.humidity
                };
                defer.resolve(result);
            })
                .catch(function (reason) {
                defer.reject(
                // IWeatherError
                {
                    ErrorMessage: 'Error ' + reason.status + ': ' + reason.statusText
                });
            });
            return promise;
        };
        WeatherService.prototype.GetTemps = function (temp) {
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
        };
        WeatherService.$inject = ["$http", "$q", "appId"];
        return WeatherService;
    })();
    angular
        .module('weatherWidget')
        .service('WeatherService', WeatherService)
        .constant('appId', 'ecb1f756686518281c429bf5b7498d70');
})();
