var phantom = require("phantom-workers")({
	pathToPhantomScript: "script.js",
	timeout: 5000,
	numberOfWorkers: 10
});

phantom.start(function(startErr) {
	if (startErr) {
		return console.error('Error while starting workers:', startErr);
	}

	phantom.execute({ url: "https://jsreport.net" }, function(err, res) {
		if (err) {
			return console.error('Error while executing:', err);
		}

		console.log(res.title);
	});
});