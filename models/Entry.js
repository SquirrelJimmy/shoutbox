const db = require('./db')
class Entry {
	constructor(obj) {
		if (Object.prototype.toString.call(obj) !== '[object Object]') throw new Error('constructor arguments must be a Object')
		for (const key in obj) {
			this[key] = obj[key]
		}
	}
	static getRange(from, to, cb) {
		db.lrange('entries', from, to, (err, items) => {
			if (err) return cb(err)
			const entries = []
			items.forEach(item => {
				entries.push(JSON.parse(item))
			})
			cb(null, entries)
		})
	}
	static count(cb) {
		db.llen('entries', cb)
	}
	save(cb) {
		const entryJSON = JSON.stringify(this)
		db.lpush(
			'entries',
			entryJSON,
			(err) => {
				if (err) return cb(err)
				cb()
			}
		)
	}
}
module.exports = Entry
