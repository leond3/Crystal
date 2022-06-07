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

import String from "./string";

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

		let os = conn.getOutputStream();
		os.write(new String(output).getBytes());
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
