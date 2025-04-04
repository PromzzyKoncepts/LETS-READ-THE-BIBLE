// app/api/upload-fiesta/route.js
import Video from "@/app/api/models/Video";
import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Check HTTP method
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Parse the JSON body from the request
    const body = await req.json();
    
    // Validate required fields
    if (!body.video_url || !body.kid_fullname || !body.book || !body.chapter_start) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Create and save the new video document
    const newVideo = new Video({
      kid_fullname: body.kid_fullname,
      parent_fullname: body.parent_fullname || null,
      book: body.book,
      chapter_start: body.chapter_start,
      chapter_end: body.chapter_end || null,
      video_url: body.video_url,
      approved: false
    });

    await newVideo.save();

    return NextResponse.json(
      { success: true, message: "Video saved successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error saving video to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to save video data" },
      { status: 500 }
    );
  }
}