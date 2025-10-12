// app/api/videos/filter/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import ApprovedVideo from '../../models/ApprovedVideo';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const book = searchParams.get('book');
    
    if (!book) {
      return NextResponse.json(
        { error: 'Book parameter is required' },
        { status: 400 }
      );
    }

    // Find approved videos matching the book name
    const videos = await ApprovedVideo.find({
    //   status: 'approved',
      book: { $regex: new RegExp(book, 'i') } // Case-insensitive search
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error filtering videos:', error);
    return NextResponse.json(
      { error: 'Failed to filter videos' },
      { status: 500 }
    );
  }
}