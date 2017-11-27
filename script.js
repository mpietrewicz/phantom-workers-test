//every worker gets unique port, get it from a process environment variables
var system = require("system");
var host = system.env['PHANTOM_WORKER_HOST'];
var port = system.env['PHANTOM_WORKER_PORT'];
console.log(host+':'+port);

require('webserver').create().listen(port, function (req, res) {
	var startProcessDate = new Date();
	var page = require('webpage').create();
	page.open(req.post.url, function(status) {
		page.injectJs("jquery.min.js");

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
		if(req.post.url != undefined) {
			console.log("Evaluate page: " +req.post.url);
		}
		console.log("[Time:	" +(new Date() - startProcessDate) +" ms] " +host +':' +port);
		res.setHeader('Content-Type', 'application/json');
	  res.write(JSON.stringify({ content: content }));
	  res.close();
	  page.close();
	});
});
