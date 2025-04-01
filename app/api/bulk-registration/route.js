import dbConnect from '@/app/lib/mongodb';
import User from '@/app/api/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    
    const { data } = await req.json();
    
    // Validate required headers match the User model
    const requiredFields = ['fullName', 'email'];
    const optionalFields = ['kingsChatHandle'];
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No data provided' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Check if first row has required fields
    const firstRow = data[0];
    const headers = Object.keys(firstRow);
    
    const missingFields = requiredFields.filter(field => !headers.includes(field));
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: `CSV is missing required fields: ${missingFields.join(', ')}` 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Prepare users for insertion
    const usersToInsert = data.map(row => ({
      fullName: row.fullName,
      email: row.email,
      kingsChatHandle: row.kingsChatHandle || '',
      createdAt: new Date()
    }));
    
    // Insert users into database
    const result = await User.insertMany(usersToInsert, { ordered: false });
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Bulk registration successful',
      insertedCount: result.length
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in bulk registration:', error);
    
    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Duplicate entries detected. Some users may already exist.',
        error: error.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Error processing bulk registration',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}