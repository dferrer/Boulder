var controller = require('lib/controller'),
	config = require('config');

var started = false;

simply.text({
	title: 'Boulder',
	body: 'Hold Select to start your workout!',
}, true);

var onAccelData = function(e) {
	simply.body('data: ' + JSON.stringiy(e.acccel));
};

simply.on('longClick', function(e) {
	if(!started) {
		controller.startRecording();
		started = true;
	} else {
		controller.stopRecording();
		started = false;
	}
});