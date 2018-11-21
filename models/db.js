const redis = require('redis');

// 创建redis客户端实例
const db = redis.createClient({
	host: process.env.REDIS_HOST || '127.0.0.1'
});

db.on('connect', () => {
	console.log('Redis is connected !');
})
db.on('ready', () => {
	console.log('Redis is ready !');
})
db.on('reconnecting', () => {
	console.log('Redis is reconnecting...');
})
db.on('error', (err) => {
	console.error(err);
})
db.on('end', () => {
	console.log('Redis connect has end !');
})

module.exports = db
