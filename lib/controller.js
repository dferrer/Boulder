var controller = {};

controller.startRecording = function() {
	simply.title('Started!');
};

controller.stopRecording = function() {
	simply.title('Stopped!');
};

module.exports = controller;