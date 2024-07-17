import PizzaData from '@/models/PizzaData';
import db from '@/utils/db';

export default async function handler(req, res) {
	await db.connect();

	try {
		if (req.method === 'POST') {
			for (let i = 0; i < req.body.length; i++) {
				let pizzas = new PizzaData({
					name: req.body[i].name,
					category: req.body[i].category,
					foodType: req.body[i].foodType,
					price: req.body[i].price,
					description: req.body[i].description,
					img: req.body[i].img,
				});
				await pizzas.save();
			}
			res.status(200).json({ dataResponse: 'All exported in mongoData' });
		} else if (req.method === 'GET') {
			const data = await PizzaData.find();
			res.status(200).json({ data });
		} else {
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		console.error('Error in API handler:', error.message);
		res.status(500).json({ message: 'Internal server error' });
	} finally {
		await db.disconnect();
	}
}
