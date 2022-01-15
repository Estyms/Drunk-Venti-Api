import {getArtifacts} from "../utils";
import {getClosest} from "../../../../utils/levenshtein";
import {addResultToRedis, getResultFromRedis} from "../../../../utils/redis";

export default async function artifactHandler({query: {id}}, res) {

    let artifacts = JSON.parse(await getResultFromRedis('artifact-all'));
    if (!artifacts) {
        artifacts = await getArtifacts();
        addResultToRedis('artifact-all', JSON.stringify(artifacts)).catch(console.error)
    }

    const closestArtifacts = []
    getClosest(id, artifacts).forEach(a => {
        closestArtifacts.push(artifacts[a.name])
    })

    if (closestArtifacts) {
        res.status(200).json(closestArtifacts);
    } else {
        res.status(404).json({message: `Artifact ${id} not found`});
    }
}