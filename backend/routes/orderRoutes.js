const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')

router.get(
	'/:date',
	asyncHandler(async (req, res) => {
		const orders = await Order.find({
			date: req.params.date,
		})

		res.status(200).json({ orders })
	}),
)

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const orders = await Order.find()
		res.status(200).json({ orders })
	}),
)

router.post(
	'/',
	asyncHandler(async (req, res) => {
		if (
			!req.body.name ||
			!req.body.quantity ||
			!req.body.type ||
			!req.body.date
		) {
			res.status(400)
			throw new Error('Please add all fields')
		}

		const order = await Order.create({
			name: req.body.name,
			quantity: req.body.quantity,
			type: req.body.type,
			date: req.body.date,
		})

		res.status(201).json(order)
	}),
)

router.put(
	'/:id',
	asyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (!order) {
			res.status(400)
			throw new Error('Order not found')
		}

		const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		res.status(200).json(updatedOrder)
	}),
)

router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const order = await Order.findById(req.params.id)
		if (!order) {
			res.status(400)
			throw new Error('Order not found')
		}

		await order.remove()
		res.status(200).json({ id: req.params.id })
	}),
)

module.exports = router
