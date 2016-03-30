(function() {

  var module = angular
    .module('weatherWidget')
    
    // PLEASE REPLACE THIS APP ID if you plan to reuse this code
    // You can register for a free one at http://openweathermap.org/
    .constant('appId', 'ecb1f756686518281c429bf5b7498d70')
    .factory("weatherService", ['$http', '$log', '$q', 'appId',
    
    // weatherService - Retrieves weather conditions from Open Weather Map
      function weatherService($http, $log, $q, appId) {

        var getWeather = function getWeather(location) {

          $log.info("Retrieving weather for " + location);

          return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location +
          '&appid=' + appId)
          
            .then(function sendResponseData(response) {

              // Success
              $log.info("Retrieved weather for " + location);

              var data = response.data;
              return {
                
                // Return the weather data in nicer format than the web service
                City: data.name,
                Condition: data.weather[0].main,
                Description: data.weather[0].description,
                IconUrl: "http://openweathermap.org/img/w/" +
                  data.weather[0].icon + ".png",
                Temperatures: GetTemperatures(data.main),
                Wind: data.wind.speed,
                Gusts: data.wind.gust,
                Humidity: data.main.humidity
              }

            }).catch(function(response) {

              $log.error('HTTP request error: ' + response.status)
              return $q.reject('Error: ' + response.status);

            });
        }; // End getWeather()

        // In weatherService()
        return {
          GetWeather: getWeather
        };
        
      } // End weatherService()
    ]);

  // Private functions ------------------------------------------------

  //
  // GetTemperatures() - Extracts temperatures from weather data
  //
  var GetTemperatures = function GetTemperatures(temps) {
    return [{
      "Units": "Farenheit",
      "Current": GetFarenheit(temps.temp),
      "Low": GetFarenheit(temps.temp_min),
      "High": GetFarenheit(temps.temp_max)
    }, {
      "Units": "Celsius",
      "Current": GetCelsius(temps.temp),
      "Low": GetCelsius(temps.temp_min),
      "High": GetCelsius(temps.temp_max)
    }, {
      "Units": "Kelvin",
      "Current": GetKelvin(temps.temp),
      "Low": GetKelvin(temps.temp_min),
      "High": GetKelvin(temps.temp_max)
    }];
  }; // End GetTemperatures()

  //
  // GetFarenheit() - Convert a temperature in weather data to F
  //
  var GetFarenheit = function GetFarenheit(temp) {
    return ((temp - 273) * (9 / 5)) + 32;
  }; // End GetFarenheit()

  //
  // GetKelvin() - Convert a temperature in weather data to K
  //
  var GetKelvin = function GetKelvin(temp) {
    return temp;
  }; // End GetKelvin()

  //
  // GetCelsius() - Convert a temperature in weather data to C
  //
  var GetCelsius = function GetCelsius(temp) {
    return temp - 273;
  }; // End GetCelsius


}());