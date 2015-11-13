export default  {
	element: null,

	check(target) {
		if (this.element === target) {
			return true;
		};
		return false;
	}
};
