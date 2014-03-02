var api = require('lib/api.js');

simply.style("mono");
function loadView() {
  simply.text({
    title: 'Boulder App',
    body: 'Loading...',
  }, true);
}
loadView();

api.displayUserProfile();

// Global Variables
var isTraining = false;
var isTesting = false;
var trainingSite = "http://152.23.18.198:5000";
var testingSite = api.baseAddress() + "/boulder/api/log/";

// Keep our accelConfig
simply.accelConfig({ rate: 50, samples: 5 });

// Checking for Accel Data
var onAccelData = function(e) {
  console.log("Got Accel");
  if(isTraining) {
    ajax({ url: trainingSite, method: 'post', data: {"data": JSON.stringify(e.accels) } }, function(data){});
  }
  if(isTesting) {
    api.logAction(e.accels);
  }
};

// Check for accelData all the time
simply.on('accelData', onAccelData);

simply.on('singleClick', 'select', function(e) {
  simply.off('accelData', onAccelData);
});

// Training Mode is turned on and off with Long Down Press
simply.on('singleClick', 'down', function(e) {
  if(isTesting) {
    return;
  }
  isTraining = !isTraining;
  if(isTraining) {
    simply.vibe("short");
    ajax({ url: trainingSite, method: 'post', data: {"data": '{"begin_rep": 1 }'} }, function(data){});
    simply.text({title: "Boulder Trainer", body: "Data is being logged to " + trainingSite}, true);
  } else {
    simply.vibe("short");
    loadView();
  }
});

// Training Mode is turned on and off with Long Down Press
simply.on('singleClick', 'up', function(e) {
  if(isTraining) {
    return;
  }
  isTesting = !isTesting;
  if(isTesting) {
    simply.vibe("short");
    simply.text({title: "Boulder Exercising", body: "Exercise is being monitored."}, true);
  } else {
    simply.vibe("short");
    api.displayUserProfile();
  }
});