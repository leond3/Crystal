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

export default class Vector {
	constructor(x, y, z) {
		this.setX(x);
		this.setY(y);
		this.setZ(z);
	}
	getX() {
		return this.x;
	}
	setX(X) {
		this.x = X;
	}
	getY() {
		return this.y;
	}
	setY(Y) {
		this.y = Y;
	}
	getZ() {
		return this.z;
	}
	setZ(Z) {
		this.z = Z;
	}
	add(v) {
		return new Vector(this.getX() + v.getX(), this.getY() + v.getY(), this.getZ() + v.getZ());
	}
	subtract(v) {
		return new Vector(this.getX() - v.getX(), this.getY() - v.getY(), this.getZ() - v.getZ());
	}
	multiply(scalar) {
		return new Vector(this.getX() * scalar, this.getY() * scalar, this.getZ() * scalar);
	}
	divide(scalar) {
		return new Vector(this.getX() / scalar, this.getY() / scalar, this.getZ() / scalar);
	}
	magnitude() {
		return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY() + this.getZ() * this.getZ());
	}
	normalise() {
		return this.divide(this.magnitude());
	}
}
