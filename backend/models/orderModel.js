const { timeStamp } = require('console')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter customer name'],
	},
	quantity: {
		type: String,
		required: [true, 'Please enter quantity of milk required'],
	},
	type: { type: String, required: [true, 'Please enter milk type'] },
	date: { type: String, required: [true, 'Please enter date'] },
})

module.exports = mongoose.model('Order', orderSchema)
