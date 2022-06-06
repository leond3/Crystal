const locations = ['crystal nucleus', "dragon's lair", 'fairy grotto', 'goblin holdout', 'goblin queen', 'jungle', 'kazad', 'lost precursor city', 'magma fields', 'mines of divan', 'mithril deposits', 'precursor remnants']


function onRenderWorld() {
	Waypoint('Sexy dude', 0.5, 100.8, 0.5, 255, 0, 0, true);
}


function onWorldLoad() {
    Scoreboard.getLines().forEach(line => {
       let  name = ChatLib.removeFormatting(line.getName()).replace(/[^A-z0-9 \:\(\)\.]/g, "")
       if (ChatLib.removeFormattingline.startsWith(" ⏣ ")) {
        this.areaFine = ChatLib.removeFormatting(line).split(" ⏣ ")[1].replace(/[^A-z0-9 \:\(\)\.\-]/g, "")
       }
    })
}


