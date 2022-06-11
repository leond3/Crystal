import Vector from './vector';

/**
 * Draws a waypoint in the world as specified in the parameters
 * @author leond3
 * @param {string} text The text displayed on the waypoint
 * @param {Vector} playerView Vector of the partial position of the player
 * @param {Vector} waypointPos Vector position of the waypoint location
 * @param {number} red Color value 'red' of the displayed text, ranges [0, 255]
 * @param {number} green Color value 'green' of the displayed text, ranges [0, 255]
 * @param {number} blue Color value 'blue' of the displayed text, ranges [0, 255]
 * @param {boolean} background Draws the background box of the waypoint text
 * @param {boolean} distance Draws an additional waypoint with a rounded distance text in meters (blocks)
 * @returns A waypoint drawn in the frame that the function is called
 */
export function Waypoint(text, playerView, waypointPos, red, green, blue, background, distance) {
	if (typeof red !== 'number' || typeof green !== 'number' || typeof blue !== 'number' || typeof background !== 'boolean' || typeof distance !== 'boolean') return;

	const vec = waypointPos.subtract(playerView);
	const dist = vec.magnitude();
	
	// Fixes a bug with Tessellator not drawing correctly when the waypoint is far away
	const renderPos = dist > 108 ? playerView.add(vec.normalise().multiply(108)) : waypointPos;
	const scale = dist > 108 ? 0.4 : 0.04 * (dist / 12 + 1);

    Tessellator.drawString(text, renderPos.getX(), renderPos.getY(), renderPos.getZ(), (MathLib.clamp(red, 0, 255) << 16) + (MathLib.clamp(green, 0, 255) << 8) + (MathLib.clamp(blue, 0, 255)), background, scale, false);
	if (distance) Tessellator.drawString(Math.round(dist) + 'm', renderPos.getX(), renderPos.getY() - (scale * 9), renderPos.getZ(), (MathLib.clamp(Math.round(red * 0.9), 0, 255) << 16) + (MathLib.clamp(Math.round(green * 0.9), 0, 255) << 8) + (MathLib.clamp(Math.round(blue * 0.9), 0, 255)), background, scale / 1.5, false);
}
