var request = require('request');
var async = require('async');

var cities = [
  'Atlanta, GA',
  'Pheonix, AZ',
  'Dallas, TX',
  'Philadelphia, PA'
];

function getWeather(city, callback) {
  request({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      q: city,
      units: 'imperial',
      APPID: 'eac2948bfca65b78a8c5564ecf91d00e'
    }
  }, function(err, response, body) {
    if (err) {
      // call the callback
      callback(err);
      return;
    }
    // convert the body in JSON format to a JS object
    var data = JSON.parse(body);
    // call the callback, passing null for err to signal success
    callback(null, data);
  });
}

/* ---------------------------------------------------------------------------*/
/* Problem 1
Given an array of cities:
Use Open Weather Map API to get their weather and print out their current temperature. */

// cities.forEach(function(city){
//      getWeather(city, function(err, data) {
//        if (err) {
//          console.error(err.message);
//          return;
//        }
//        console.log('---------------------------------------------');
//        console.log(city);
//        console.log('  Weather:    ', data.weather[0].description);
//        console.log('  Temperature:', data.main.temp + '°');
//      });
// });

/* Print the average of the temperatures of the list of cities above. You may use the help of the async module. */

/* method 1:  brute force; not using the async module. */
var results = [];   /* empty array to store temperatures */

cities.forEach(function(city){
     getWeather(city, function(err, data) {
       if (err) {
         console.error(err.message);
         return;
       }
       results.push(data.main.temp);
     //   console.log('---------------------------------------------');
     //   console.log(city);
     //   console.log('  Weather:    ', data.weather[0].description);
       console.log('  Temperature:', data.main.temp + '°');
       if (results.length === cities.length) {
          console.log('max temp(method1) = ' + results.reduce(function(x, y){
               if (x > y) {
                    return x;
               }
               else {
                    return y;
               }
          }, 0));
       }
     });
});

/* method 2:  using the async module. */
async.map(cities, getWeather, function(error, results) {
     if (error) {
          console.log('shit happened');
          return;
     }
     // console.log(results.map(function(x){return x.main.temp;}));

     var maxTemp = results.map(function(x){return x.main.temp;}).reduce(function(x, y){
          if (x > y) {
               return x;
          } else {
               return y;
          }
     });
     console.log('max temp(method 2) = ' + maxTemp);
});
