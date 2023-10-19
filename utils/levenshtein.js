const levenshtein = require("fast-levenshtein");

export function getClosest(input, list, limit=5){
    const things = []
    for (let s in list) {
        let ns = s.replaceAll("_"," ");
        if (ns.toLowerCase().includes(input.toLowerCase())){
            things.push({name: s, dist: 0})
            continue;
        }
        things.push({name: s, dist: levenshtein.get(input, ns)})
    }
    things.sort((a,b) => a.dist - b.dist);
    return things.splice(0,limit);
}