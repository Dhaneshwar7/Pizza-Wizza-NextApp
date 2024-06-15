import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = '399i0i3kfjldjf';
export default async function handler(req, res) {
	let success = false;
	const salt = await bcrypt.genSalt(10);
	let securePass = await bcrypt.hash(req.body.password, salt);

	if (req.method === 'POST') {
		await db.connect();
		try {
			const user = await Users.create({
				name: req.body.name,
				email: req.body.email,
				password: securePass,
				location: req.body.location,
			});
			const data = {
				user: {
					id: user['_id'],
				},
			};
			const authToken = jwt.sign(data, jwtSecret);
			success = true;
			await db.disconnect();
			return res.status(201).json({ success: success, authToken });
		} catch (error) {
			await db.disconnect();
			return res.status(500).json({ error: error.message });
		}
	}
}
