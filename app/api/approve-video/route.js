// app/api/approve-video/route.js
import { NextResponse } from 'next/server';
import Video from "@/app/api/models/Video";
import ApprovedVideo from "@/app/api/models/ApprovedVideo";
import dbConnect from "@/app/lib/mongodb";

export async function PUT(req) {
  const { method } = req;

  if (method !== "PUT") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { videoId } = await req.json();

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    // Find the video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Update the video to approved
    video.approved = true;
    await video.save();

    // Create a new approved video entry
    const approvedVideo = new ApprovedVideo({
      kid_fullname: video.kid_fullname,
      parent_fullname: video.parent_fullname,
      book: video.book,
      chapter_start: video.chapter_start,
      chapter_end: video.chapter_end,
      video_url: video.video_url,
    });

    await approvedVideo.save();

    return NextResponse.json({ success: true, message: "Video approved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error approving video:", error);
    return NextResponse.json({ error: "Failed to approve video" }, { status: 500 });
  }
}


export async function DELETE(req) {
    const { method } = req;
    console.log(method, req.json())
    if (method !== "DELETE") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  
    try {
      const { videoId } = await req.json();
  
      if (!videoId) {
        return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
      }
  
      await dbConnect();
  
      // Find the video by ID and delete it
      const deletedVideo = await Video.findByIdAndDelete(videoId);
  
      if (!deletedVideo) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Video deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting video:", error);
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
    }
  }
  