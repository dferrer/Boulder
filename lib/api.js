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
	ajax({ url: baseAddress + "/boulder/api/get_token/", data: JSON.stringify(request) }, function(data) {
		output = JSON.parse(data);
		callback(output.token);
	});
}

api.displayUserProfile = function(callback) {
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