import {getBuilds} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function buildHandler({query: {id}}, res) {
    let build = JSON.parse(await getResultFromRedis(`build-${id}`));
    if (!build) {
        let builds = JSON.parse(await getResultFromRedis('build-all'));
        if (!builds){
            builds = await getBuilds();
            addResultToRedis('build-all', JSON.stringify(builds)).catch(console.error);
        }
        build = builds[id];
    }

    if (build) {
        res.status(200).json(build);
        addResultToRedis(`build-${id}`, JSON.stringify(build)).catch(console.error);
    } else {
        res.status(404).json({message : `Build for ${id} not found`});
    }
}