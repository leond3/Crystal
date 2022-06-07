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

const locations = ['crystal nucleus', 'dragon lair', 'fairy grotto', 'goblin holdout', 'goblin queen', 'khazad dum', 'lost precursor city', 'magma fields', 'mines of divan', 'mithril deposits', 'precursor remnants'];

export function getLobby() {
    const title = ChatLib.removeFormatting(Scoreboard.getScoreboardTitle()).replace(/[^A-Z]/g, "");
    if (title.startsWith('SKYBLOCK')) {
        const text = ChatLib.removeFormatting(Scoreboard.getLineByIndex(Scoreboard.getLines().length - 1).getName());
        const lobby = text.trim().split(' ').pop().replace(/[^A-z0-9]/g, "");
        if (lobby.toLowerCase().startsWith('m')) return lobby;
    }
    return '';
}

export function getCHLocation() {
    const location = getLocation();
    const loc = location.toLowerCase().replace("'s", "").replace("'", "");
    for (var i = 0; i < locations.length; i++) {
        if (loc.includes(locations[i])) return locations[i];
    }
    if (loc.includes('jungle') && !loc.endsWith('island')) return location;
    return '';
}

function getLocation() {
    const title = ChatLib.removeFormatting(Scoreboard.getScoreboardTitle()).replace(/[^A-Z]/g, "");
    if (title.startsWith('SKYBLOCK')) {
        const text = ChatLib.removeFormatting(Scoreboard.getLineByIndex(Scoreboard.getLines().length - 5).getName());
        return stripSpecial(text).replace(/[-_]/g, ' ').replace(/[^A-z ']/g, '').trim();
    }
    return 'None';
}

function stripSpecial(arg) {
    return arg.replace(/[À-Ä]/g, 'A').replace(/[à-ä]/g, 'a').replace(/[È-Ë]/g, 'E').replace(/[è-ë]/g, 'e').replace(/[Ì-Ï]/g, 'I').replace(/[ì-ï]/g, 'i').replace(/[Ò-Ö]/g, 'O').replace(/[ò-ö]/g, 'o').replace(/[Ù-Ü]/g, 'U').replace(/[ù-ü]/g, 'u');
}
