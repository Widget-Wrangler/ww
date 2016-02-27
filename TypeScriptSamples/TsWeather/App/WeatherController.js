(function () {
    var WeatherController = (function () {
        function WeatherController(WeatherService, $scope) {
            var _this = this;
            this.WeatherService = WeatherService;
            $scope.$watch(this.Query, function () { _this.GetWeather(); });
            this.ValidDataLoaded = false;
        }
        WeatherController.prototype.GetWeather = function () {
            var _this = this;
            this.WeatherService.GetWeather()
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
