import { Data } from './Crystal/data';
import { createWaypoint, renderCrystalNucleus } from './Crystal/waypoints';
import { getCHLocation } from './Utilities/location';
import { Waypoint } from './Utilities/render';

var waypoints = new Map();

var NucleusWaypoint = true;
var HollowWaypoints = true;

register("renderWorld", onRenderWorld);
register("tick", onTick);
register("worldUnload", onUnloadWorld);

function onRenderWorld() {
	// Waypoint(Player.lookingAt()?.type?.name, Player.getX(), Player.getY() + 2.5, Player.getZ(), 128, 128, 128, true, false);
	if (waypoints.size == 0) return;

	for (let data of waypoints.values()) {
		Waypoint(data.getText(), data.getX(), data.getY(), data.getZ(), data.getRed(), data.getGreen(), data.getBlue(), data.getBackground(), data.getDistance());
	}
}

function onUnloadWorld() {
	waypoints.clear();
}

function onTick(tick) {
	if (tick % 20 != 0) return;

	const location = getCHLocation();
	if (location.length == 0) return;

	if (NucleusWaypoint && location !== 'crystal nucleus') {
		waypoints.set('nucleus', renderCrystalNucleus());
	} else if (waypoints.has('nucleus')) {
		waypoints.delete('nucleus');
	}

	if (!HollowWaypoints) return;

	for (let entity of World.getAllEntities()) {
		let name = ChatLib.removeFormatting(entity.getName()).toLowerCase().replace(/[^a-z ]/g, '').replace('lv ', '').replace(' kk', '').replace(' km', '').replace(' mm', '').trim();
		if (name == 'professor robot' && !waypoints.has('city')) {
			waypoints.set('city', createWaypoint(1, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'keeper of lapis' && !waypoints.has('divan')) {
			waypoints.set('divan', createWaypoint(2, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'keeper of gold' && !waypoints.has('divan')) {
			waypoints.set('divan', createWaypoint(3, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'keeper of diamond' && !waypoints.has('divan')) {
			waypoints.set('divan', createWaypoint(4, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'keeper of emerald' && !waypoints.has('divan')) {
			waypoints.set('divan', createWaypoint(5, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'odawa' && !waypoints.has('odawa')) {
			waypoints.set('odawa', createWaypoint(6, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'butterfly' && !waypoints.has('grotto')) {
			waypoints.set('grotto', createWaypoint(7, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'bal' && !waypoints.has('khazaddum')) {
			waypoints.set('khazaddum', createWaypoint(8, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'kalhuiki door guardian' && !waypoints.has('temple')) {
			waypoints.set('temple', createWaypoint(9, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'king yolkar' && !waypoints.has('king')) {
			waypoints.set('king', createWaypoint(10, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		if (name == 'boss corleone' && !waypoints.has('corleone')) {
			waypoints.set('corleone', createWaypoint(12, entity.getX(), entity.getY(), entity.getZ()));
			continue;
		}
		// if (!waypoints.has(name)) {
		// 	waypoints.set(name, createWaypoint(name, entity.getX(), entity.getY(), entity.getZ()));
		// 	continue;
		// }
	}

	if (location === 'khazad dum' && !waypoints.has('khazaddum')) {
		// Bal is not in the arena, determine waypoint location with Topaz Crystal
		new Thread(() => {
			for (var x = Player.getX() - 64; x < Player.getX() + 64; x++) {
				for (var y = MathLib.clamp(Player.getY() - 16, 31, 63); y < Player.getY() + 32; y++) {
					for (var z = Player.getZ() - 64; z < Player.getZ() + 64; z++) {
						let block = World.getBlockAt(x, y, z)?.type?.name;
						if (block == 'Barrier') {
							waypoints.set('khazaddum', createWaypoint(8, x, y, z + 20));
							return;
						}
					}
				}
			}
		}).start();
	}
	if (location === 'goblin queen' && !waypoints.has('queen')) {
		// Player is in the Goblin Queen's Den, determine waypoint location with Amber Crystal
		new Thread(() => {
			for (var x = Player.getX() - 64; x < Player.getX() + 64; x++) {
				for (var y = MathLib.clamp(Player.getY() - 64, 64, 124); y < MathLib.clamp(Player.getY() + 64, 128, 188); y++) {
					for (var z = Player.getZ() - 64; z < Player.getZ() + 64; z++) {
						let block = World.getBlockAt(x, y, z)?.type?.name;
						if (block == 'Barrier') {
							waypoints.set('queen', createWaypoint(11, x, y, z));
							return;
						}
					}
				}
			}
		}).start();
	}
}