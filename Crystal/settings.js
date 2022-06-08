// https://www.chattriggers.com/modules/v/Vigilance
import { @Vigilant, @SwitchProperty } from '../../Vigilance/index';

@Vigilant("Crystal")
class Settings {
    constructor() {
        this.initialize(this);
    }

    @SwitchProperty({
        name: "Nucleus Entrance Waypoint",
        description: "Displays the nearest entrance to the Crystal Nucleus",
        category: "General",
        subcategory: "Waypoints"
    })
    NucleusWaypoint = true;

    @SwitchProperty({
        name: "Crystal Hollows Waypoints",
        description: "Displays waypoints to special locations in the Crystal Hollows",
        category: "General",
        subcategory: "Waypoints"
    })
    HollowWaypoints = true;

    @SwitchProperty({
        name: "Update Checker",
        description: "Upon startup check if the latest version is installed",
        category: "Updates",
        subcategory: "Github"
    })
    UpdateChecker = true;
}

export default new Settings();