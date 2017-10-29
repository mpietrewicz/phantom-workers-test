//every worker gets unique port, get it from a process environment variables
var system = require("system");
var host = system.env['PHANTOM_WORKER_HOST'];
var port = system.env['PHANTOM_WORKER_PORT'];

require('webserver').create().listen(port, function (req, res) {
	console.log(host+':'+port);
	var url = "https://allegro.pl/kategoria/seria-3-e46-1998-2007-18077";
	var page = require('webpage').create();
	page.open(url, function(status) {
		page.injectJs("jquery.min.js");
    // var title = page.evaluate(function() {
	  //   return document.title;
		// });

		var content = page.evaluate(function(){

			var text = [];
			$("h2:contains('lista promowanych ofert')").parents("section").find("article").each(function()
			{
				text.push($(this).find("h2 a").text());
				text.push($(this).find("h2 a").attr("href"));
				text.push($(this).find("div div span span:contains(' zł')").text());
			});

			return text;
		});

		//write the result to the response
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
	  res.write(JSON.stringify({ content: content }));
	  res.close();
	});
});
