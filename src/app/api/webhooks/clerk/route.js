import { clerkClient } from "@clerk/nextjs";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const SIGNING_SICRET = process.env.SIGNING_SICRET;

  if (!SIGNING_SICRET) {
    throw new Error("Missing signing secret");
  }

  const wh = new Webhook(SIGNING_SICRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return (
      new Response("Error: Missing svix headers"),
      {
        status: 400,
      }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  // Create user in db
  if (eventType === "user.created") {
    try {
      const userData = evt.data;


      const user = {
            id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          emailAddresses: userData.email_addresses.map(
            (email) => email.email_address
          ),
          primaryEmailAddress: userData.primary_email_address_id,
          phoneNumbers: userData.phone_numbers.map(
            (phone) => phone.phone_number
          ),
          primaryPhoneNumber: userData.primary_phone_number_id,
          imageUrl: userData.image_url,
          createdAt: new Date(userData.created_at),
          updatedAt: new Date(userData.updated_at),
      }

      const newUser = await prismaClient.user.create({
        data: user,
      })

      console.log(user);

      if(newUser) {
        await clerkClient.users.updateUserMetadata(userData.id, {
            publicMetadata: {
                userId: newUser.id,
            }
        })
      }
      
      return NextResponse.json({message: "New user created", user: newUser})

    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error: User creation failed", {
        status: 500,
      });
    }
  }

  //   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  //   console.log('Webhook payload:', body)

  return new Response("Webhook received", { status: 200 });
}
