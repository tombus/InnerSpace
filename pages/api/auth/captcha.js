import fetch from "node-fetch";

const GOOGLE_RECAPTCHA_SECRET_KEY = '6LeW2psaAAAAAHVPubZHi9hKJ5nRcxLQQ0I4TtFV';
const sleep = () => new Promise((resolve) => { setTimeout(() => { resolve(); }, 500); });

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'unsupported_method' });
  if (!req.body)
    return res.status(400).json({ error: 'invalid_body' });
  try {

    const { captcha } = req.body;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      }, method: "POST",
    });
    const validation = await response.json();
    if (!validation.success)
      return res.status(400).json({ error: 'invalid_captcha' });

    await sleep();
    return res.status(200).json({ message: "OK" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
