// app/api/approve-video/route.js
import { NextResponse } from 'next/server';
import Video from "@/app/api/models/Video";
import ApprovedVideo from "@/app/api/models/ApprovedVideo";
import dbConnect from "@/app/lib/mongodb";


export async function DELETE(req, { params }) {
    const { method } = req;
    if (method !== "DELETE") {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  
    try {
      // const { videoId } = await req.json();
      const { videoId } = await params;
    console.log(videoId)

  
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
  