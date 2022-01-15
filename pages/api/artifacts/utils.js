export async function getArtifacts(){
    const res = await fetch("https://raw.githubusercontent.com/MadeBaruna/paimon-moe/main/src/data/artifacts/en.json");
    const artifacts = JSON.parse(await res.text());
    return artifacts;
}