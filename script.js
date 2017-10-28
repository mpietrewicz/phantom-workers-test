//every worker gets unique port, get it from a process environment variables
var system = require("system");
var host = system.env['PHANTOM_WORKER_HOST'];
var port = system.env['PHANTOM_WORKER_PORT'];

require('webserver').create().listen(port, function (req, res) {
	console.log(host+':'+port);
	//standard phantomjs script which get input parametrs from request
	var page = require('webpage').create();
	page.open(JSON.parse(req.post).url, function(status) {
    var title = page.evaluate(function() {
	    return document.title;
		});

		//write the result to the response
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
	  res.write(JSON.stringify({ title: title }));
	  res.close();
	});
});
