var api = {};

var baseAddress = "http://boulder.hunterleath.com";

// Each Request should contain the Token and the Pebble Id
var pebbleToken = localStorage.getItem('token') || "";
var pebbleId = Pebble.getAccountToken();

api.baseAddress = function() {
	return baseAddress;
}

api.registerAddress = function() {
	return baseAddress + "/pebble/";
}

api.getToken = function(callback) {
	request = {"id": pebbleId};
	// requestString = JSON.stringify(request);
	ajax({ url: baseAddress + "/boulder/api/token/", data: request, method: "POST", type: "json"}, function(data) {
		// output = JSON.parse(data);
		callback(data.token);
	});
}

api.displayUserProfile = function(callback) {
	console.log("token: " + pebbleToken)
	console.log("id: " + pebbleId)
	if(pebbleToken == "") {
		api.displayRegistration();
	} else {
		simply.style("mono");
		simply.text({
			title: "Boulder App",
			subtitle: "Hunter Leath",
			body: "Level 2\n\nPress up to begin workout.",
		}, true);
	}
}

api.displayRegistration = function() {
	api.getToken(function(token) {
		pebbleToken = token;
		localStorage.setItem('token', pebbleToken);
		simply.text({
			title: "Boulder App",
			subtitle: "Code: " + pebbleToken,
			body: "Go to " + api.registerAddress() + " to finish your registration. Press up to load.",
		}, true);
	});
}

module.exports = api;