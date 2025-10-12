import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Video from '@/app/api/models/Video';
import ApprovedVideo from '../../models/ApprovedVideo';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const book = searchParams.get('book');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 12;

    if (!book) {
      return NextResponse.json(
        { error: 'Book parameter is required' },
        { status: 400 }
      );
    }

    // Fetch approved videos matching the book
    const videos = await ApprovedVideo.find({
    //   status: 'approved',
      book: { $regex: new RegExp(book, 'i') }
    })
      .skip((page - 1) * limit)
      .limit(limit);

      console.log(videos)

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos by book:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}