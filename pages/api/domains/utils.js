const AsyncFunction = Object.getPrototypeOf(async function () {
}).constructor;


export async function getDomains() {
    return await new AsyncFunction(
        (await (await fetch(
            "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/domain.js",
        )).text()).replace("export const domains =", "return"),
    )();
}