const Client = require('mattermost-client');

const weather = require('./weather');

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
            parseMessage(msg);            
        }
    });

}

function hears(msg, text)
{
    if( msg.data.sender_name == bot_name) return false;
    if( msg.data.post )
    {
        let post = JSON.parse(msg.data.post);
        if( post.message.indexOf(text) >= 0)
        {
            return true;
        }
    }
    return false;
}

async function parseMessage(msg)
{
    let channel = msg.broadcast.channel_id;
    let w = await weather.getWeather().catch( err => client.postMessage("Weather service is down. Sorry!", channel) );
    if( w )
    {
        client.postMessage(w, channel);
    }
}

(async () => 
{

    await main();

})()