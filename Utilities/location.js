const locations = ['crystal nucleus', "dragon's lair", 'fairy grotto', 'goblin holdout', 'goblin queen', 'jungle', 'kazad', 'lost precursor city', 'magma fields', 'mines of divan', 'mithril deposits', 'precursor remnants']
areaFine = undefined


function onRenderWorld() {
	Waypoint(areaFine, Player.getX(), Player.getY() + 2.2 ,Player.getZ(), 255, 0, 0, true);
}


function onWorldLoad() {
    Scoreboard.getLines().forEach(line => {
       if (ChatLib.removeFormatting(line).startsWith(" ⏣ ")) {
        this.areaFine = ChatLib.removeFormatting(line).split(" ⏣ ")[1].replace(/[^A-z0-9 \:\(\)\.\-]/g, "")
       }
    })
}


