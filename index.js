simply.text({
  title: 'Accel Demo',
  body: 'Press up to stream or select to peek.',
}, true);

simply.accelConfig({ rate: 50, samples: 5 });

var onAccelData = function(e) {
  simply.body('data: ' + JSON.stringify(e.accels[0]) + '\n' + JSON.stringify(e.accels[1]), true);
  e.accels.forEach(function(samp) {
    console.log(samp.x.toString() + ' ' + samp.time.toString());
    console.log(samp.y.toString() + ' ' + samp.time.toString());
    console.log(samp.z.toString() + ' ' + samp.time.toString());
  });
  // console.log(JSON.stringify(e.accel))
};
 
// Press up to begin accelData streaming
// Pressing up multiple times will register the handler more than once so be careful. 
// simply.on('singleClick', 'up', function(e) {
  simply.on('accelData', onAccelData);
// });
 
// Press down until all accelData handlers are removed and you can accelPeek again
simply.on('singleClick', 'down', function(e) {
  simply.off('accelData', onAccelData);
});
 
var started = false;

// Press select to accelPeek
simply.on('singleClick', 'select', function(e) {
  if (simply.accelConfig().subscribe) {
    console.log("Already Subscribed!")
    // accelData and accelPeek can't happen simultaneously
    return;
  }
  if (!started) {
    started = true;
    // accels = [];
    var intvl = setInterval(function() {
      simply.accelPeek(function(e) {
       // accels.push(e.accel);
       console.log(JSON.stringify(e.accel));
      });
    }, 100);
    
    // console.log(accels);
  } else {
    started = false;
    // accels = [];
    clearInterval(intvl);
  }
});
