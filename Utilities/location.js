const locations = ['crystal nucleus', 'dragon lair', 'fairy grotto', 'goblin holdout', 'goblin queen', 'khazad dum', 'lost precursor city', 'magma fields', 'mines of divan', 'mithril deposits', 'precursor remnants'];

// Gets the lobby from the scoreboard.
// If the scoreboard is malformed get the lobby from TAB.
export function getLobby() {
    const title = ChatLib.removeFormatting(Scoreboard.getScoreboardTitle()).replace(/[^A-Z]/g, "");
    if (title.startsWith('SKYBLOCK')) {
        const text = ChatLib.removeFormatting(Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).getName());
        const lobby = text.trim().split(' ').pop().replace(/[^A-z0-9]/g, "");
        if (lobby.toLowerCase().startsWith('m')) return lobby;
        // Scoreboard is malformed, search for lobby number in TAB
        for (let name of TabList.getNames()) {
            let line = ChatLib.removeFormatting(name).trim();
            if (line.startsWith("Server:")) return line.split(' ').pop().replace('mini', 'm').replace('mega', 'M');
        }
    }
    return '';
}

// Only returns the location if it matches a location in 'locations' (= the constant defined at the top)
export function getCHLocation() {
    const location = getLocation();
    const loc = location.toLowerCase().replace("'s", "").replace("'", "");
    for (var i = 0; i < locations.length; i++) {
        if (loc.includes(locations[i])) return locations[i];
    }
    if (loc.includes('jungle') && !loc.endsWith('island')) return location;
    return '';
}

// Gets the skyblock location of the player from the scoreboard
function getLocation() {
    const title = ChatLib.removeFormatting(Scoreboard.getScoreboardTitle()).replace(/[^A-Z]/g, "");
    if (title.startsWith('SKYBLOCK')) {
        const text = ChatLib.removeFormatting(Scoreboard.getLineByIndex(Scoreboard.getLines().length - 5).getName()).trim();
        if (text.startsWith('\u23e3')) return stripSpecial(text).replace(/[-_]/g, ' ').replace(/[^A-z ']/g, '').trim();
        // Unusual scoreboard format, search all existing lines
        for (let lines of Scoreboard.getLines()) {
            let line = ChatLib.removeFormatting(lines.getName()).trim();
            if (line.startsWith('\u23e3')) return stripSpecial(line).replace(/[-_]/g, ' ').replace(/[^A-z ']/g, '').trim();
        }
    }
    return 'None';
}

function stripSpecial(arg) {
    return arg.replace(/[??-??]/g, 'A').replace(/[??-??]/g, 'a').replace(/[??-??]/g, 'E').replace(/[??-??]/g, 'e').replace(/[??-??]/g, 'I').replace(/[??-??]/g, 'i').replace(/[??-??]/g, 'O').replace(/[??-??]/g, 'o').replace(/[??-??]/g, 'U').replace(/[??-??]/g, 'u');
}
