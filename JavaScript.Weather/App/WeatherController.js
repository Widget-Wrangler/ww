(function() {
  
  angular
    .module('weatherWidget', [])
    .controller('WeatherController', ['$scope', 'weatherService',
      function ($scope, weatherService) {

        var vm = this;
        vm.Forecast = {};
        
        $scope.$watch(vm.query, function() {
        weatherService.GetWeather(vm.Query)
          .then(function(data) {

            // Copy data from the service into the model
            vm.Forecast.City = data.City;
            vm.Forecast.Condition = data.Condition;
            vm.Forecast.Description = data.Description;
            vm.Forecast.IconUrl = data.IconUrl;
            vm.Forecast.Temperatures = data.Temperatures;
            vm.Forecast.Wind = data.Wind;
            vm.Forecast.Gusts = data.Gusts;
            vm.Forecast.Humidity = data.Humidity;

            // If we got this far, we have good data
            vm.ValidDataLoaded = true;

          })

        .catch (function(message) {

            vm.error = message;
            vm.ValidDataLoaded = false;

          });
        });
        
      }
    ]); // End Controller()
}()); // End IFFE