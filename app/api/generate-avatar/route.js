import { Jimp, JimpMime } from "jimp";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    console.log(image instanceof File);

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

    // Resize the frame to final output size
    avatarFrame.resize({ w: 550, h: 550 });

    // Resize user image to fit the photo slot in the frame
    userImage.resize({ w: 350, h: 450 });

    // Create a blank canvas the same size as the frame
    const canvas = new Jimp({ width: 550, height: 550, color: 0x00000000 });

    // 1. Place user image on canvas first (behind)
    canvas.composite(userImage, 145.5, 125);

    // 2. Place avatar frame on top
    canvas.composite(avatarFrame, 0, 0);

    // Export and upload
    const mergedImageBase64 = await canvas.getBase64(JimpMime.png, {
      quality: 50,
    });

    const AvatarResult = await cloudinary.uploader.upload(mergedImageBase64, {
      folder: "avatar",
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
