import { onWorldLoad } from './Utilities/utils';
import { Waypoint } from './Utilities/rendering';

register("renderWorld", onRenderWorld);
register("loadWorld", onWorldLoad);

function onRenderWorld() {
	Waypoint('Sexy dude', 0.5, 100.8, 0.5, 255, 0, 0, true);
}