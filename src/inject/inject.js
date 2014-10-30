chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

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
		return classList;
	}

	return checkForClass(prefix);
}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "getFeaturesFromInject")
			sendResponse({
				msg: listFeatures("ft-")
			});
	});