define([], () => {
	function generateUrlData(data) {
		var urlEncodedDataPairs = [];
		for (var name in data) {
			urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		}

		return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
	}
	return {
		get(url) {
			return new Promise(function(resolve, reject) {
				var req = new XMLHttpRequest();
				req.open('GET', url);

				req.onload = function() {
					if (req.status >= 200 && req.status < 300 || req.status === 304) {
						resolve(req.response);
					}
					else {
						reject(Error(req.statusText));
					}
				};

				req.onerror = function() {
					reject(Error("Network Error"));
				};

				req.send();
			});
		},

		post(url, data) {
			return new Promise(function(resolve, reject) {
				var req = new XMLHttpRequest();

				req.open('POST', url);
				req.onload = function() {
					if (req.status >= 200 && req.status < 300 || req.status === 304) {
						resolve(req.response);
					}
					else {
						reject(Error(req.statusText));
					}
				};
				req.onerror = function() {
					reject(Error("Network Error"));
				};

				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				req.send(generateUrlData(data));
			});
		}
	};
});
