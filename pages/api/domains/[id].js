import {getDomains} from "./utils";

export default async function domainHandler({query : {id}}, res) {
    const domains = await getDomains();
    if (domains[id]) {
        res.status(200).json(domains[id]);
    } else {
        res.status(404).json({message: `Domain ${id} doesn't exist`});
    }
}