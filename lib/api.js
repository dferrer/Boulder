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

api.logAction = function(toLog) {
    ajax({ url: baseAddress + "/boulder/api/log/", method: 'post', data: toLog, type: "json" }, function(data){
    	if(data["error"] != 0) {
    		console.log("API Error");
    		console.log(data["error"]);
    	}
    }, function(err) { console.log(err); });
}

api.getToken = function(callback) {
	request = {"id": pebbleId};
	ajax({ url: baseAddress + "/boulder/api/token/", data: request, method: "POST", type: "json"}, function(data) {
		if(data["error"] != 0) {
			console.log("API Error");
			console.log(data["error"]);
		} else {
			callback(data);
		}
	});
}

api.getUserProfile = function(callback) {
	request = {"id": pebbleId, "token": pebbleToken};
	ajax({ url: baseAddress + "/boulder/api/view/", data: request, method: "POST", type: "json"}, function(data) {
		if(data["error"] != 0) {
			console.log("API Error");
			console.log(data["error"]);
		} else {
			callback(data);
		}
	});
}

api.displayUserProfile = function(callback) {
	if(pebbleToken == "") {
		api.displayRegistration();
	} else {
		api.getUserProfile(function(data) {
			simply.text({
				title: "Boulder App",
				subtitle: data.username,
				body: "Level " + data.level + "\n\nPress up to begin workout.",
			}, true);
		});
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