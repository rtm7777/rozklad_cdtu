class Storage {
	get(key) {
		return localStorage.getItem(key);
	}

	set(key, value) {
		localStorage.setItem(key, value);
	}
}

const storage = new Storage();

export default storage;
