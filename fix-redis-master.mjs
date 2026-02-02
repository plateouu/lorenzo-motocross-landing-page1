
import Redis from "ioredis"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

async function main() {
    console.log("Removing taylor1# from used_keys...")
    await redis.srem("used_keys", "taylor1#")
    
    // Also ensuring it's not in revoked
    await redis.srem("revoked_keys", "taylor1#")

    console.log("Done.")
    redis.disconnect()
}

main()
