// import { Webhook } from 'svix'
// import User from '../models/User.js'

// // Api controller fn to manage clerk user with databsee
// export const clerkWebhook = async (req, res) => {
//     try {
//         const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         // Veryfying headers
//         await webhook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers['svix-id'],
//             "svix-timestamp": req.headers['svix-timestamp'],
//             "svix-signature": req.headers['svix-signature']
//         })

//         // Getting data from the request body
//         const { data, type } = req.body

//         // Handle the event based on its type
//         switch (type) {
//             case 'user.created':
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: `${data.first_name} ${data.last_name}`,
//                     image: data.image_url || '',
//                     resume: ''
//                 }
//                 await User.create(userData)
//                 break
            
//             case 'user.updated':
//                 const updatedUserData = {
//                     email: data.email_addresses[0].email_address,
//                     name: `${data.first_name} ${data.last_name}`,
//                     image: data.image_url || '',
//                 }
//                 await User.findByIdAndUpdate(data.id, updatedUserData, { new: true })
//                 break
                
//             case 'user.deleted':
//                 // Make sure to handle the case where data.id might be undefined
//                 if (data.id) {
//                     await User.findByIdAndDelete(data.id)
//                 }
//                 break

//             default:
//                 console.log(`Unhandled event type: ${type}`)
//         }
        
//         res.status(200).json({ success: true, message: 'Webhook received' });
//     } catch (error) {
//         console.error('Error processing Clerk webhook:', error);
//         res.status(400).json({ success: false, message: error.message });
//     }
// }
import { Webhook } from 'svix';
import User from '../models/User.js';

// Api controller fn to manage clerk user with database
export const clerkWebhook = async (req, res) => {
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying headers
        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        });

        // Getting data from the request body
        const { data, type } = req.body;

        console.log(`Received webhook of type: ${type}`);
        console.log('Webhook data:', JSON.stringify(data, null, 2));

        // Handle the event based on its type
        switch (type) {
            case 'user.created':
                {
                    let email = '';
                    if (Array.isArray(data.email_addresses) && data.email_addresses.length > 0) {
                        email = data.email_addresses[0].email_address;
                    } else {
                        console.warn('No email_addresses found for user.created event:', data);
                    }

                    const userData = {
                        _id: data.id,
                        email,
                        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                        image: data.image_url || '',
                        resume: ''
                    };

                    await User.create(userData);
                    break;
                }

            case 'user.updated':
                {
                    let email = '';
                    if (Array.isArray(data.email_addresses) && data.email_addresses.length > 0) {
                        email = data.email_addresses[0].email_address;
                    } else {
                        console.warn('No email_addresses found for user.updated event:', data);
                    }

                    const updatedUserData = {
                        email,
                        name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                        image: data.image_url || '',
                    };

                    await User.findByIdAndUpdate(data.id, updatedUserData, { new: true });
                    break;
                }

            case 'user.deleted':
                if (data.id) {
                    await User.findByIdAndDelete(data.id);
                } else {
                    console.warn('No user ID found in user.deleted event:', data);
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
