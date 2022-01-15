import {compareEndTimes, isCurrentEvent} from "../../../utils/time";
import {getEvents} from "./utils";

export default async function currentEvents(req, res){
    const allEvents = await getEvents();
    let currents = allEvents.flat().map(isCurrentEvent).filter(x=>x);
    currents = currents.sort(compareEndTimes);
    if (currents) {
        res.status(200).json(currents);
    } else {
        res.status(404).json({message: "There is no event currently going"});
    }
}