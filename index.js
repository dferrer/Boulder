function reset() {
  simply.text({
    title: 'Boulder',
    body: 'Welcome to Boulder.',
  }, true);
}
reset();

var isTraining = false;
var trainingSite = "http://152.23.18.198:5000";

simply.accelConfig({ rate: 50, samples: 5 });
ajax({ url: trainingSite, method: 'post', data: {"data": '{"begin_rep": 1 }'} }, function(data){});

var onAccelData = function(e) {
  if(isTraining) {
    simply.body('data: ' + JSON.stringify(e.accel), true);
    ajax({ url: trainingSite, method: 'post', data: {"data": JSON.stringify(e.accels) } }, function(data){});
  }
};

simply.on('accelData', onAccelData);

// Press down until all accelData handlers are removed and you can accelPeek again
simply.on('singleClick', 'down', function(e) {
  simply.off('accelData', onAccelData);
});

simply.on('longClick', 'down', function(e) {
  isTraining = !isTraining;
  if(isTraining) {
    simply.text({title: "Boulder Trainer", body: "Data is being logged to " + trainingSite})
  } else {
    reset();
  }
});

simply.on('')