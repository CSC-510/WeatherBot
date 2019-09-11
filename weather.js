var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);

function getWeather()
{
    var latitude = "48.208579"
    var longitude = "16.374124"

    return new Promise(function(resolve,reject)
    {
      forecast.get(latitude, longitude, function (err, res, data) 
      {
            if (err) {
                reject(undefined);
                return;
            };

            //console.log('res: ' + JSON.stringify(res));
            //console.log('data: ' + JSON.stringify(data));
            var w = data.currently.summary + " and feels like " + data.currently.apparentTemperature;
            resolve(w);
      });
    });
}
exports.getWeather = getWeather;

// (async () => {
//     let w = await getWeather();
//     console.log(w);
// })();