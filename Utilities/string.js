/*
Crystal (ChatTriggers module)
Copyright (C) 2022 leond3

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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