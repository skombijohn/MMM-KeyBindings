/* Magic Mirror
 * Node Helper: MMM-KeyBindings
 *
 * By shbatm
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var url = require("url");
// const spawn = require('child_process').spawn;


module.exports = NodeHelper.create({

	start: function() {
		var self = this;

		// Basic URL Interface to accept push notifications formatted like
		// http://localhost:8080/MMM-KeyBindings/notify?notification=TITLE&payload=JSONstringifiedSTRING
		this.expressApp.get("/" + this.name + "/notify", (req, res) => {
			var query = url.parse(req.url, true).query;
			var notification = query.notification;
			var payload 
			try {
			  payload = JSON.parse(query.payload);
			} catch (e) {
			// Oh well, but whatever...
			}

			if (typeof payload === "undefined") {
				payload = [];
			}
			this.sendSocketNotification(notification, payload);
			res.sendStatus(200);
		});

		// Start the Python Daemon to capture input from FireTV Remote via Bluetooth
		// Python Daemon captures inputs using python-evdev and is configured to capture 
		// All events from '/dev/input/event0'.  Use `cat /proc/bus/input/devices` to find the 
		// correct handler to use.  You can also use `evtest /dev/input/event0` to monitor the output.
		// Note: to stop capturing input without shutting down the mirror, run the following from
		// a shell prompt: `python ~/MagicMirror/modules/MMM-KeyBindings/daemon.py stop`
		//var daemon = spawn("python",["/home/pi/MagicMirror/modules/MMM-KeyBindings/daemon.pydaemon.py", "start"]);
	},


	// TODO : Handle POWERON and POWEROFF Callbacks (should probably be moved to another module)
		// const exec = require("child_process").exec;
		// const os = require("os");
		// if (query.action === "MONITORON")
		// {
		// 	exec("tvservice --preferred && sudo chvt 6 && sudo chvt 7", opts, function(error, stdout, stderr){ self.checkForExecError(error, stdout, stderr, res); });
		// 	return true;
		// }
		// if (query.action === "MONITOROFF")
		// {
		// 	exec("tvservice -o", opts, function(error, stdout, stderr){ self.checkForExecError(error, stdout, stderr, res); });
		// 	return true;
		// }

});