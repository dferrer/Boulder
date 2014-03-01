var controller = {};

var onAccelData = function(e) {
	simply.body('data: ' + JSON.stringiy(e.accel));
};

controller.startRecording = function() {
	simply.title('Started!');
	
	simply.accelConfig({rate: 100, samples: 25});

	simply.on('accelData', onAccelData);
	
};

controller.stopRecording = function() {
	simply.title('Stopped!');
	simply.off('accelData', onAccelData);
	simply.accelPeek(function(e) {
		simply.body('peek: ' + JSON.stringify(e.accel));
	});
};

module.exports = controller;