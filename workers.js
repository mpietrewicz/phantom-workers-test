var phantom = require("phantom-workers")({
	pathToPhantomScript: "script.js",
	phantomPath: require("phantomjs").path,
	timeout: 10000,
	numberOfWorkers: 10
});

phantom.start(function(startErr) {
	if (startErr) {
		return console.error('Error while starting workers:', startErr);
	}

	phantom.execute({ url: "https://allegro.pl" }, function(err, res) {
		if (err) {
			return console.error('Error while executing:', err);
		}
		else {
			return console.log("Phantom started");
		}
	});
});
