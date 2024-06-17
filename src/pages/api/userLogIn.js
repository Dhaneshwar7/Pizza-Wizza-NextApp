import Users from '@/models/Users';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = '399i0i3kfjldjf';

export default async function handler(req, res) {
	let success = false;

	if (req.method === 'POST') {
		await db.connect();
		const { email, password } = req.body;

		try {
			const user = await Users.findOne({ email });
			if (!user) {
				res
					.status(400)
					.json({ success, error: 'Try logging in with correct Email' });
			}
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				res
					.status(400)
					.json({ success, error: 'Try logging in with correct Password' });
			}
			const data = {
				user: {
					id: user['_id'],
				},
			};
			const isAdmin = user.isAdmin;
			const authToken = jwt.sign(data, jwtSecret);
			success = true;
			await db.disconnect();
			return res.status(201).json({ success: success, authToken, isAdmin });
		} catch (error) {
			await db.disconnect();
			return res.status(500).json({ error: error.message });
		}
	}
}
