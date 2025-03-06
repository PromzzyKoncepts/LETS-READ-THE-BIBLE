// app/api/upload/route.js
import { Storage } from "@google-cloud/storage";
import Video from "@/app/api/models/Video";
import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from 'next/server';

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

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const filename = `${book}_${chapter_start}_${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const blob = bucket.file(filename);

  try {
    // Read the file as an ArrayBuffer
    // const fileBuffer = await file.arrayBuffer();
    // const buffer = Buffer.from(fileBuffer);

    // // Upload the file to Google Cloud Storage
    // await blob.save(buffer, {
    //   metadata: {
    //     contentType: file.type, // Set the content type of the file
    //   },
    // });

    const expires = Date.now() + 60 * 60 * 1000; //  10 minutes
    const options = {
      expires,
      fields: {'x-goog-meta-test': 'data'},
    };


    // Get a v4 signed policy for uploading file
    const [response] = await blob.generateSignedPostPolicyV4(options);
    console.log(response)

    const { url, fields } = await response;
    const videoformData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      videoformData.append(key, value );
    });
    const upload = await fetch(url, {
      method: "POST",
      body: videoformData,
    });
    console.log(upload)

    const videoUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filename}`;

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