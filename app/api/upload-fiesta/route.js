// app/api/upload/route.js
import { v2 as cloudinary } from 'cloudinary';
import Video from "@/app/api/models/Video";
import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { method } = req;

  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const formData = await req.formData();
  const file = formData.get('file');
  const kid_fullname = formData.get('kid_fullname');
  const parent_fullname = formData.get('parent_fullname');
  const book = formData.get('book');
  const chapter_start = formData.get('chapter_start');
  const chapter_end = formData.get('chapter_end');

  if (!file || !kid_fullname || !book || !chapter_start) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Convert the file to a buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Upload the file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: "fiesta-videos" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });
    console.log(result)
    const videoUrl = result.secure_url;

    // Connect to MongoDB
    await dbConnect();

    // Save video details to MongoDB
    const newVideo = new Video({
      kid_fullname,
      parent_fullname,
      book,
      chapter_start,
      chapter_end,
      video_url: videoUrl,
    });

    await newVideo.save();

    return NextResponse.json({ success: true, videoUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file or saving to MongoDB:", error);
    return NextResponse.json({ error: "Failed to upload file or save to MongoDB" }, { status: 500 });
  }
}