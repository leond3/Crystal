import String from "./string";

const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const URL = Java.type("java.net.URL");

/**
 * Sends a string of text to the API
 * @param {*} url URL of the API
 * @param {*} output The string of text in mapping format
 * @returns Any response from the API in JSON format
 */
export function post(url, output) {
    try {
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
			return JSON.parse(response);
		}
	} catch (err) {} finally {
		return null;
	}
}
