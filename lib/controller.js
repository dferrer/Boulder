var controller = {};

var onAccelData = function(e) {
	simply.body('data: ' + JSON.stringify(e.accel));
};

controller.startRecording = function() {
	simply.title('Started!');
	simply.accelConfig({rate: 100, samples: 25});
	simply.on('accelData', '', onAccelData);
};

controller.stopRecording = function() {
	simply.title('Stopped!');
	simply.off('accelData', '', onAccelData);
};

module.exports = controller;