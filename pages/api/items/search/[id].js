import {getItems} from "../utils";
import {getClosest} from "../../../../utils/levenshtein";
import {addResultToRedis, getResultFromRedis} from "../../../../utils/redis";

export default async function itemHandler({query: {id}}, res) {

    let items = JSON.parse(await getResultFromRedis('item-all'));
    if (!items) {
        items = await getItems();
        addResultToRedis('item-all', JSON.stringify(items)).catch(console.error)
    }

    const closestItems = []
    getClosest(id, items).forEach(a => {
        closestItems.push(items[a.name])
    })

    if (closestItems) {
        res.status(200).json(closestItems);
    } else {
        res.status(404).json({message: `Item ${id} not found`});
    }
}