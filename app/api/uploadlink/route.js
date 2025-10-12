// app/api/add-approved-video/route.js
import { NextResponse } from 'next/server';
import ApprovedVideo from "@/app/api/models/ApprovedVideo";
import dbConnect from "@/app/lib/mongodb";
import Video from '../models/Video';

export async function POST(req) {
  const { method } = req;

  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const {
      kid_fullname,
      parent_fullname,
      book,
      chapter_start,
      chapter_end,
      video_url
    } = await req.json();

    // Validate required fields
    if (!kid_fullname || !book || !video_url) {
      return NextResponse.json(
        { error: "Kid name, book, and video URL are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create a new approved video entry directly
    const approvedVideo = new ApprovedVideo({
      kid_fullname,
      parent_fullname: parent_fullname || "",
      book,
      chapter_start: chapter_start || 1,
      chapter_end: chapter_end || chapter_start || 1,
      video_url,
      approved: true // Mark as approved since we're adding directly
    });


    await approvedVideo.save();

    // const newVideo = new Video({
    //       kid_fullname,
    //       parent_fullname,
    //       book,
    //       chapter_start,
    //       chapter_end,
    //       video_url,
    //     });

    // await newVideo.save();
    return NextResponse.json(
      { 
        success: true, 
        message: "Approved video added successfully",
        data: approvedVideo
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding approved video:", error);
    return NextResponse.json(
      { error: "Failed to add approved video" }, 
      { status: 500 }
    );
  }
}