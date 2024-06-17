import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		order_data: { type: Array, required: true },
	},

	{ timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);

export default Orders;
