const AsyncFunction = Object.getPrototypeOf(async function () {
}).constructor;

export async function getBuilds() {
    let builds = await new AsyncFunction(
        (await (await fetch(
            "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/build.js",
        )).text()).replace("export const builds =", "return"),
    )();

    Object.values(builds).forEach(b => {
        let d = [];
        for (let c in b["roles"]) {
            b["roles"][c]["name"] = c;
            d.push(b["roles"][c]);
        }
        b["roles"] = d;
    })

    return builds;
}