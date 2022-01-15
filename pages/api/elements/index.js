import {getElements} from "./utils.js";

export default async function handler(req, res) {
    const elements = await getElements();
    if (elements) {
        res.status(200).json(Object.keys(elements));
    } else {
        res.status(404).json({ message: 'An error occurred' });
    }
}