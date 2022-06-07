export default class String {
    constructor(string) {
		this.s = string;
	}
	toString() {
		return `${this.s}`;
	}
	getBytes() {
		var bytes = [];
		for (var i = 0; i < this.toString().length; i++) bytes.push(this.toString().charCodeAt(i));
		return bytes;
	}
};