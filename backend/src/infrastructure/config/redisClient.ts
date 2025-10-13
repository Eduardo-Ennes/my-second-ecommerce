import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://redis_MySecond_Ecommerce:6379" 
})

redisClient.on('error', (err) => console.error('Redis error:', err));

export default redisClient;