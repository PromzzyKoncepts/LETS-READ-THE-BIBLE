import { Storage } from "@google-cloud/storage";

export async function GET(req, res) {
    const { method } = req;
    // console.log(method,"eofihwdjfbsf" )
    if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
}

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Handle newlines in private key
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME);

  try {
    // List all files in the bucket
    const [files] = await bucket.getFiles();
    
    // Filter for video files (e.g., files with .mp4 extension)
    // const videoFiles = files.filter((file) => file.name.endsWith(".mp4"));
    // Generate signed URLs for each video file
    const videos = files.map((file) => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        return {
          name: file.name,
          url: publicUrl,
        };
      });

    return new Response(JSON.stringify(videos), {
        status: 200,
      });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch videos" }), { status: 500 });
  }
}