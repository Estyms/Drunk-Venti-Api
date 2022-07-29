import {getEvents} from "./utils";
import {flatten} from "next/dist/shared/lib/flatten";

export default async function handler(req, res) {
    const events = await getEvents();
    if (events) {
        console.log(flatten(events))
        res.status(200).json(flatten(events));
    } else {
        res.status(404).json({message: "An error has occured"});
    }
}