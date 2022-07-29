const ENABLE_REDIS = true;
const redis = require("redis");
const client = ENABLE_REDIS ? redis.createClient("redis://localhost:6379") : null;
client?.connect();


export async function getResultFromRedis(key){
    if (ENABLE_REDIS)
        if (await client.exists(key)) {
            return await client.get(key)
        }
    return null;
}

export async function addResultToRedis(key, value){
    if (ENABLE_REDIS) await client.set(key, value, {EX: 600});
}