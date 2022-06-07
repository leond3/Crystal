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