import Redis from "ioredis"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

async function test() {
    try {
        console.log("Connecting...")
        await redis.set("test_key", "hello")
        const val = await redis.get("test_key")
        console.log("Value:", val)
        redis.disconnect()
    } catch (e) {
        console.error("Error:", e)
    }
}

test()
