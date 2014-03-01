var controller = require('lib/controller'),
	config = require('config');

var started = false;

simply.on('longClick', function(e) {
	if(!started)
		controller.start_recording();
	else
		controler.stop_recording();
});