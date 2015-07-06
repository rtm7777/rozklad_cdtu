function generateUrlData(data) {
	let urlEncodedDataPairs = [];
	for (let name in data) {
		urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`);
	}

	return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
}

function request(url, type, data, dataType = '') {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
		if (type == 'GET') url += `?${generateUrlData(data)}`;

		req.open(type, url);

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
				reject(new Error(req.statusText));
			}
		};

		req.onerror = () => {
			reject(new Error('Network Error'));
		};

		if (type == 'GET') {
			req.send();
		} else if (dataType == 'json') {
			req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			req.send(JSON.stringify(data));
		} else {
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			req.send(generateUrlData(data));
		}
	});
}

export default {
	get(url, data) {
		return request(url, 'GET', data);
	},

	post(url, data, type = '') {
		return request(url, 'POST', data, type);
	}
};
