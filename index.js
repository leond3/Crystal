/*
Crystal (ChatTriggers module)
Copyright (C) 2022 leond3

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { crystalWaypoint, fetchedWaypoint, nucleusWaypoint } from './Crystal/waypoints';
import { getCHLocation, getLobby } from './Utilities/location';
import { Waypoint } from './Utilities/render';

var waypoints = new Map();

var NucleusWaypoint = true;
var HollowWaypoints = true;

var newLobby = true;
var synchronized = false;

var killThread = false;

register("renderWorld", onRenderWorld);
register("step", onSecond).setDelay(1);
register("worldUnload", onUnloadWorld);
register("messageSent", onSendMessage);

function onRenderWorld() {
	if (waypoints.size == 0) return;

	for (let data of waypoints.values()) {
		Waypoint(data.getText(), data.getX(), data.getY(), data.getZ(), data.getRed(), data.getGreen(), data.getBlue(), data.getBackground(), data.getDistance());
	}
}

function onUnloadWorld() {
	waypoints.clear();
	newLobby = true;
}

function onSendMessage(message, event) {
	if (message.startsWith('/ct load') || message.startsWith('/chattriggers load')) {
		killThread = true;
		syncWaypoints.interrupt();
		synchronized = true;
	}
}

function onSecond() {
	const location = getCHLocation();
	if (location.length == 0) return;

	if (NucleusWaypoint && location !== 'crystal nucleus') {
		waypoints.set('nucleus', nucleusWaypoint());
	} else if (waypoints.has('nucleus')) {
		waypoints.delete('nucleus');
	}

	if (!HollowWaypoints) return;

	if (newLobby) {
		forceUpdateWaypoints();
		newLobby = false;
	}
	if (!synchronized) {
		synchronized = true;
		syncWaypoints.start();
	}

	for (let entity of World.getAllEntities()) {
		let name = ChatLib.removeFormatting(entity.getName()).toLowerCase().replace(/[^a-z ]/g, '').replace('lv ', '').replace(' kk', '').replace(' km', '').replace(' mm', '').trim();
		if (name == 'professor robot' && !waypoints.has('Precursor City')) {
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

const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const URL = Java.type("java.net.URL");

const syncWaypoints = new Thread(() => {
	try {
		const lobby = getLobby();
		while (getCHLocation().length !== 0) {
			if (killThread) return;

			let conn = new URL('https://forgemodapi.herokuapp.com/crystal/get?lobby=' + lobby).openConnection();
			conn.setRequestMethod("GET");
			conn.setConnectTimeout(30000);
			conn.setReadTimeout(30000);
			conn.setRequestProperty("User-Agent", "Mozilla/5.0");
			let json = null;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
				let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
				let line;
				let response = '';
				while ((line = input.readLine()) != null) response += line;
				input.close();
				json = JSON.parse(response);
			}
			if (json == null || typeof json?.status !== 'number' || json['status'] !== 200 || typeof json['waypoints'] !== 'object') return;

			fetchWaypoints(json);
		}
	} catch (err) {} finally {
		synchronized = false;
	}
});

function forceUpdateWaypoints() {
	try {
		new Thread(() => {
			try {
				let conn = new URL('https://forgemodapi.herokuapp.com/crystal/force?lobby=' + getLobby()).openConnection();
				conn.setRequestMethod("GET");
				conn.setConnectTimeout(30000);
				conn.setReadTimeout(30000);
				conn.setRequestProperty("User-Agent", "Mozilla/5.0");
				let json = null;
				if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
					let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
					let line;
					let response = '';
					while ((line = input.readLine()) != null) response += line;
					input.close();
					json = JSON.parse(response);
				}
				if (json == null || typeof json?.status !== 'number' || json['status'] !== 200 || typeof json['waypoints'] !== 'object') return;
	
				fetchWaypoints(json);
			} catch (err) {}
		}).start();
	} catch (err) {}
}

function fetchWaypoints(json) {
	Object.keys(json['waypoints']).forEach(waypoint => {
		let name = waypoint;
		if (typeof name === 'string') {
			let x = Number(json['waypoints'][name]['x']);
			let y = Number(json['waypoints'][name]['y']);
			let z = Number(json['waypoints'][name]['z']);
			if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
				let data = fetchedWaypoint(name);
				data.setX(x);
				data.setY(y);
				data.setZ(z);
				if (data.getText() !== 'Internal Error' && !waypoints.has(data.getText())) waypoints.set(data.getText(), data);
			}
		}
	});
}
