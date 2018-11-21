const bcrypt = require('bcrypt/bcrypt.js')
const db = require('./db')

class User {
	constructor(obj) {

		// Object.create(null)创建足够纯净的对象
		if (Object.prototype.toString.call(obj) !== '[object Object]') obj = Object.create(null) // throw new Error('constructor arguments must be a Object')
		for (const key in obj) {
			this[key] = obj[key]
		}
	}
	static getByName(name, cb) {
		User.getId(name, (err, id) => {
			if (err) return cb(err)
			User.get(id, cb)
		})
	}
	static getId(name, cb) {
		db.get(`user:id:${name}`, cb)
	}
	static get(id, cb) {
		db.hgetall(`user:${id}`, (err, user) => {
			if (err) return cb(err)
			cb(null, new User(user))
		})
	}
	static authenticate(name, pass, cb) {
		User.getByName(name, (err, user) => {
			if (err) return cb(err)
			if (!user.id) return cb(null, `没有找到用户: ${name}`)
			bcrypt.hash(pass, user.salt, (err, hash) => {
				if (err) return cb(err)
				if (hash === user.pass) return cb(null, user)
				cb()
			})
		})
	}

	// 如果有.toJSON，JSON.stringify 就会用它返回的 JSON 数据
	toJSON() {
		return {
			id: this.id,
			name: this.name
		};
	}
	update(cb) {
		const id = this.id
		db.set(`user:id:${this.name}`, id, (err) => {
			if (err) return cb(err)
			db.hmset(`user:${this.id}`, this, err => cb(err))
		})
	}
	save(cb) {
		if (this.id) {
			this.update(cb)
		} else {
			db.incr('user:ids', (err, id) => {
				if (err) return cb(err)
				this.id = id
				this.hashPassword(err => {
					if (err) return cb(err)
					this.update(cb)
				})
			})
		}
	}
	hashPassword(cb) {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) return cb(err)
			this.salt = salt
			bcrypt.hash(
				this.pass,
				salt,
				(err, hash) => {
					if (err) return cb(err)
					this.pass = hash
					cb()
				}
			)
		})
	}
}

module.exports = User
