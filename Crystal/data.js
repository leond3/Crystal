import { getLobby } from "../Utilities/location";
import { post } from "../Utilities/network";

/**
 * Builds a class containing all the data used for waypoint rendering
 * @param {string} t Displayed text
 * @param {number} x X position (coordinate)
 * @param {number} y Y position (coordinate)
 * @param {number} z Z position (coordinate)
 * @param {number} r Red value (color)
 * @param {number} g Green value (color)
 * @param {number} b Blue value (color)
 * @param {boolean} n Nametag box rendering
 * @param {boolean} d Distance text rendering
 * @returns WaypointData (class)
 */
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
    /**
     * Sends the waypoint's name and position in the lobby to the API
     */
    postWaypoint() {
        post('https://forgemodapi.herokuapp.com/crystal/post', `name=${this.getText()}&x=${this.getX()}&y=${this.getY()}&z=${this.getZ()}&lobby=${getLobby()}`);
    }
}
