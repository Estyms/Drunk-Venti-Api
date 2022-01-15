const redis = require("redis");
const client = redis.createClient("redis://localhost:6379");
client.connect();


export async function getResultFromRedis(key){
    if (await client.exists(key)) {
        return await client.get(key)
    }
    return null;
}

export async function addResultToRedis(key, value){
    await client.set(key, value, {EX: 600});
}