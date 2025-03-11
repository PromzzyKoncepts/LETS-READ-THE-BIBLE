import dbConnect from '@/app/lib/mongodb'; // Adjust the path as needed
import User from '@/app/api/models/User'; // Assuming you have a User model

export  async function POST (req, res) {
  //   if (req.method === 'POST') {
  //     const { email, fullName, kingsChatHandle } = req.body;


    const {method} = req
    const body = await req.json()


    if (method === 'POST') {
      const { email, fullName, kingsChatHandle } = body;
      console.log({ email, fullName, kingsChatHandle })

      // Validate the required fields
      if (!fullName || !kingsChatHandle) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    try {
      
      // Connect to the database
      await dbConnect();
      

      // Create a new user document
      const user = new User({
        email,
        fullName,
        kingsChatHandle,
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