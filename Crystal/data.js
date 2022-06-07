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

import { getLobby } from "../Utilities/location";
import { post } from "../Utilities/network";

export function Data(t, x, y, z, r, g, b, n, d) {
    return new WaypointData(t, x, y, z, r, g, b, n, d);
}

class WaypointData {
	constructor(T, X, Y, Z, R, G, B, N, D) {
        this.t = T;
		this.setX(X);
        this.setY(Y);
        this.setZ(Z);
        this.r = R;
        this.g = G;
        this.b = B;
        this.n = N;
        this.d = D;
	}
    getText() {
		return this.t;
	}
    setX(X) {
        this.x = X;
    }
	getX() {
		return this.x;
	}
    setY(Y) {
        this.y = Y;
    }
	getY() {
		return this.y;
	}
    setZ(Z) {
        this.z = Z;
    }
	getZ() {
		return this.z;
	}
    getRed() {
        return this.r;
    }
    getGreen() {
        return this.g;
    }
    getBlue() {
        return this.b;
    }
    getBackground() {
        return this.n;
    }
    getDistance() {
        return this.d;
    }
    postWaypoint() {
        post('https://forgemodapi.herokuapp.com/crystal/post', `name=${this.getText()}&x=${this.getX()}&y=${this.getY()}&z=${this.getZ()}&lobby=${getLobby()}`);
    }
}
