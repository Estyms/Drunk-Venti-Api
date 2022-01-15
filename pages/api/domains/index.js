import {getDomains} from "./utils";

export default async function handler(req, res) {
    const domains = await getDomains();
    if (domains) {
        res.status(200).json(Object.keys(domains));
    } else {
        res.status(404).json({message: "An error has occurred"});
    }
}