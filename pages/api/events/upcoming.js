import {getEvents} from "./utils";
import {compareStartTimes, isUpcomingEvent} from "../../../utils/time";

export default async function upcomingEvents(req, res){
    const allEvents = await getEvents();
    let upcoming = allEvents.flat().map(isUpcomingEvent).filter(x=>x);
    upcoming = upcoming.sort(compareStartTimes);
    if (upcoming){
        res.status(200).json(upcoming);
    } else {
        res.status(404).json({message: "There is no upcoming event"});
    }
}