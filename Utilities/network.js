import { getCHLocation, getLobby } from './location';

const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const URL = Java.type("java.net.URL");

let synchronized = false;
export function getSynchronized() {
	return synchronized;
}

export function syncWaypoints() {
	try {
		synchronized = true;
		new Thread(() => {
			try {
				const lobby = getLobby();
				if (getCHLocation().length !== 0) {//while
					let json = GET('https://forgemodapi.herokuapp.com/crystal/get?lobby=' + lobby);
					if (json == null || typeof json?.status !== 'number' || json['status'] !== 200 || typeof json['waypoints'] !== 'object') return;//continue;

					Object.keys(json['waypoints']).forEach(waypoint => {
						let id = Number(waypoint['id']);
						let x = Number(waypoint['x']);
						let y = Number(waypoint['y']);
						let z = Number(waypoint['z']);
						if (id != NaN && x != NaN && y != NaN && z != NaN) {
							// TASK: Create waypoint
						}
					});
				}
			} catch (err) {} finally {
				// synchronized = false;
			}
		}).start();
	} catch (err) {
		synchronized = false;
	}
}

function GET(url) {
	try {
		let conn = new URL(url).openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(30000);
		conn.setReadTimeout(30000);
		conn.setRequestProperty("User-Agent", "Mozilla/5.0");
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
			let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
			let line;
			let response = '';
			while ((line = input.readLine()) != null) response += line;
			input.close();
			return JSON.parse(response);
		}
	} catch (err) {} finally {
		return null;
	}
}

export function POST(url, output) {
    try {
		let conn = new URL(url).openConnection();
		conn.setRequestMethod("POST");
		conn.setConnectTimeout(3000);
		conn.setReadTimeout(3000);
		conn.setRequestProperty("User-Agent", "Mozilla/5.0");
		conn.setDoOutput(true);

		const encoder = new TextEncoder();
		let os = conn.getOutputStream();
		os.write(encoder.encode(output));
		os.flush();
		os.close();

		if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
			let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
			let line;
			let response = '';
			while ((line = input.readLine()) != null) response += line;
			input.close();
			return JSON.parse(response);
		}
	} catch (err) {} finally {
		return null;
	}
}