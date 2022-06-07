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

import Vector from "../Utilities/vector";
import { Data } from "./data";

const nucleusLocations = [new Vector(564.5, 121.5, 564.5), new Vector(564.5, 120.5, 462.5), new Vector(462.5, 120.5, 462.5), new Vector(462.5, 121.5, 564.5), new Vector(478.5, 64.5, 543.5), new Vector(478.5, 64.5, 484.5), new Vector(548.5, 64.5, 478.5), new Vector(539.5, 64.5, 540.5)];

export function nucleusWaypoint(playerPos) {    
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
    return Data('Internal Error', x, y, z, 170, 0, 0, false, false);
}

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
    return Data('Internal Error', 0, 0, 0, 170, 0, 0, false, false);
}
