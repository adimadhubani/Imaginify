import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser,updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to your .env file')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  // Get the event type
  const eventType = evt.type

  try {


     switch (eventType) {
      case 'user.created':
      case 'user.updated': {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

        // Create user in your database
        const user = {
          clerkId: id,
          email: email_addresses[0].email_address,
          firstName: first_name || '',
          lastName: last_name || '',
          username: username || '',
          photo: image_url || '',
        }

        await createUser(user)

        // Update public metadata if user was created
        if (eventType === 'user.created') {
          (await clerkClient()).users.updateUserMetadata(id, {
            publicMetadata: {
              onboarded: false
            }
          })
        }

        break
      }
      case 'user.deleted': {
        const { id } = evt.data
        if (id) {
          await deleteUser(id)
        }
        break
      }
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }
   

  

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
  } catch (error) {
    console.error(`Error handling webhook: ${error}`)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}






 // switch (eventType) {
    //   case 'user.created':
    //   case 'user.updated': {
    //     const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

    //     // Create user in your database
    //     const user = {
    //       clerkId: id,
    //       email: email_addresses[0].email_address,
    //       firstName: first_name || '',
    //       lastName: last_name || '',
    //       username: username || '',
    //       photo: image_url || '',
    //     }

    //     await createUser(user)

    //     // Update public metadata if user was created
    //     if (eventType === 'user.created') {
    //       (await clerkClient()).users.updateUserMetadata(id, {
    //         publicMetadata: {
    //           onboarded: false
    //         }
    //       })
    //     }

    //     break
    //   }
    //   case 'user.deleted': {
    //     const { id } = evt.data
    //     if (id) {
    //       await deleteUser(id)
    //     }
    //     break
    //   }
    //   default:
    //     console.log(`Unhandled event type: ${eventType}`)
    // }