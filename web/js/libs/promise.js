function generateUrlData(data) {
	let urlEncodedDataPairs = [];
	for (let name in data) {
		urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
	}

	return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
}

export default {
	get(url) {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = () => {
				if (req.status >= 200 && req.status < 300 || req.status === 304) {
					resolve(req.response);
				}
				else {
					reject(Error(req.statusText));
				}
			};

			req.onerror = () => {
				reject(Error("Network Error"));
			};

			req.send();
		});
	},

	post(url, data) {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();

			req.open('POST', url);
			req.onload = () => {
				if (req.status >= 200 && req.status < 300 || req.status === 304) {
					try {
						resolve(JSON.parse(req.response));
					}
					catch(err) {
						resolve(req.response);
					}
				}
				else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = () => {
				reject(Error("Network Error"));
			};

			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(generateUrlData(data));
		});
	}
};
