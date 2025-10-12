import dbConnect from '@/app/lib/mongodb'; 
import KingsChatUser from '../models/KingsChat';
import InfluencerKingsChat from '../models/InfluencerKC';

export  async function POST (req, res) {
    const {method} = req
    const body = await req.json()

    if (method === 'POST') {
      const { email, fullName, kingsChatHandle, influencer } = body;
      console.log({ email, fullName, kingsChatHandle, influencer })

      // Validate the required fields
      if (!influencer) {
        return new Response(JSON.stringify({ message: 'You are not authorised to use this route' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    try {
      
      // Connect to the database
      await dbConnect();
      

      // Create a new user document
      const user = new InfluencerKingsChat({
        email,
        fullName,
        kingsChatHandle,
        influencer,
        createdAt: new Date(),
      });

      // Save the user to the database
      const result = await user.save();

      // res.status(201).json({ message: 'User registered successfully!', result });
      return new Response(JSON.stringify({ message: 'User registered successfully!', result }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      // res.status(500).json({ message: 'Something went wrong!', error: error.message });
      return new Response(JSON.stringify({ message: 'Something went wrong!', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    // res.status(405).json({ message: 'Method not allowed' });
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}