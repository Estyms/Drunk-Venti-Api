import {getArtifacts} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function artifactHandler({query: {id}}, res) {
    let artifact = JSON.parse(await getResultFromRedis(`artifact-${id}`))
    if (!artifact) {
        let artifacts = JSON.parse(await getResultFromRedis("artifact-all"));
        if (!artifacts){
            artifacts = await getArtifacts();
            addResultToRedis("artifact-all", JSON.stringify(artifacts)).catch(console.error);
        }
        artifact = artifacts[id];
    }

    if (artifact) {
        res.status(200).json(artifact);
        addResultToRedis(`artifact-${id}`, JSON.stringify(artifact)).catch(console.error)
    } else {
        res.status(404).json({message: `Artifact ${id} doesn't exist`})
    }
}