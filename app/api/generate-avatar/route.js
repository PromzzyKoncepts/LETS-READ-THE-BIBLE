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

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional: allow dynamic Y offset from request
    const offsetY = formData.get("offsetY")
      ? parseFloat(formData.get("offsetY"))
      : 130; // default value

    const arrayBuffer = await image.arrayBuffer();
    const userImageBuffer = Buffer.from(arrayBuffer);

    // Load images
    const avatarUrl = "https://lovetoons.org/img/zzf.png";
    const avatar = await Jimp.read(avatarUrl);
    const userImage = await Jimp.read(userImageBuffer);

    // Resize
    avatar.resize({ w: 550, h: 550 });
    userImage.resize({ w: 290, h: 290 });

    // Create a new canvas (same size as avatar)
    const canvas = new Jimp(550, 550, 0x00000000);

    // Place user image first (background)
    canvas.composite(userImage, 130, offsetY);

    // Place avatar on top (foreground)
    canvas.composite(avatar, 0, 0);

    // Export merged image
    const mergedImageBase64 = await canvas.getBase64(JimpMime.png, {
      quality: 50,
    });

    // Upload to Cloudinary
    const AvatarResult = await cloudinary.uploader.upload(
      mergedImageBase64, // base64 string works fine
      { folder: "avatar" }
    );

    const finalAvatarUrl = cloudinary.url(AvatarResult.public_id, {
      secure: true,
      transformation: [{ flags: "attachment" }],
    });

    // Return Cloudinary URL
    return new Response(
      JSON.stringify({
        mergedImageUrl: finalAvatarUrl,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
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
