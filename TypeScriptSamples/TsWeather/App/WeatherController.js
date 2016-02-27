(function () {
    var WeatherController = (function () {
        //        WeatherService: IWeatherService;
        function WeatherController(WeatherService, $scope) {
            var _this = this;
            //            this.WeatherService = WeatherService;
            $scope.$watch(this.Query, function () { _this.GetWeather(WeatherService); });
            this.ValidDataLoaded = false;
        }
        WeatherController.prototype.GetWeather = function (WeatherService) {
            var _this = this;
            WeatherService.GetWeather()
                .then(function (result) {
                _this.Forecast = result;
                _this.ValidDataLoaded = true;
            });
        };
        WeatherController.$inject = ["WeatherService", "$scope"];
        return WeatherController;
    })();
    angular
        .module('weatherWidget')
        .controller('WeatherController', WeatherController);
})();
