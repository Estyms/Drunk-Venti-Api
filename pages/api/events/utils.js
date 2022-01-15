import {isCurrentEvent} from "../../../utils/time";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export async function getEvents(){
    const allEvents = await new AsyncFunction(
        (await (await fetch(
            "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/timeline.js",
        )).text()).replace("export const eventsData = ", "return"),
    )();
    return allEvents;
}