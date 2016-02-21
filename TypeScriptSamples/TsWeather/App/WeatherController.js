(function () {
    var WeatherController = (function () {
        function WeatherController() {
            this.Forecast = null;
            this.ValidDataLoaded = false;
        }
        return WeatherController;
    })();
    angular
        .module('weatherWidget')
        .controller('WeatherController', WeatherController);
})();
