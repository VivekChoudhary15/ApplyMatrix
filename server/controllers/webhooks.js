// webhooks.js

import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhook = async (req, res) => {
  try {
    const payload = req.body; // The raw body is here
    const headers = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      'svix-id': headers['svix-id'],
      'svix-timestamp': headers['svix-timestamp'],
      'svix-signature': headers['svix-signature'],
    });

    const { data, type } = evt;

    // Handle the event based on its type
    switch (type) {
      case 'user.created':
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url || '',
          resume: '',
        };
        await User.create(userData);
        break;

      case 'user.updated':
        const updatedUserData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url || '',
        };
        await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
        break;

      case 'user.deleted':
        if (data.id) {
          await User.findByIdAndDelete(data.id);
        }
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    res.status(200).json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('Error processing Clerk webhook:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};