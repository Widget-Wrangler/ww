(function () {
    var WeatherService = (function () {
        function WeatherService($http, $q, appId) {
            this.$http = $http;
            this.$q = $q;
            this.appId = appId;
        }
        WeatherService.prototype.GetWeather = function () {
            var _this = this;
            var defer = this.$q.defer();
            var promise = defer.promise;
            var location = "Boston, MA";
            this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location +
                '&appid=' + this.appId)
                .then(function (response) {
                var data = response.data;
                var forecast = {
                    City: data.name,
                    Condition: data.weather[0].main,
                    Description: data.weather[0].description,
                    IconUrl: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    Temperatures: _this.GetTemps(data.main.temp),
                    Wind: data.wind.speed,
                    Gusts: data.wind.gust,
                    Humidity: data.main.humidity
                };
                defer.resolve(forecast);
            })
                .catch(function (reason) {
                var error = {
                    ErrorMessage: 'Error ' + reason.status + ': ' + reason.statusText
                };
                defer.reject(error);
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
        .service('WeatherService', WeatherService);
})();
