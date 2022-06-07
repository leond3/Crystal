import { Vector } from "../Utilities/vector";
import { Data } from "./data";

export function nucleusWaypoint(playerPos) {
    const locations = [Vector(564.5, 121.5, 564.5), Vector(564.5, 120.5, 462.5), Vector(462.5, 120.5, 462.5), Vector(462.5, 121.5, 564.5), Vector(478.5, 64.5, 543.5), Vector(478.5, 64.5, 484.5), Vector(548.5, 64.5, 478.5), Vector(539.5, 64.5, 540.5)];
    
    const playerPos = Vector(Player.getX(), Player.getY(), Player.getZ());

    var closest = 999;
    var vector = null;
    for (var i = 0; i < locations.length; i++) {
        let vec = locations[i];
        let dist = vec.subtract(playerPos).magnitude();
        if (dist < closest) {
            vector = vec;
            closest = dist;
        }
    }
    if (vector == null) return;

    return Data('Crystal Nucleus', vector.getX(), vector.getY(), vector.getZ(), 170, 0, 170, true, true);
}

export function crystalWaypoint(type, x, y, z) {
    if (type === 1) return Data('Lost Precursor City', x + 20, y + 20, z - 20, 85, 255, 255, true, true);
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
    return Data('Internal Error', x, y, z, 170, 0, 0, false, false);
}