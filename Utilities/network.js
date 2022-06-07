const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const URL = Java.type("java.net.URL");

export function post(url, output) {
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