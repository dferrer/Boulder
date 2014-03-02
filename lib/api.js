var api = {};

var baseAddress = "http://boulder.hunterleath.com";

// Each Request should contain the Token and the Pebble Id
var pebbleToken = "";
var pebbleId = Pebble.getAccountToken();

api.baseAddress = function() {
	return baseAddress;
}

api.registerAddress = function() {
	return baseAddress + "/pebble/";
}

api.getToken = function() {
	ajax({ url: baseAddress + "/boulder/api/get_token/", data: "adsf"}, function(data) {

	});
}

api.getUserProfile = function(callback) {
	if(pebbleToken == "") {
		simply.text()
	} else {
		// Blah
	}
}

api.logActivity = function() {

}

module.exports = api;