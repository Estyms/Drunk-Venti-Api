import { getItems } from "../items/utils";

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export const weapons = {
    sword: {
        id: "sword",
        name: "Sword",
    },
    bow: {
        id: "bow",
        name: "Bow",
    },
    polearm: {
        id: "polearm",
        name: "Polearm",
    },
    claymore: {
        id: "claymore",
        name: "Claymore",
    },
    catalyst: {
        id: "catalyst",
        name: "Catalyst",
    },
};


export async function getWeapons() {

    const data = JSON.parse(await (await fetch("https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/weapons/en.json")).text());

    let func = (await (await fetch(
        "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/weaponList.js",
    )).text());
    func = func.slice(func.indexOf("export const weaponList ="));

    let weaponList = await new AsyncFunction("weapons", "itemList",
        func.replace("export const weaponList = ", "return"),
    )(weapons, await getItems());

    Object.values(weaponList).forEach(x => {
        weaponList[x.id].extras = data[x.id];
    })

    return weaponList;
}