import dbConnect from '@/app/lib/mongodb'; // Adjust the path as needed
import InfluencerUser from '../models/InfluencerUser';

export async function POST(req, res) {
  const { method } = req;
  const body = await req.json();

  if (method === 'POST') {
    const { email, fullName, kingsChatHandle, influencerId } = body;

    // Validate the required fields
    if (!influencerId) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Create a new user document
      const userInfluencer = new InfluencerUser({
        email,
        fullName,
        kingsChatHandle,
        influencerId, // Ensure this field is included
        createdAt: new Date(),
      });


      // Save the userInfluencer to the database
      const result = await userInfluencer.save();

      // Retrieve the saved document from the database
      const savedUser = await InfluencerUser.findById(result._id);

      return new Response(JSON.stringify({ message: 'User registered successfully!', result }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return new Response(JSON.stringify({ message: 'Something went wrong!', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}