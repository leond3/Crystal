import { renderCrystalNucleus } from './Crystal/waypoints';
import { Vector } from './Utilities/vector';
import { getCHLocation, getLobby } from './Utilities/location';
import { Waypoint } from './Utilities/render';

var location = 'None';

var NucleusWaypoint = true;

register("renderWorld", onRenderWorld);
register("tick", onTick);

function onRenderWorld() {
	if (location.length == 0) return;
	// Waypoint(getLobby(), Player.getRenderX(), Player.getRenderY() + 2.2, Player.getRenderZ(), 255, 255, 0, true, false);

	const playerPos = Vector(Player.getX(), Player.getY(), Player.getZ());
	
	if (location !== 'Crystal Nucleus') {
		renderCrystalNucleus(playerPos);
	}
}

function onTick(tick) {
	if (tick % 20 != 0) return;
	location = getCHLocation();
}