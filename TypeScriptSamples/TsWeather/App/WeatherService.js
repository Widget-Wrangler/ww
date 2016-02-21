(function () {
    var WeatherService = (function () {
        function WeatherService() {
        }
        WeatherService.prototype.GetWeather = function () {
            return null;
        };
        return WeatherService;
    })();
    angular
        .module('weatherWidget')
        .service('WeatherService', WeatherService);
})();
