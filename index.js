var controller = require('lib/controller'),
	config = require('config');

var started = false;

simply.on('longClick', function(e) {
	if(!started)
		controller.startRecording();
	else
		controller.stopRecording();
});