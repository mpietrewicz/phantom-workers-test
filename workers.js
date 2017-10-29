var phantom = require("phantom-workers")({
	pathToPhantomScript: "script.js",
	timeout: 10000,
	portLeftBoundary: 60000,
	portRightBoundary: 60000,
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

		console.log("Service title: " +res.title);
	});
});
