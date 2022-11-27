const ENABLE_REDIS = process.env["ENABLE_REDIS"];
const redis = require("redis");
const client = redis.createClient({
    url: `redis://${process.env['REDIS_HOST']}:${process.env["REDIS_PORT"]}`
});
if (ENABLE_REDIS) (client.connect().then(_ =>{console.info("Connected to redis")}));


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