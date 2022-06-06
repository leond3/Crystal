module.exports.Vector = function(x, y, z) {
    return new Vector(x, y, z);
}

class Vector {
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