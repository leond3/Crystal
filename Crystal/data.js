export function Data(t, x, y, z, r, g, b, n, d) {
    return new WaypointData(t, x, y, z, r, g, b, n, d);
}

class WaypointData {
	constructor(T, X, Y, Z, R, G, B, N, D) {
        this.t = T;
		this.x = X;
        this.y = Y;
        this.z = Z;
        this.r = R;
        this.g = G;
        this.b = B;
        this.n = N;
        this.d = D;
	}
    getText() {
		return this.t;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
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
}