import { redis } from "../database/redis";

export const cached = async (key, fn) => {
    let res = await redis.get(key);
    if (res) return JSON.parse(res);
    res = await fn();
    await redis.set(key, JSON.stringify(res));
    return res;
};