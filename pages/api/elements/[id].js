import {getElements} from "./utils.js";


export default async function elementsHandler({ query: { id } }, res) {
    const element = await getElements();
    console.log(element, id);
    if (element[id]) {
        res.status(200).json(element[id]);
    } else {
        res.status(404).json({ message: `Element ${id} not found` });
    }
}