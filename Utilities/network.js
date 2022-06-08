import String from "./string";

const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const URL = Java.type("java.net.URL");

/**
 * Requests a json response from an API
 * @param {string} url URL of the API
 * @param {boolean} useLongPulling Increases the connection timeout to Short.MAX_VALUE, default: false
 * @returns Any response from the API in JSON format, otherwise null
 */
 export function get(url, useLongPulling = false) {
    try {
		let conn = new URL(url).openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(useLongPulling ? 32767 : 3000);
		conn.setReadTimeout(useLongPulling ? 32767 : 3000);
		// Defines the User Agent: https://github.com/ChatTriggers/ChatTriggers/blob/master/src/main/kotlin/com/chattriggers/ctjs/CTJS.kt#L90
		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (ChatTriggers)");
		let json = null;
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
			// Reads the data (JSON formatted) from the API
			let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
			let line;
			let response = '';
			while ((line = input.readLine()) != null) response += line;
			input.close();
			return response.length !== 0 ? JSON.parse(response) : null;
		}
		return null;
	} catch (err) {
		return null;
	}
}


/**
 * Sends a string of text to the API
 * @param {string} url URL of the API
 * @param {string} output The string of text in mapping format
 * @returns Any response from the API in JSON format, otherwise null
 */
export function post(url, output) {
    try {
		if (output.length < 4) return null;
		let conn = new URL(url).openConnection();
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setConnectTimeout(3000);
		conn.setReadTimeout(3000);
		// Defines the User Agent: https://github.com/ChatTriggers/ChatTriggers/blob/master/src/main/kotlin/com/chattriggers/ctjs/CTJS.kt#L90
		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (ChatTriggers)");

		// Creates an array of bytes (and then sends them over the network (=internet) as packets)
		let os = conn.getOutputStream();
		os.write(new String(output).getBytes());
		os.flush();
		os.close();

		// Awaits if the API returns some JSON data (confirmation)
		// This section is unused, but may be used in a future update
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
			let input = new BufferedReader(new InputStreamReader(conn.getInputStream()))
			let line;
			let response = '';
			while ((line = input.readLine()) != null) response += line;
			input.close();
			return response.length !== 0 ? JSON.parse(response) : null;
		}
		return null;
	} catch (err) {
		return null;
	}
}
