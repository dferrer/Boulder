var controller = {};

controller.startRecording = function() {
	simply.title('Started!');
	simply.on('accelData', onAccelData);
	simply.accelConfig({rate: 100, samples: 25});
	simply.accelPeek(function(e) {
		simply.body('peek: ' + JSON.stringify(e.accel));
	});
};

controller.stopRecording = function() {
	simply.title('Stopped!');
	simply.off('accelData', onAccelData);
};

module.exports = controller;