import { getItems } from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";

export default async function handler(req, res) {
    let items = JSON.parse(await getResultFromRedis('item-all'))
    if (!items) {
        items = await getItems();
    }

    if (items) {
        res.status(200).json(Object.keys(items));
        addResultToRedis('item-all', JSON.stringify(items)).catch(console.error)
    } else {
        res.status(404).json({ message: 'An error occurred' });
    }
}