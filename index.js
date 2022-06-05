register("chat", "onMessage")
	.setCriteria("${message}");
	
function onMessage(message, event) {
	cancel(event);
//	ChatLib.chat("&7" + name + "&f: " + message);
}