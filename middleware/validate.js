function parseField(filed) {
	return filed.split(/\[|\]/).filter(s => s)
}

function getField(req, field) {
	let val = req.body
	field.forEach(props => {
		val = val[props]
	})
	return val
}

exports.required = (field) => {
	field = parseField(field)
	return (req, res, next) => {
		if (getField(req, field)) return next()
		res.error(`${field.jion(' ')} is required`)
		res.redirect('back')
	}
}

exports.lengthAbove = (field, len) => {
	field = parseField(field)
	return (req, res, next) => {
		if (getField(req, field).length > len) return next()
		res.error(`${field.jion(' ')} must have more than ${len} characters`)
		res.redirect('back')
	}
}
