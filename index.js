register("renderWorld", onRender);

const waypoints = new Array();
// waypoints.push(["Sexy dude", [-2.5, 71.8, -73.5], [255, 0, 0]]);
// waypoints.push(["ello", [0.5, 99.8, 0.5], [0, 255, 255, 255]]);
// waypoints.push(["hey", [20.5, 100.8]]);

function onRender() {
	if (waypoints.length == 0) return;

	const playerPos = new Vector(Player.getRenderX(), Player.getRenderY() + 1.9, Player.getRenderZ());

	for (const array of waypoints) {
		renderWaypoint(typeof array[0] === 'string' ? playerPos : 'undefined', array[1] !== undefined ? new Vector(typeof array[1][0] === 'number' ? array[1][0] : 0, typeof array[1][1] === 'number' ? array[1][1] : 0, typeof array[1][2] === 'number' ? array[1][2] : 0) : playerPos, array[0], array[2] !== undefined ? (typeof array[2][3] === 'number' ? array[2][3] << 24 : 0) + (typeof array[2][0] === 'number' ? array[2][0] << 16 : 0) + (typeof array[2][1] === 'number' ? array[2][1] << 8 : 0) + (typeof array[2][2] === 'number' ? array[2][2] : 0) : 0);
	}

	function renderWaypoint(playerPos, waypointPos, text, color) {
		const vec = waypointPos.subtract(playerPos)
		const dist = vec.magnitude();
	
		const renderPos = dist > 10 ? playerPos.add(vec.normalise().multiply(10)) : waypointPos;
	
		Tessellator.drawString(text, renderPos.getX(), renderPos.getY(), renderPos.getZ(), color, true, dist > 9 ? 0.04 : 0.03 + 0.025 / (Math.sqrt(dist) + 1), false);
		Tessellator.drawString(Math.round(dist) + 'm', renderPos.getX(), renderPos.getY() - 0.4, renderPos.getZ(), color, true, dist > 9 ? 0.03 : 0.0225 + 0.01875 / (Math.sqrt(dist) + 1), false);
	}
}

var Vector = (function () {
	function Vector(x, y, z) {
		this.setX(x);
		this.setY(y);
		this.setZ(z);
	}
	Vector.prototype.getX = function () {
		return this.x;
	}
	Vector.prototype.setX = function (X) {
		this.x = X;
	}
	Vector.prototype.getY = function () {
		return this.y;
	}
	Vector.prototype.setY = function (Y) {
		this.y = Y;
	}
	Vector.prototype.getZ = function () {
		return this.z;
	}
	Vector.prototype.setZ = function (Z) {
		this.z = Z;
	}	
	Vector.prototype.add = function (v) {
		return new Vector(this.getX() + v.getX(), this.getY() + v.getY(), this.getZ() + v.getZ());
	}	
	Vector.prototype.subtract = function (v) {
		return new Vector(this.getX() - v.getX(), this.getY() - v.getY(), this.getZ() - v.getZ());
	}	
	Vector.prototype.multiply = function (scalar) {
		return new Vector(this.getX() * scalar, this.getY() * scalar, this.getZ() * scalar);
	}	
	Vector.prototype.divide = function (scalar) {
		return new Vector(this.getX() / scalar, this.getY() / scalar, this.getZ() / scalar);
	}	
	Vector.prototype.magnitude = function () {
		return Math.sqrt(this.getX() * this.getX() + this.getY() * this.getY() + this.getZ() * this.getZ())
	}	
	Vector.prototype.normalise = function () {
		return this.divide(this.magnitude());
	}
	return Vector;
}());