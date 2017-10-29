//every worker gets unique port, get it from a process environment variables
var system = require("system");
var host = system.env['PHANTOM_WORKER_HOST'];
var port = system.env['PHANTOM_WORKER_PORT'];

require('webserver').create().listen(port, function (req, res) {
	console.log(host+':'+port);
	var url = "https://allegro.pl/kategoria/seria-3-e46-1998-2007-18077";
	var page = require('webpage').create();
	page.open(JSON.parse(req.post).url, function(status) {
		page.injectJs("jquery.min.js");
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
