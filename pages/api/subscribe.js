import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.length) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const DATACENTER = API_KEY.split('-')[1];

      const response = await axios.post(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          email_address: email,
          status: 'subscribed',
        },
        {
          headers: {
            Authorization: `apikey ${API_KEY}`,
          },
        }
      );

      return res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.title === "Member Exists") {
        return res.status(200).json({ message: 'Email is already subscribed' });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
