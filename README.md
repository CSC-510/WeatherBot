
# Weather Bot

We will write a simple bot that will tell us the current weather.

We will use[forecast.io](https://darksky.net/dev) for weather info.
You might also want to consider using the [open weather api](https://openweathermap.org/appid).

### Prereq

Install code.

```bash
git clone https://github.com/CSC-510/WeatherBot
cd WeatherBot
npm install
```

Set up tokens. You do not want to store sensitive information like api tokens in public locations. Instead, you can store these in configuration files or environment variables.
   
In windows, you can run:
```
setx FORECASTTOKEN "<forecast.io.token>"
setx BOTTOKEN "<access-token>"
# You will then need to close the cmd window and reopen.
```
In other systems, you can set them in your shell, like in `.bash_profile`:
```
# Edit .bash_profile to have:
export FORECASTTOKEN="<token>"
export BOTTOKEN="<access-token>"
# Then reload
$ source ~/.bash_profile
```

## Getting the weather

Lets' make a call to the weather API. See the code inside `weather.js.`

```javascript
function getWeather()
{
    var latitude = "48.208579"
    var longitude = "16.374124"

    return new Promise(function(resolve,reject)
    {
      forecast.get(latitude, longitude, function (err, res, data) 
      {
            if (err) {
                reject(err);
                return;
            };
            var w = data.currently.summary + " and feels like " + data.currently.apparentTemperature;
            resolve(w);
      });
    });
}
```

Uncomment the following code.

```javascript
// (async () => {
//     let w = await getWeather();
//     console.log(w);
// })();
```

You can run `node weather.js` and confirm you can properly read the weather information.

## Understanding Bots in Mattermost

A common way to build a "responder bot" is to use a "hears/process/send" pattern.

```javascript
let host = "chat.alt-code.org"
let group = "CSC510-F19"
let bot_name = "weather-bot";
let client = new Client(host, group, {});

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    
    client.on('message', function(msg)
    {
        console.log(msg);
        if( hears(msg, "weather") )
        {
            parseMessage(msg.data.post);
        }
    });
}
```

This code will subscribe to events published by mattermost via a connected websocket. Whenever a 'message' event is received, a callback is called. The message is checked for a pattern, and then processed. The bot can respond to the channel.

## Enhance your bot.

See if you can extend the bot to be able to get the current location as part of a conversation.

Try connecting your bot with a real mattermost server (or extend to also work with a Slack server).