import {getEvents} from "./utils";
import {flatten} from "lodash";

export default async function handler(req, res) {
    const events = await getEvents();
    if (events) {
        res.status(200).json(flatten(events));
    } else {
        res.status(404).json({message: "An error has occured"});
    }
}