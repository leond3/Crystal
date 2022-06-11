import Vector from "../Utilities/vector";
import { Data } from "./data";

// Entrances to the Crystal Nucleus
const nucleusLocations = [new Vector(564.5, 121.5, 564.5), new Vector(564.5, 120.5, 462.5), new Vector(462.5, 120.5, 462.5), new Vector(462.5, 121.5, 564.5), new Vector(478.5, 64.5, 543.5), new Vector(478.5, 64.5, 484.5), new Vector(548.5, 64.5, 478.5), new Vector(539.5, 64.5, 540.5)];

/**
 * Calculates the nearest entrance from the Player's position
 * @returns Returns the waypoint data of the nearest entrance of the Crystal Nucleus
 */
export function nucleusWaypoint() {    
    const playerPos = new Vector(Player.getX(), Player.getY(), Player.getZ());

    var closest = 999;
    var vector = null;
    for (var i = 0; i < nucleusLocations.length; i++) {
        let vec = nucleusLocations[i];
        let dist = vec.subtract(playerPos).magnitude();
        if (dist < closest) {
            vector = vec;
            closest = dist;
        }
    }
    if (vector == null) return;

    return Data('Crystal Nucleus', vector.getX(), vector.getY(), vector.getZ(), 170, 0, 170, true, true);
}

/**
 * Crystal Hollows waypoint formatting
 * @param {number} type ID of the waypoint
 * @param {number} x X position of the waypoint (coordinate)
 * @param {number} y Y position of the waypoint (coordinate)
 * @param {number} z Z position of the waypoint (coordinate)
 * @returns Crystal Hollows waypoint data
 */
export function crystalWaypoint(type, x, y, z) {
    if (type === 1) return Data('Precursor City', x + 20, y + 20, z - 20, 85, 255, 255, true, true);
    if (type === 2) return Data('Mines of Divan', x - 33, y + 20, z - 3, 0, 170, 0, true, true);
    if (type === 3) return Data('Mines of Divan', x + 3, y + 20, z - 33, 0, 170, 0, true, true);
    if (type === 4) return Data('Mines of Divan', x + 33, y + 20, z + 3, 0, 170, 0, true, true);
    if (type === 5) return Data('Mines of Divan', x - 3, y + 20, z + 33, 0, 170, 0, true, true);
    if (type === 6) return Data('Odawa', x, y + 5, z - 15, 85, 255, 85, true, true);
    if (type === 7) return Data('Fairy Grotto', x, y, z, 255, 85, 255, true, true);
    if (type === 8) return Data('Khazad-dum', x, y + 5, z, 255, 85, 85, true, true);
    if (type === 9) return Data('Jungle Temple', x + 25, y + 30, z + 13, 0, 170, 0, true, true);
    if (type === 10) return Data('Goblin King', x, y + 10, z + 15, 255, 170, 0, true, true);
    if (type === 11) return Data('Goblin Queen', x, y + 15, z, 255, 170, 0, true, true);
    if (type === 12) return Data('Corleone', x, y + 5, z, 85, 255, 85, true, true);
	if (type === 13) return Data('Forger', x, y + 3, z, 85, 255, 85, true, true);
    if (type === 14) return Data('Key Guardian', x, y + 3, z, 85, 255, 85, true, true);
    if (type === 15) return Data('Dragon Liar', x - 5, y + 5, z + 5, 255, 255, 85, true, true);
    return Data('Internal Error', x, y, z, 170, 0, 0, false, false);
}

/**
 * Creates waypoint data based on the name fetched from the API
 * @param {string} name The name of the waypoint
 * @returns Crystal Hollows waypoint data
 */
export function fetchedWaypoint(name) {
    if (name == 'Precursor City') return Data('Precursor City', 0, 0, 0, 85, 255, 255, true, true);
    if (name == 'Mines of Divan') return Data('Mines of Divan', 0, 0, 0, 0, 170, 0, true, true);
    if (name == 'Mines of Divan') return Data('Mines of Divan', 0, 0, 0, 0, 170, 0, true, true);
    if (name == 'Mines of Divan') return Data('Mines of Divan', 0, 0, 0, 0, 170, 0, true, true);
    if (name == 'Mines of Divan') return Data('Mines of Divan', 0, 0, 0, 0, 170, 0, true, true);
    if (name == 'Odawa') return Data('Odawa', 0, 0, 0, 85, 255, 85, true, true);
    if (name == 'Fairy Grotto') return Data('Fairy Grotto', 0, 0, 0, 255, 85, 255, true, true);
    if (name == 'Khazad-dum') return Data('Khazad-dum', 0, 0, 0, 255, 85, 85, true, true);
    if (name == 'Jungle Temple') return Data('Jungle Temple', 0, 0, 0, 0, 170, 0, true, true);
    if (name == 'Goblin King') return Data('Goblin King', 0, 0, 0, 255, 170, 0, true, true);
    if (name == 'Goblin Queen') return Data('Goblin Queen', 0, 0, 0, 255, 170, 0, true, true);
    if (name == 'Corleone') return Data('Corleone', 0, 0, 0, 85, 255, 85, true, true);
	if (name == 'Forger') return Data('Forger', 0, 0, 0, 85, 255, 85, true, true);
    if (name == 'Key Guardian') return Data('Key Guardian', 0, 0, 0, 85, 255, 85, true, true);
    if (name == 'Dragon Liar') return Data('Dragon Liar', 0, 0, 0, 255, 255, 85, true, true);
    return Data('Internal Error', 0, 0, 0, 170, 0, 0, false, false);
}
