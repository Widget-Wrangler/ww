(function () {
    var WeatherController = (function () {
        function WeatherController(WeatherService, $scope) {
            var _this = this;
            this.WeatherService = WeatherService;
            this.ValidDataLoaded = false;
            this.GetWeather = this.getWeather;
            // When the query is available, get the weather forecast
            $scope.$watch(this.Query, function () { _this.GetWeather(_this.Query); });
        }
        // Internal methods
        WeatherController.prototype.getWeather = function (query) {
            var _this = this;
            this.WeatherService.GetWeather(query)
                .then(function (result) {
                _this.Forecast = result;
                _this.ValidDataLoaded = true;
            })
                .catch(function (reason) {
                _this.Error = reason.ErrorMessage;
            });
        };
        WeatherController.$inject = ["WeatherService", "$scope"];
        return WeatherController;
    })();
    angular
        .module('weatherWidget')
        .controller('WeatherController', WeatherController);
})();
