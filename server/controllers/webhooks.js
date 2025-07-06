import { Webhook } from 'svix'
import User from '../models/User.js'

// Api controller fn to manage clerk user with databsee
export const clerkWebhook = async (req, res) => {
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Veryfying headers
        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        })

        // Getting data from the request body
        const { data, type } = req.body

        // Handle the event based on its type
        switch (type) {
            case 'user.created':
                const userData = {
                    _id: data.id,
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + ' ' + data.lastName,
                    image: data.image_url || '',
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break
            
            case 'user.updated':
                const updatedUserData = {
                    email: data.emailAddresses[0].emailAddress,
                    name: data.firstName + ' ' + data.lastName,
                    image: data.image_url || '',
                }
                await User.findByIdAndUpdate(data.id, updatedUserData, { new: true })
                res.json({})
                break
                
            case 'user.deleted':
                const deletedUserId = data.id
                await User.findByIdAndDelete(deletedUserId)
                res.json({})
                break

            default:
                console.log(`Unhandled event type: ${type}`)
                break;
        }
        
        res.status(200).send('Webhook received and processed')
    } catch (error) {
        console.error('Error processing webhook:', error)
        // res.status(500).send('Internal Server Error')
        res.json({success: false, message: 'Error processing webhook', error: error.message})
    }
}