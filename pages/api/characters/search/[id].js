import {getCharacters} from "../utils";
import {getClosest} from "../../../../utils/levenshtein";
import {addResultToRedis, getResultFromRedis} from "../../../../utils/redis";

export default async function artifactHandler({query: {id}}, res) {

    let characters = JSON.parse(await getResultFromRedis('character-all'));
    if (!characters) {
        characters = await getCharacters();
        addResultToRedis('character-all', JSON.stringify(characters)).catch(console.error)
    }

    const closestCharacters = []
    getClosest(id, characters).forEach(a => {
        closestCharacters.push(characters[a.name])
    })

    if (closestCharacters) {
        res.status(200).json(closestCharacters);
    } else {
        res.status(404).json({message: `Character ${id} not found`});
    }
}