import {getBuilds} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function handler(req, res) {
    let builds = JSON.parse(await getResultFromRedis('build-all'));
    if (!builds) {
        builds = await getBuilds();
        addResultToRedis('build-all', JSON.stringify(builds)).catch(console.error);
    }

    if (builds){
        res.status(200).json(Object.keys(builds));
    } else {
        res.status(404).json({message: "An error has occurred"});
    }
}