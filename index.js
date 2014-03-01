simply.text({
  title: 'Accel Demo',
  body: 'Press up to stream or select to peek.',
}, true);
 
/**
 * Use simply.accelConfig({ rate: 100, samples: 25 }) to configure
 * the hertz and accel data per batch for the accelData events.
 * See the API reference at simplyjs.io for more information.
 */

var onAccelData = function(e) {
  simply.body('data: ' + JSON.stringify(e.accel));
};
 
// Press up to begin accelData streaming
// Pressing up multiple times will register the handler more than once so be careful. 
simply.on('singleClick', 'up', function(e) {
  simply.on('accelData', onAccelData);
});
 
// Press down until all accelData handlers are removed and you can accelPeek again
simply.on('singleClick', 'down', function(e) {
  simply.off('accelData', onAccelData);
});
 
// Press select to accelPeek
simply.on('singleClick', 'select', function(e) {
  if (simply.accelConfig().subscribe) {
    console.log("Already Subscribed!")
    // accelData and accelPeek can't happen simultaneously
    return;
  }
  accels = []
  simply.accelPeek(function(e) {
    setInterval(function() {
      simply.accelPeek(function(e) {
        accels.push(e.accel)
      });
     }, 50);
  });
  console.log(accels)
});
