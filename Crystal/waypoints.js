import { Vector } from "../Utilities/vector";
import { Waypoint } from '../Utilities/render';

export function renderCrystalNucleus(playerPos) {
    const locations = [Vector(564.5, 121.5, 564.5), Vector(564.5, 120.5, 462.5), Vector(462.5, 120.5, 462.5), Vector(462.5, 121.5, 564.5), Vector(478.5, 64.5, 543.5), Vector(478.5, 64.5, 484.5), Vector(548.5, 64.5, 478.5), Vector(539.5, 64.5, 540.5)];
    
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

    Waypoint('Crystal Nucleus', vector.getX(), vector.getY(), vector.getZ(), 170, 0, 170, true, true);
}