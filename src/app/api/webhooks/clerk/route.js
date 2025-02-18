import { clerkClient } from "@clerk/nextjs";
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req){
    const SIGNING_SICRET = process.env.SIGNING_SICRET

    if(!SIGNING_SICRET) {
        throw new Error('Missing signing secret')
    }

    const wh = new Webhook(SIGNING_SICRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if(!svix_id || !svix_timestamp || !svix_signature){
        return new Response("Error: Missing svix headers"), {
            status: 400,
        }
    }

    const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const { id } = evt.data
  const eventType = evt.type

  // Create user in db
  if(eventType === 'user.created'){
    console.log('userId:', evt.data.id)
  }

//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)

  return new Response('Webhook received', { status: 200 })
}