import {getArtifacts} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function handler(req, res) {
    let t0 = performance.now()

    let artifacts = JSON.parse(await getResultFromRedis(`artifact-all`))
    if (!artifacts) {
        artifacts = await getArtifacts();
    }

    if (artifacts) {
        res.status(200).json(Object.keys(artifacts));
        addResultToRedis(`artifact-all`, JSON.stringify(artifacts)).catch(console.error)
    } else {
        res.status(404).json({message: "An error has occurred"})
    }

    let t1 = performance.now();
    console.debug(`Execution took ${t1-t0} ms`)
}