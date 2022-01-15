import { getWeapons } from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function handler(req, res) {

    let weapons = JSON.parse(await getResultFromRedis("weapon-all"));
    if (!weapons)
        weapons = await getWeapons();

    if (weapons) {
        res.status(200).json(Object.keys(weapons));
        addResultToRedis("weapon-all", JSON.stringify(weapons)).catch(console.error);
    } else {
        res.status(404).json({ message: 'An error has occurred' });
    }
}