const { Waypoint } = require('./Utilities/rendering');

register("renderWorld", onRender);

function onRender() {
	Waypoint('Sexy dude', 0.5, 100.8, 0.5, 255, 0, 0, true);
}