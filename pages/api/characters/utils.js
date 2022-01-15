import {weapons} from "../weapons/utils";
import {getElements} from "../elements/utils";
import {getItems} from "../items/utils";
import {getBuilds} from "../builds/utils";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export async function getCharacters() {

    const builds = await getBuilds();

    let func = (await (await fetch(
        "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/characters.js",
    )).text());
    func = func.substr(func.indexOf("export const characters ="));
    const characters =  await new AsyncFunction(
        "weapons",
        "elements",
        "itemList",
        func.replace("export const characters = ", "return"),
    )(weapons, await getElements(), await getItems());

    for (let chr in characters){
        characters[chr].builds = builds[chr]['roles'];
        for (let y in characters[chr]['ascension']) {
            for (let x in characters[chr]['ascension'][y].items) {
                if (!characters[chr]['ascension'][y]["items"][x]["amount"]) {
                    delete characters[chr]['ascension'][y]["items"].splice(x, 1);
                    break;
                }
            }
        }
    }

    return characters;

}
