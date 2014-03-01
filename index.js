var controller = require('lib/controller'),
	config = require('config');

// var started = false;

simply.text({
	title: 'Boulder',
	body: 'Hold Select to start your workout!',
}, true);

simply.on('singleClick', 'up', function(e) {
  controller.startRecording();
});

simply.on('singleClick', 'down', function(e) {
  controller.stopRecording();
});

// simply.on('longClick', function(e) {
// 	if(!started) {
// 		controller.startRecording();
// 		started = true;
// 	} else {
// 		controller.stopRecording();
// 		started = false;
// 	}
// });