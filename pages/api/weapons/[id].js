import { getWeapons } from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function weaponsHandler({ query: { id } }, res) {
    let weapon = JSON.parse(await getResultFromRedis(`weapon-${id}`));
    if (!weapon) {
        let weapons = JSON.parse(await getResultFromRedis("weapon-all"));
        if (!weapons){
            weapons = await getWeapons();
            addResultToRedis("weapon-all", JSON.stringify(weapons)).catch(console.error);
        }
        weapon = weapons[id];
    }

    if (weapon) {
        res.status(200).json(weapon);
        addResultToRedis(`weapon-${id}`, JSON.stringify(weapon)).catch(console.error);
    } else {
        res.status(404).json({ message: `Item ${id} not found` });
    }
}