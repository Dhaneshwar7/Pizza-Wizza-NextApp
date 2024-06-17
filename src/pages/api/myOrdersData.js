import Orders from '@/models/Orders';
import db from '@/utils/db';

export default async function handler(req, res) {
	try {
		if (req.method === 'POST') {
			await db.connect();
			const data = await Orders.findOne({ email: req.body.email });
			await res.json({ order_data: data });
		}
	} catch (error) {
		res.send('Server error: ' + error.message);
	}
	await db.disconnect();
}
