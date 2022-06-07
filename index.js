import { crystalWaypoint, nucleusWaypoint } from './Crystal/waypoints';
import { getCHLocation } from './Utilities/location';
import { getSynchronized, syncWaypoints } from './Utilities/network';
import { Waypoint } from './Utilities/render';

var waypoints = new Map();

var NucleusWaypoint = true;
var HollowWaypoints = true;

register("renderWorld", onRenderWorld);
register("step", onSecond).setDelay(1);
register("worldUnload", onUnloadWorld);

function onRenderWorld() {
	if (waypoints.size == 0) return;

	for (let data of waypoints.values()) {
		Waypoint(data.getText(), data.getX(), data.getY(), data.getZ(), data.getRed(), data.getGreen(), data.getBlue(), data.getBackground(), data.getDistance());
	}
}

function onUnloadWorld() {
	waypoints.clear();
}

function onSecond() {
	const location = getCHLocation();
	if (location.length == 0) return;

	if (!getSynchronized()) {
		syncWaypoints();
	}

	if (NucleusWaypoint && location !== 'crystal nucleus') {
		waypoints.set('nucleus', nucleusWaypoint());
	} else if (waypoints.has('nucleus')) {
		waypoints.delete('nucleus');
	}

	if (!HollowWaypoints) return;

	for (let entity of World.getAllEntities()) {
		let name = ChatLib.removeFormatting(entity.getName()).toLowerCase().replace(/[^a-z ]/g, '').replace('lv ', '').replace(' kk', '').replace(' km', '').replace(' mm', '').trim();
		if (name == 'professor robot' && !waypoints.has('Lost Precursor City')) {
			let data = crystalWaypoint(1, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'keeper of lapis' && !waypoints.has('Mines of Divan')) {
			let data = crystalWaypoint(2, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'keeper of gold' && !waypoints.has('Mines of Divan')) {
			let data = crystalWaypoint(3, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'keeper of diamond' && !waypoints.has('Mines of Divan')) {
			let data = crystalWaypoint(4, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'keeper of emerald' && !waypoints.has('Mines of Divan')) {
			let data = crystalWaypoint(5, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'odawa' && !waypoints.has('Odawa')) {
			let data = crystalWaypoint(6, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'butterfly' && !waypoints.has('Fairy Grotto')) {
			let data = crystalWaypoint(7, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'bal' && !waypoints.has('Khazad-dum')) {
			let data = crystalWaypoint(8, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'kalhuiki door guardian' && !waypoints.has('Jungle Temple')) {
			let data = crystalWaypoint(9, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'king yolkar' && !waypoints.has('Goblin King')) {
			let data = crystalWaypoint(10, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'boss corleone' && !waypoints.has('Corleone')) {
			let data = crystalWaypoint(12, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'forger' && !waypoints.has('Forger')) {
			let data = crystalWaypoint(13, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
	}

	if (location === 'khazad dum' && !waypoints.has('Khazad-dum')) {
		// Bal is not in the arena, determine waypoint location with Topaz Crystal
		new Thread(() => {
			for (var x = Player.getX() - 64; x < Player.getX() + 64; x++) {
				for (var y = MathLib.clamp(Player.getY() - 16, 31, 63); y < Player.getY() + 32; y++) {
					for (var z = Player.getZ() - 64; z < Player.getZ() + 64; z++) {
						let block = World.getBlockAt(x, y, z)?.type?.name;
						if (block == 'Barrier') {
							let data = crystalWaypoint(8, x, y, z + 20);
							data.postWaypoint();
							waypoints.set(data.getText(), data);
							return;
						}
					}
				}
			}
		}).start();
	}
	if (location === 'goblin queen' && !waypoints.has('Goblin Queen')) {
		// Player is in the Goblin Queen's Den, determine waypoint location with Amber Crystal
		new Thread(() => {
			for (var x = Player.getX() - 64; x < Player.getX() + 64; x++) {
				for (var y = MathLib.clamp(Player.getY() - 64, 64, 124); y < MathLib.clamp(Player.getY() + 64, 128, 188); y++) {
					for (var z = Player.getZ() - 64; z < Player.getZ() + 64; z++) {
						let block = World.getBlockAt(x, y, z)?.type?.name;
						if (block == 'Barrier') {
							let data = crystalWaypoint(11, x, y, z);
							data.postWaypoint();
							waypoints.set(data.getText(), data);
							return;
						}
					}
				}
			}
		}).start();
	}
}