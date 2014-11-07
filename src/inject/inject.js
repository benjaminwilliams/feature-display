chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			listFeatures(prefix);

		}
	}, 10);
});

function listFeatures(prefix) {

	function checkForClass(prefix) {

		var element = document.getElementsByTagName("html")[0];
		var classList = "";
		for (var i = 0; i < element.className.split(' ').length; i++ ) {
			var data = element.className.split(' ')[i];
			if(data.lastIndexOf(prefix, 0) === 0){
				classList += (" " + element.className.split(' ')[i]);
			}
		}

		if(classList === ""){
			classList = "(all toggles off)";
		}
		return classList;
	}

	return checkForClass(prefix);
}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "getFeaturesFromInject"){
			sendResponse({
				msg: listFeatures("ft-")
			});
		}


	});