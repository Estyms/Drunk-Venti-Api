import {getWeapons} from "../utils";
import {getClosest} from "../../../../utils/levenshtein";
import {addResultToRedis, getResultFromRedis} from "../../../../utils/redis";

export default async function weaponsHandler({query: {id}}, res) {

    let weapons = JSON.parse(await getResultFromRedis('weapon-all'));
    if (!weapons) {
        weapons = await getWeapons();
        addResultToRedis('weapon-all', JSON.stringify(weapons)).catch(console.error)
    }

    const closestWeapons = []
    getClosest(id, weapons).forEach(w => {
        closestWeapons.push(weapons[w.name])
    })

    if (closestWeapons) {
        res.status(200).json(closestWeapons);
    } else {
        res.status(404).json({message: `Weapon ${id} not found`});
    }
}