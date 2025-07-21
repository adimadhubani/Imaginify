import { Webhook } from 'svix';
import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/database/models/user.model';

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Verify Svix webhook
    const svix_id = req.headers.get('svix-id');
    const svix_timestamp = req.headers.get('svix-timestamp');
    const svix_signature = req.headers.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Missing Svix headers', { status: 400 });
    }

    const payload = await req.json();
    const wh = new Webhook(process.env.WEBHOOK_SECRET!);
    const evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;

    const { id, first_name, last_name, email_addresses, username, image_url } = evt.data;
    const eventType = evt.type;
    const email = email_addresses?.[0]?.email_address;

    switch (eventType) {
      case 'user.created':
        await User.create({
          clerkId: id,
          firstName: first_name,
          lastName: last_name,
          email,
          username,
          profileImage: image_url,
        });
        break;

      case 'user.updated':
        await User.findOneAndUpdate(
          { clerkId: id },
          {
            firstName: first_name,
            lastName: last_name,
            email,
            username,
            profileImage: image_url,
          },
          { new: true }
        );
        break;

      case 'user.deleted':
        await User.deleteOne({ clerkId: id });
        break;

      default:
        console.log(`Unhandled event: ${eventType}`);
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook failed', { status: 400 });
  }
}