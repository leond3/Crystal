import { crystalWaypoint, fetchedWaypoint, nucleusWaypoint } from './Crystal/waypoints';
import { getCHLocation, getLobby } from './Utilities/location';
import { Waypoint } from './Utilities/render';
import { get } from './Utilities/network';
import Settings from './Crystal/settings';
import Vector from './Utilities/vector';

/*
	Setup module data, currently used for:
	- First time welcome message
*/
var moduleData = {};
if (!FileLib.exists('Crystal', 'data.json')) FileLib.write('Crystal', 'data.json', '{"firstTime":true}', true);
try {
	moduleData = JSON.parse(FileLib.read('Crystal', 'data.json'));
} catch (err) {}

// Variables
var usingLatestVersion = undefined;

var waypoints = new Map();
var synchronized = false;

// Triggers
register('renderWorld', onRenderWorld);
register('step', onSecond).setDelay(1);
register('worldUnload', onUnloadWorld);
register('worldLoad', onLoadWorld);
register('messageSent', onSendMessage);
register('command', () => Settings.openGUI()).setName('crystal').setAliases('cr');

// Functions
function onRenderWorld() {
	if (waypoints.size == 0) return;

	const playerView = new Vector(Player.getRenderX(), Player.getRenderY() + (Player.isSneaking() ? 1.54 : 1.62), Player.getRenderZ());
	for (let data of waypoints.values()) {
		// Renders a waypoints according to its parameters
		Waypoint(data.getText(), playerView, new Vector(data.getX(), data.getY(), data.getZ()), data.getRed(), data.getGreen(), data.getBlue(), data.getBackground(), data.getDistance());
	}
}

function onUnloadWorld() {
	waypoints.clear();
}

function onLoadWorld() {
	const firstTimeInstall = moduleData?.firstTime;
	/*
	 Display welcome message
	*/
	if (firstTimeInstall) {
		// Welcome message
		const text = [
			'&6&l&m                                                                ',
			'&7&lSuccessfully installed &e&lCrystal&7&l!',
			'&7To open the settings GUI, run &e/crystal&7.',
			'&6&l&m                                                                ',
		];

		let message = '';
		for (var i = 0; i < text.length; i++) message += (i !== text.length - 1 ? text[i] + '\n' : text[i]);
	
		ChatLib.chat(message);

		moduleData.firstTime = false;
		FileLib.write('Crystal', 'data.json', JSON.stringify(moduleData), true);
	}
	/*
	 Update checker
	*/
	if (!Settings.UpdateChecker) return;
	if (typeof usingLatestVersion === 'undefined') {
		new Thread(() => {
			const version = JSON.parse(FileLib.read('Crystal', 'metadata.json'))?.version;

			let json = get('https://api.github.com/repos/leond3/Crystal/releases/latest');
			// No internet connection or API down
			if (typeof json?.tag_name !== 'string') return;
			// Check if you are using the latest version
			usingLatestVersion = `${json.tag_name}`.endsWith(`${version}`) ? true : false;
		}).start();
		return;
	}
	// Only display a message when an older version is installed
	if (usingLatestVersion) return;

	try { ChatLib.deleteChat(1582753002); } catch (err) {}
	
	// Update message
	const component = new Message(
		'&6&l&m                                                                \n',
		'   &7&lA new update for &e&lCrystal&7&l is available!\n',
		new TextComponent('   &eClick here ').setHoverValue(`&eClick to download the latest release!`).setClick('open_url', 'https://github.com/leond3/Crystal/releases/latest'),
		'&7 to open the Github download page.\n',
		'   &7&oNote: Github releases are not verified by\n',
		'   &7&o         a trusted ChatTriggers member!\n',
		'&6&l&m                                                                ',
	);

	component.setChatLineId(1582753002).chat();
}

function onSendMessage(message, event) {
	// Should interrupt any ongoing threads
	if (message.startsWith('/ct load') || message.startsWith('/chattriggers load') || message.startsWith('/ct reload') || message.startsWith('/chattriggers reload')) syncWaypoints.interrupt();// Does not seem to function, threads will automatically stop when leaving the Crystal Hollows lobby
}

function onSecond() {
	const location = getCHLocation();
	if (location.length == 0) return;

	// Display the nearest entrance to the Crystal Nucleus
	if (Settings.NucleusWaypoint && location !== 'crystal nucleus') {
		waypoints.set('nucleus', nucleusWaypoint());
	} else if (waypoints.has('nucleus')) {
		waypoints.delete('nucleus');
	}

	// Toggle for Crystal Hollows waypoints
	if (!Settings.HollowWaypoints) {
		if (waypoints.size > Settings.NucleusWaypoint ? 1 : 0) waypoints.clear();
		return;
	}

	// Requests new waypoints in the lobby
	if (!synchronized) {
		synchronized = true;
		syncWaypoints.start();
	}

	/*
	HYPIXEL NETWORK RULES NOTICE:
	ARMORSTANDS (ENTITIES), ACTING AS THE NAMETAG FOR NPC's, ARE ONLY SPAWNED IN FOR PLAYERS IF THEY'RE WITHIN ~24 BLOCKS.
	THE POSITION OF THE ARMORSTAND IS USUALLY USED AS A STATIC POINT (since the NPC is always in the same location),
	AFTER DETECTION AN OFFSET IS APPLIED AND THE WAYPOINT IS SHOWN IN THE CORRECT LOCATION (usually not even near the npc)

	CHECKING IF THE NPC IS THE LINE OF SIGHT OF THE PLAYER (raycasting) WOULD NOT BE IDEAL:
	FINDING THE PRECURSOR CITY WOULD PLACE THE PRECURSOR CITY WAYPOINT, FOR WHICH THE 'ROBOT PROFESSOR' IS USED AS A STATIC POINT,
	THIS MEANS THAT THE WAYPOINT IS NOT CREATED AT THE NPC, SO THE WAYPOINT IS NOT INDICATING WHERE THE ROBOT PROFESSOR IS LOCATED!

	NO ACTIVE BLOCK SCANNING IS OCCURING, BLOCKS ARE ONLY BEING SCANNED ONCE WHEN THE MODULE IS NOT CERTAIN WHERE TO PLACE THE WAYPOINT.
	SCANNING FOR BLOCKS IN THIS WAY IS MOST LIKELY ALLOWED AS IT IS ALSO USED IN SkyblockAddons (A mod created by a former Hypixel Helper)
	(See more: https://github.com/BiscuitDevelopment/SkyblockAddons/blob/main/src/main/java/codes/biscuit/skyblockaddons/features/EndstoneProtectorManager.java#L121)
	*/

	// Waypoint location detection and creation, also sends the waypoint position to the API
	for (let entity of World.getAllEntities()) {
		let name = ChatLib.removeFormatting(entity.getName()).toLowerCase().replace(/[^a-z ]/g, '').replace('lv ', '').replace(' kk', '').replace(' km', '').replace(' mm', '').trim();
		if (name == 'professor robot' && !waypoints.has('Precursor City') && location == 'lost precursor city') {
			let data = crystalWaypoint(1, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (!waypoints.has('Mines of Divan') && location == 'mines of divan') {
			if (name == 'keeper of lapis') {
				let data = crystalWaypoint(2, entity.getX(), entity.getY(), entity.getZ());
				data.postWaypoint();
				waypoints.set(data.getText(), data);
				continue;
			}
			if (name == 'keeper of gold') {
				let data = crystalWaypoint(3, entity.getX(), entity.getY(), entity.getZ());
				data.postWaypoint();
				waypoints.set(data.getText(), data);
				continue;
			}
			if (name == 'keeper of diamond') {
				let data = crystalWaypoint(4, entity.getX(), entity.getY(), entity.getZ());
				data.postWaypoint();
				waypoints.set(data.getText(), data);
				continue;
			}
			if (name == 'keeper of emerald') {
				let data = crystalWaypoint(5, entity.getX(), entity.getY(), entity.getZ());
				data.postWaypoint();
				waypoints.set(data.getText(), data);
				continue;
			}
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
		// Khazad-d??m: No location check to prioritize nametag detection over block scanning
		if (name == 'bal' && !waypoints.has('Khazad-dum')) {
			let data = crystalWaypoint(8, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'kalhuiki door guardian' && !waypoints.has('Jungle Temple') && location == 'jungle temple') {
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
			const x = entity.getX();
			const y = entity.getY();
			const z = entity.getZ();
			/*
			Check if there is some space above the Boss Corleone,
			Boss Corleone can spawn randomly throughout the Mithril Deposits
			and would therefore not always be in the 'Corleone' waypoint location
			*/
			let correctLocation = true;
			for (let shifted = y + 1; shifted < y + 6; shifted++) {
				let block = World.getBlockAt(x, shifted, z)?.type?.name;
				if (block !== 'Air') {
					correctLocation = false;
					break;
				}
			}
			if (correctLocation) {
				let data = crystalWaypoint(12, x, y, z);
				data.postWaypoint();
				waypoints.set(data.getText(), data);
			}
			continue;
		}
		if (name == 'forger' && !waypoints.has('Forger')) {
			let data = crystalWaypoint(13, entity.getX(), entity.getY(), entity.getZ());
			data.postWaypoint();
			waypoints.set(data.getText(), data);
			continue;
		}
		if (name == 'key guardian' && !waypoints.has('Key Guardian')) {
			let data = crystalWaypoint(14, entity.getX(), entity.getY(), entity.getZ());
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
	if (location === 'dragon lair' && !waypoints.has('Dragon Liar')) {
		// Player is in the Dragon's Liar, determine the location of the waypoint using snow blocks
		new Thread(() => {
			for (var x = Player.getX() - 64; x < Player.getX() + 64; x++) {
				for (var y = MathLib.clamp(Player.getY() - 64, 64, 124); y < MathLib.clamp(Player.getY() + 64, 128, 188); y++) {
					for (var z = Player.getZ() - 64; z < Player.getZ() + 64; z++) {
						let block = World.getBlockAt(x, y, z)?.type?.name;
						if (block == 'Snow') {
							let data = crystalWaypoint(15, x, y, z);
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

// Requests new waypoints in the lobby
const syncWaypoints = new Thread(() => {
	try {
		const lobby = getLobby();
		if (lobby.length != 0) {
			// Requests all waypoints in the lobby
			forceUpdateWaypoints(lobby);
			// Fetches newly created waypoints in the lobby
			while (getCHLocation().length !== 0) {
				let json = get('https://forgemodapi.herokuapp.com/crystal/get?lobby=' + lobby, true);
				
				if (!Settings.HollowWaypoints) break;// End thread if waypoints are toggled off
				if (json == null || typeof json?.status !== 'number' || json['status'] !== 200 || typeof json['waypoints'] !== 'object') continue;
				// Create shared waypoints
				fetchWaypoints(json);
			}
		}
	} catch (err) {} finally {
		synchronized = false;
	}
});

/**
 * Requests all waypoints in the lobby
 */
function forceUpdateWaypoints(lobby) {
	try {
		let json = get('https://forgemodapi.herokuapp.com/crystal/force?lobby=' + lobby);
		
		if (json == null || typeof json?.status !== 'number' || json['status'] !== 200 || typeof json['waypoints'] !== 'object') return;
		// Create shared waypoints
		fetchWaypoints(json);
	} catch (err) {}
}

function fetchWaypoints(json) {
	Object.keys(json['waypoints']).forEach(waypoint => {
		// Name of the waypoint
		let name = waypoint;
		if (typeof name === 'string') {
			// Position of the waypoint
			let x = Number(json['waypoints'][name]['x']);
			let y = Number(json['waypoints'][name]['y']);
			let z = Number(json['waypoints'][name]['z']);
			if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
				// Creating the waypoint
				let data = fetchedWaypoint(name);
				data.setX(x);
				data.setY(y);
				data.setZ(z);
				// Adds the waypoint to the render list, unless it is already on there
				if (data.getText() !== 'Internal Error' && !waypoints.has(data.getText())) waypoints.set(data.getText(), data);
			}
		}
	});
}
