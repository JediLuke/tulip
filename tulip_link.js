var ttn = require('ttn');
var SkyGrid = require('skygrid');

/*
**  This file configures and initiates the link between the
**  things network and SkyGrid
**
**  Usage:
**      var ttn = require('tulip_ttn')      // import library
**      ttn.startlink()                     // link runs asyncronously
**
*/

exports.startlink = function() {

    // Skygrid Config - these IDs come from the SkyGrid dashboard
    var project = SkyGrid.project('');       // Get a Project object that lets us interact with a SkyGrid project.
    var device  = project.device('');        // The SkyGrid device ID, found inside the above project - unique to each device

    // Things network config - this information can be found in your Things Network console
    var region 	  = 'asia-se.thethings.network';
    var appId 	  = 'tulip-app'
    var accessKey = ''
    var client    = new ttn.Client(region, appId, accessKey);

    console.log("Initiating link between TTN, SkyGrid & this server.")

    // These handlers are activated when messages arrive. Each runs asyncronously.
    client.on('connect', function(connack) {
        console.log('[DEBUG]', 'Connect:', connack);
        console.log('Link between TTN, SkyGrid & this server has been established.');
        });

    client.on('error', function(err) {
        console.error('[ERROR]', err.message);
        });

    client.on('activation', function(deviceId, data) {
        console.log('[INFO] ', 'Activation:', deviceId, JSON.stringify(data, null, 2));
        });

    // Main functionality is here, receiving messages
    client.on('message', function(deviceId, data) {

        console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));

        // Calc data from payload
        const payload = data.payload_raw
        
        const temp      = Math.round((payload[1] << 8) + (payload[2])) / 100
        const humidity  = ((payload[3] << 8) + (payload[4])) / 100
        const pm2p5     = (payload[5] << 8) + (payload[6])

        // Send data to SkyGrid
        device.save({
            "dev_id": data.dev_id,
            "temp": temp,
            "humidity": humidity,
            "pm2p5": pm2p5,
            "ttn_time": data.metadata.time,
            "num_gateways": data.metadata.gateways.length
            })
    
        console.log("Message successfully relayed.")

        }); // END client.on('message')
    
} // END startlink
