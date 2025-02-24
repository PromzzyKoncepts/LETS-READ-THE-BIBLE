import { Storage } from "@google-cloud/storage";

export async function POST(req, res) {
  const { method } = req;

  if (method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
  }

  let body;
  try {
    // Parse the request body as JSON
    body = await req.json(); // Await the parsing of the JSON body
    console.log("Parsed body:", body);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    // return;  
  }

  const { filename } = body; // Extract the filename from the parsed body

  if (!filename) {
    return new Response(JSON.stringify({ error: "Filename is required" }), { status: 400 });
  }

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(filename);


  const options = {
    expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    fields: { "x-goog-meta-source": "lets-read-the-bible-451415" },
  };

  try {
    const [response] = await file.generateSignedPostPolicyV4(options);
//   console.log("filename:", response);

  return new Response(JSON.stringify(response), {
    status: 200,
  });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(JSON.stringify({ error: "Failed to generate signed URL" }), { status: 500 });
  }
}