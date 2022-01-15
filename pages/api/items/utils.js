const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export async function getItems() {
    return await new AsyncFunction(
        (await (await fetch(
            "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/itemList.js",
        )).text()).replace("export const itemList =", "return"),
    )();
}
