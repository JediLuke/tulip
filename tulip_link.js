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
    var project = SkyGrid.project('SuUHRs4T');       // Get a Project object that lets us interact with a SkyGrid project.
    // Configure devices
    //var device  = project.device('vDAjs2mv');        // The SkyGrid device ID, found inside the above project - unique to each device
    var sensor1  = project.device('5jPOFRqm');
    var sensor2  = project.device('gdiaHm-Z');
    var sensor3  = project.device('ZX9rODXs');
    var sensor4  = project.device('OugKN_2E');
    var sensor5  = project.device('5JZQVnpD');
    var sensor6  = project.device('_5FDVb17');
    var sensor7  = project.device('AXBjxif1');
    var sensor8  = project.device('gZ4YpEEN');
    var sensor9  = project.device('KauCpBZn');

    // Things network config - this information can be found in your Things Network console
    var region 	  = 'asia-se.thethings.network'
    var appId 	  = 'tulip-app'
    var accessKey = ''
    var client    = new ttn.Client(region, appId, accessKey)

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

        // Figure out which deice to update
        switch(data.dev_id) {
            case 'ls113-354e':
                sensor1.save({
                    "dev_id": data.dev_id,
                    "temp": temp,
                    "humidity": humidity,
                    "pm2p5": pm2p5,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'ls113-3557':
                sensor2.save({
                    "dev_id": data.dev_id,
                    "temp": temp,
                    "humidity": humidity,
                    "pm2p5": pm2p5,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'ls113-355a':
                sensor3.save({
                    "dev_id": data.dev_id,
                    "temp": temp,
                    "humidity": humidity,
                    "pm2p5": pm2p5,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'ls113-355e':
                sensor4.save({
                    "dev_id": data.dev_id,
                    "temp": temp,
                    "humidity": humidity,
                    "pm2p5": pm2p5,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'ls113-c3557':
                sensor5.save({
                    "dev_id": data.dev_id,
                    "temp": temp,
                    "humidity": humidity,
                    "pm2p5": pm2p5,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'arduno_temphumid2':
                // Special values required
                sensor6.save({
                    "dev_id": data.dev_id,
                    "temp": data.payload_raw[1],
                    "humidity": data.payload_raw[3],
                    "pm2p5": 0,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            case 'arduinotemphumid':
                sensor7.save({
                    "dev_id": data.dev_id,
                    "temp": data.payload_raw[0],
                    "humidity": data.payload_raw[1],
                    "pm2p5": 0,
                    "ttn_time": data.metadata.time,
                    "num_gateways": data.metadata.gateways.length
                    })
                break;
            // case 'arduinoanalogtemp':
            //     sensor8.save({
            //         "dev_id": data.dev_id,
            //         "temp": temp,
            //         "humidity": humidity,
            //         "pm2p5": pm2p5,
            //         "ttn_time": data.metadata.time,
            //         "num_gateways": data.metadata.gateways.length
            //         })
            //     break;
            // case 'ardunio_pm25':
            //     sensor9.save({
            //         "dev_id": data.dev_id,
            //         "temp": temp,
            //         "humidity": humidity,
            //         "pm2p5": pm2p5,
            //         "ttn_time": data.metadata.time,
            //         "num_gateways": data.metadata.gateways.length
            //         })
            //     break;
            default:
                console.error('[ERROR]', 'Message from unknown sensor received. data.dev_id = ' + data.dev_id)
                return
        }

        }); // END client.on('message')
    
} // END startlink