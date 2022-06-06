const jURL = Java.type("java.net.URL");
const jStandardCharsets = Java.type("java.nio.charset.StandardCharsets");
const jCollectors = Java.type("java.util.stream.Collectors");
const jBufferedReader = Java.type("java.io.BufferedReader");
const jInputStreamReader = Java.type("java.io.InputStreamReader");

/**
 * @copyright Taken under the 'GNU General Public License v3.0' license from https://github.com/Soopyboo32/SoopyV2/blob/master/utils/networkUtils.js
 * @author Soopyboo32
 */
export function getUrlContent(theUrl, { userAgent = "Mozilla/5.0", includeConnection = false } = {}) {
	let conn = new jURL(theUrl).openConnection();
	conn.setRequestProperty("User-Agent", userAgent);

	let stringData;

	if (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300) {
		stringData = new jBufferedReader(
			new jInputStreamReader(conn.getInputStream(), jStandardCharsets.UTF_8))
			.lines()
			.collect(jCollectors.joining("\n"));

		conn.getInputStream().close();
	} else {
		stringData = new jBufferedReader(
			new jInputStreamReader(conn.getErrorStream(), jStandardCharsets.UTF_8))
			.lines()
			.collect(jCollectors.joining("\n"));

		conn.getErrorStream().close();
	}

	return includeConnection ? { stringData, connection: conn } : stringData;
}

/**
 * @copyright Taken under the 'GNU General Public License v3.0' license from https://github.com/Soopyboo32/SoopyV2/blob/master/utils/networkUtils.js
 * @author Soopyboo32
 */
export function fetch(url, options = { userAgent: "Mozilla/5.0" }) {
	let loadedConnection = undefined;
	let loadedString = undefined;
	let loadedJSON = undefined;
	let errorData = undefined;

	let ret = {
		sync() {
			if (loadedString === undefined) {
				options.includeConnection = true;

				try {
					let data = getUrlContent(url, options)
					loadedString = data.stringData;
					loadedConnection = data.connection;
				} catch (err) {
					errorData = err;
					loadedString = null;
				}
			}

			return ret;
		},
		async(callback, _ifError = false) {
			if (!callback) {
				callback = () => {}
			}

			if (loadedString === undefined) {
				options.includeConnection = true;

				pendingRequests.push({
					callback: (data) => {
						loadedString = data.stringData;
						loadedConnection = data.connection;
						callback();
					},
					errcallback: (e) => {
						loadedString = null;
						errorData = e;
						if (_ifError) callback();
					},
					url: url,
					options: options
				})
			} else {
				callback();
			}

			return ret;
		},
		text: (callback) => {
			if (!callback) {
				ret.sync();
				return loadedString;
			}

			ret.async(() => {
				callback(loadedString);
			})

			return ret;
		},
		json: (callback) => {
			if (!callback) {
				if (loadedJSON === undefined) {
					try {
						loadedJSON = JSON.parse(ret.text());
					} catch (err) {}
				}

				return loadedJSON;
			}

			ret.text(data => {
				try {
					callback(JSON.parse(data));
				} catch (err) {}
			})

			return ret;
		},
		responseCode: (callback) => {
			if (!callback) {
				ret.sync();
				return loadedConnection?.getResponseCode() || -1;
			}

			ret.async(data => {
				callback(loadedConnection?.getResponseCode() || -1);
			})

			return ret;
		},
		error: (callback) => {
			if (!callback) {
				ret.sync();
				return errorData;
			}

			ret.async(data => {
				if (errorData) callback(errorData);
			}, true)

			return ret;
		}
	}
	return ret;
}

var pendingRequests = [];
var pendingResolves = [];
var runningThread = false;

register("tick", () => {
	try {
		while (pendingResolves.length > 0) {
			let [callback, data] = pendingResolves.shift();
			callback(data);
		}
	} catch (err) {}

	if (pendingRequests.length > 0 && !runningThread) {
		runningThread = true;
		new Thread(() => {
			while (pendingRequests.length > 0) {
				let req = pendingRequests.shift();
				try {
					let data = getUrlContent(req.url, req.options);
					pendingResolves.push([req.callback, data]);
				} catch (err) {
					pendingResolves.push([req.errcallback, err]);
				}
			}
			runningThread = false;
		}).start()
	}
})