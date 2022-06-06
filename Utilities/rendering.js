const { Vector } = require('./utils');

module.exports.Waypoint = function(text, x, y, z, red, green, blue, background) {
	if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number' || typeof background !== 'boolean') return;

	const playerPos = Vector(Player.getRenderX(), Player.getRenderY() + 1.9, Player.getRenderZ());
	const waypointPos = Vector(x, y, z);
	const vec = waypointPos.subtract(playerPos);
	const dist = vec.magnitude();
	
	const renderPos = dist > 10 ? playerPos.add(vec.normalise().multiply(10)) : waypointPos;

    Tessellator.drawString(text, renderPos.getX(), renderPos.getY(), renderPos.getZ(), (MathLib.clamp(red, 0, 255) << 16) + (MathLib.clamp(green, 0, 255) << 8) + (MathLib.clamp(blue, 0, 255)), background, dist > 9 ? 0.04 : 0.03 + 0.025 / (Math.sqrt(dist) + 1), false);
	Tessellator.drawString(Math.round(dist) + 'm', renderPos.getX(), renderPos.getY() - 0.4, renderPos.getZ(), (MathLib.clamp(Math.round(red * 0.9), 0, 255) << 16) + (MathLib.clamp(Math.round(green * 0.9), 0, 255) << 8) + (MathLib.clamp(Math.round(blue * 0.9), 0, 255)), background, dist > 9 ? 0.03 : 0.0225 + 0.01875 / (Math.sqrt(dist) + 1), false);
}