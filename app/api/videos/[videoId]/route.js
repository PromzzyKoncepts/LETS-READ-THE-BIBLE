import { NextResponse } from "next/server";
import Video from "@/app/api/models/Video"; // Adjust the path to your Video model
import dbConnect from "@/app/lib/mongodb"; // Adjust the path to your dbConnect function
import ApprovedVideo from "../../models/ApprovedVideo";

export async function GET(request, { params }) {
  const { videoId } = await params;
  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
  }
  try {
    await dbConnect();

    // First check the ApprovedVideo collection
    const approvedVideo = await ApprovedVideo.findById(videoId);
    if (approvedVideo) {
      return NextResponse.json(approvedVideo, { status: 200 });
    }

    // If not found in ApprovedVideo, check the Video collection
    const video = await Video.findById(videoId);
    if (video) {
      return NextResponse.json(video, { status: 200 });
    }
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}