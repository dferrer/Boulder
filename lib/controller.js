var controller = {};

var onAccelData = function(e) {
	simply.body('data: ' + JSON.stringify(e.accels));
};

controller.startRecording = function() {
	simply.title('Started!');
	simply.accelConfig({rate: 100, samples: 25});
	simply.on('accelData', function(e) {
		simply.body('made it!');
	});
};

controller.stopRecording = function() {
	simply.title('Stopped!');
	simply.off('accelData', onAccelData);
	simply.accelPeek(function(e) {
		simply.body('peek: ' + JSON.stringify(e.accels));
	});
};

module.exports = controller;