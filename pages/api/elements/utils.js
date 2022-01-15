const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const elementColor = {
    anemo: 0x7fffd4,
    cryo: 0xd6fffa,
    dendro: 0x7de91c,
    electro: 0xbf00ff,
    geo: 0xffbf00,
    hydro: 0x0f5e9c,
    pyro: 0xe35822
}

export async function getElements() {
    let elements = await new AsyncFunction(
        (await (await fetch(
            "https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/elements.js",
        )).text()).replace("export const elements =", "return"),
    )();

    Object.keys(elements).forEach(k => {
        elements[k].color = elementColor[k];
    })

    return elements;
}