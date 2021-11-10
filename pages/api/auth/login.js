import { User } from '@/mongoose/models';
import jwt from 'jsonwebtoken';
const bcrypt = require('bcryptjs');

// Secret key used to sign JWT on server side.
// Should use RSA instead but a proper auth system is not priority atm.
const SECRET_KEY = `zM9h9i0dntu/mPvatkskqsyL8ChhiNPAzS0BmPvFesFK6U4aB9Os6LXCpwO6+JjHWQX+UP4U7eNBqZPC8UzGeKRhjtyNWbzsuEVVWgoUAm//L2ifbeD1Xry/nMFqnvm5al95d9isRbqvXgs8tdD90IpVZb+QKK9kHc2ZDpsj0Mg=`;

export default async function (req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'unsupported_method' });
  if (!req.body || !req.body.id)
    return res.status(400).json({ error: 'invalid_body' });
  try {
    const { id, pass } = req.body;
    const user = await User.findOne({ username: id });
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (!user)
      return res.status(400).json({ error: 'invalid_username ' });
    if (!match)
      return res.status(400).json({ error: 'invalid_password ' });
    const { _id, name, username, passwordHash, role } = user;
    const payload = { _id, name, username, passwordHash, role };
    const token = jwt.sign(payload, SECRET_KEY);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}
