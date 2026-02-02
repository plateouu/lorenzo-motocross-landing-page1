
import Redis from "ioredis"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

async function main() {
    console.log("--- DEEP REDIS SCAN ---")
    
    // 1. List ALL keys in the database
    const allKeys = await redis.keys("*")
    console.log(`Found ${allKeys.length} keys in database:`)
    console.log(allKeys)

    // 2. For each key, dump its type and content
    for (const key of allKeys) {
        const type = await redis.type(key)
        console.log(`\nKey: [${key}] Type: [${type}]`)
        
        if (type === 'set') {
            const members = await redis.smembers(key)
            console.log("Members:", members)
        } else if (type === 'string') {
            const val = await redis.get(key)
            console.log("Value:", val)
        } else {
            console.log("(Complex type, skipping detail)")
        }
    }

    redis.disconnect()
}

main()
