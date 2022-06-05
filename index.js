register("renderWorld", onRender);

function onRender(partial) {
	// Tessellator.drawString("Sexy dude", Player.getRenderX(), Player.getRenderY() + 2.2, Player.getRenderZ(), 16711680);
	const dist = distanceTo(-52, 102, -46);
	const scale = dist > 9 ? 1 : 10 / (dist + 1);
	Tessellator.drawString("Sexy dude", -52, 102, -46, 16711680, true, scale);
}

function distanceTo(x, y, z) {
	return Math.sqrt(Math.pow(x - Player.getRenderX(), 2) + Math.pow(y - Player.getRenderY(), 2) + Math.pow(z - Player.getRenderZ(), 2));
}

// function distanceTo(x, y, z, X, Y, Z) {
// 	return Math.sqrt(Math.pow(x - X, 2) + Math.pow(y - Y, 2) + Math.pow(z - Z, 2));
// }