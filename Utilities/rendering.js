const { Vector } = require('./utils');

module.exports.Waypoint = function(text, x, y, z, red, green, blue, background) {
	if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number' || typeof background !== 'boolean') return;

	const playerPos = Vector(Player.getRenderX(), Player.getRenderY() + 1.9, Player.getRenderZ());
	const waypointPos = Vector(x, y, z);
	const vec = waypointPos.subtract(playerPos);
	const dist = vec.magnitude();
	
	const renderPos = dist > 100 ? playerPos.add(vec.normalise().multiply(100)) : waypointPos;
	const scale = dist > 108 ? 0.4 : 0.04 * (dist / 12 + 1);

    Tessellator.drawString(text, renderPos.getX(), renderPos.getY(), renderPos.getZ(), (MathLib.clamp(red, 0, 255) << 16) + (MathLib.clamp(green, 0, 255) << 8) + (MathLib.clamp(blue, 0, 255)), background, scale, false);
	Tessellator.drawString(Math.round(dist) + 'm', renderPos.getX(), renderPos.getY() - (scale * 9), renderPos.getZ(), (MathLib.clamp(Math.round(red * 0.9), 0, 255) << 16) + (MathLib.clamp(Math.round(green * 0.9), 0, 255) << 8) + (MathLib.clamp(Math.round(blue * 0.9), 0, 255)), background, scale / 1.5, false);
}