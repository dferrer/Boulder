function reset() {
  simply.text({
    title: 'Boulder',
    body: 'Welcome to Boulder.',
  }, true);
}
reset();

// Global Variables
var isTraining = false;
var trainingSite = "http://152.23.18.198:5000";

// Keep our accelConfig
simply.accelConfig({ rate: 50, samples: 5 });

// Checking for Accel Data
var onAccelData = function(e) {
  if(isTraining) {
    ajax({ url: trainingSite, method: 'post', data: {"data": JSON.stringify(e.accels) } }, function(data){});
  }
};

// Check for accelData all the time
simply.on('accelData', onAccelData);

// Training Mode is turned on and off with Long Down Press
simply.on('longClick', 'down', function(e) {
  isTraining = !isTraining;
  if(isTraining) {
    simply.vibe("short");
    ajax({ url: trainingSite, method: 'post', data: {"data": '{"begin_rep": 1 }'} }, function(data){});
    simply.text({title: "Boulder Trainer", body: "Data is being logged to " + trainingSite});
  } else {
    reset();
  }
});