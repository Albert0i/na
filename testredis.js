const Redis = require("ioredis");

let client = new Redis("redis://:402ab5931357473b9a46917e60191464@us1-tops-teal-36334.upstash.io:36334");
client.set('name', 'alberto');