import {getCharacters} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function characterHandler({query: {id}}, res) {
    let character = JSON.parse(await getResultFromRedis(`character-${id}`));
    if (!character) {
        let characters = JSON.parse(await getResultFromRedis(`character-all`));
        if (!characters) {
            characters = await getCharacters();
            addResultToRedis('character-all', JSON.stringify(characters)).catch(console.error);
        }
        character = characters[id];
    }

    if (character){
        res.status(200).json(character);
        addResultToRedis(`character-${id}`, JSON.stringify(character)).catch(console.error);
    } else {
        res.status(404).json({message: `Character ${id} doesn't exist`});
    }
}