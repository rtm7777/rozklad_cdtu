export let socket = new Promise((resolve, reject) => {
	let req = new XMLHttpRequest();
	req.open('GET', '/get_ws_token');

	req.onload = () => {
		if (req.status >= 200 && req.status < 300 || req.status === 304) {
			let token = req.getResponseHeader('Web-Socket-Token');
			resolve(new WebSocket(`ws://${window.location.host}/ws/socket?token=${token}`));
		}
		else {
			reject(Error(req.statusText));
		}
	};

	req.onerror = () => {
		reject(Error("Can't get socket token"));
	};

	req.send();
});
