import {getCharacters} from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function handler(req, res) {
    let characters = JSON.parse(await getResultFromRedis('character-all'));
    if (!characters){
        characters = await getCharacters();
        addResultToRedis('character-all', JSON.stringify(characters)).catch(console.error)
    }
    if (characters) {
        res.status(200).json(Object.keys(characters));
    } else {
        res.status(404).json({message: "An error has occurred"});
    }
}