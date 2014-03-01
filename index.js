// var controller = require('lib/controller'),
var	config = require('config');

// var started = false;

simply.text({
  title: 'Accel Demo',
  body: 'Press up to stream or select to peek.',
}, true);
 
/**
 * Use simply.accelConfig({ rate: 100, samples: 25 }) to configure
 * the hertz and accel data per batch for the accelData events.
 * See the API reference at simplyjs.io for more information.
 */

 // setInterval(function() {
 //  console.log("running.");
 //  simply.accelPeek(function(e) {
 //    console.log(JSON.stringify(e));
 //    simply.body('peek: ' + JSON.stringify(e.accel));
 //  });
 // }, 500);

 console.log("Hello, World!");
 simply.accelConfig({ rate: 100, samples: 25 });
 
var onAccelData = function(e) {
  console.log(e);
  simply.body('data: ' + JSON.stringify(e.accels));
};
 
// Press up to begin accelData streaming
// Pressing up multiple times will register the handler more than once so be careful. 
simply.on('singleClick', 'up', function(e) {
  console.log("Hit up button.");
  simply.on('accelData', onAccelData);
});
 
// Press down until all accelData handlers are removed and you can accelPeek again
simply.on('singleClick', 'down', function(e) {
  simply.off('accelData', onAccelData);
});
 
// Press select to accelPeek
simply.on('singleClick', 'select', function(e) {
  if (simply.accelConfig().subscribe) {
    // accelData and accelPeek can't happen simultaneously
    return;
  }
  simply.accelPeek(function(e) {
    simply.body('peek: ' + JSON.stringify(e));
  });
});

// simply.text({
// 	title: 'Boulder',
// 	body: 'Hold Select to start your workout!',
// }, true);

// simply.on('longClick', function(e) {
// 	if(!started) {
// 		controller.startRecording();
// 		started = true;
// 	} else {
// 		controller.stopRecording();
// 		started = false;
// 	}
// });
