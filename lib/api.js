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
		simply.text({
			title: "Welcome Back",
		}, true);
	}
}

api.displayRegistration = function() {
	api.getToken(function() {
		simply.text({
			title: "Boulder App",
			subtitle: "Code: " + code,
			body: "Go to " + api.registerAddress() + " to finish your registration.",
		}, true);
	});
}

module.exports = api;