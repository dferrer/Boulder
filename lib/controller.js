var controller = {};

/*var onAccelData = function(e) {
	simply.body('data: ' + JSON.stringiy(e.acccel));
};*/

controller.startRecording = function() {
	simply.title('Started!');
	/*simply.on('accelData', onAccelData);
	simply.off('accelData', onAccelData);*/
	simply.accelConfig({rate: 100, samples: 25});
	simply.accelPeek(function(e) {
		simply.body('peek: ' + JSON.stringify(e.accel));
	});
};

controller.stopRecording = function() {
	simply.title('Stopped!');
};

module.exports = controller;