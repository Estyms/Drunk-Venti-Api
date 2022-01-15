import { getItems } from "./utils";
import {addResultToRedis, getResultFromRedis} from "../../../utils/redis";
import {getArtifacts} from "../artifacts/utils";

export default async function itemsHandler({ query: { id } }, res) {
    let item = JSON.parse(await getResultFromRedis(`item-${id}`))
    if (!item) {
        let items = JSON.parse(await getResultFromRedis("item-all"));
        if (!items){
            items = await getItems();
            addResultToRedis("item-all", JSON.stringify(items)).catch(console.error);
        }
        item = items[id]
    }
    if (item) {
        res.status(200).json(item);
        addResultToRedis(`item-${id}`, JSON.stringify(item)).catch(console.error)
    } else {
        res.status(404).json({ message: `Item ${id} not found` });
    }
}