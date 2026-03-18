import { Jimp, JimpMime } from "jimp";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await image.arrayBuffer();
    const userImageBuffer = Buffer.from(arrayBuffer);

    const avatarUrl = "https://lovetoons.org/img/LBRF-AVATAR.png";

    // Load both images
    const avatarFrame = await Jimp.read(avatarUrl);
    const userImage = await Jimp.read(userImageBuffer);

    // Resize frame to final output size
    avatarFrame.resize({ w: 550, h: 550 });

    // Resize user image to fit the photo slot
    userImage.resize({ w: 300, h: 350 });

    // Create blank transparent canvas
    const canvas = new Jimp({ width: 550, height: 550, color: 0x00000000 });

    // 1. User image behind
    canvas.composite(userImage, 135, 120);

    // 2. Avatar frame on top
    canvas.composite(avatarFrame, 0, 0);

    // Export as JPEG buffer (much smaller than PNG base64)
    const outputBuffer = await canvas.getBuffer(JimpMime.jpeg, { quality: 80 });

    // Upload buffer directly to Cloudinary via upload_stream
    const AvatarResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "avatar", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(outputBuffer);
    });

    const finalAvatarUrl = cloudinary.url(AvatarResult.public_id, {
      secure: true,
      transformation: [{ flags: "attachment" }],
    });

    return new Response(JSON.stringify({ mergedImageUrl: finalAvatarUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(
      JSON.stringify({
        error: "Image processing failed",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
