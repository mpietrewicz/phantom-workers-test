//every worker gets unique port, get it from a process environment variables
var system = require("system");
var host = system.env['PHANTOM_WORKER_HOST'];
var port = system.env['PHANTOM_WORKER_PORT'];

require('webserver').create().listen(port, function (req, res) {
	console.log(host+':'+port);
	var page = require('webpage').create();
	page.open(req.post.url, function(status) {
		page.injectJs("jquery.min.js");
    // var title = page.evaluate(function() {
	  //   return document.title;
		// });

		var content = page.evaluate(function(){
			var ads = [];
			$("h2:contains('lista ofert')").parents("section").find("article").each(function()
			{
				ads.push({
					"title": $(this).find("h2 a").text(),
					"url": $(this).find("h2 a").attr("href"),
					"price": $(this).find("div div span span:contains(' zł')").text()
					});
			});
			return ads;
		});

		//write the result to the response
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
	  res.write(JSON.stringify({ content: content }));
	  res.close();
	  page.close();
	});
});
