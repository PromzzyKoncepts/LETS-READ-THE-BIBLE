import fs from 'fs';
import { Jimp } from 'jimp';
import path from 'path';
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET


cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Decode base64 image
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    // Convert base64 to a buffer
    const userImageBuffer = Buffer.from(base64Data, "base64");

    // Load the avatar image from Cloudinary
    const avatarUrl = "https://res.cloudinary.com/dgbeonqpw/image/upload/v1742230506/1000679214_thowre.png";
    const avatar = await Jimp.read(avatarUrl);

    // Load the user's image from the buffer
    const userImage = await Jimp.read(userImageBuffer);

    // Resize images
    avatar.resize({w:550, h:550}); // Resize avatar
    userImage.resize({w:290, h:290}); // Resize user's image
    // userImage.quality(80); 
    
    // Merge images (overlay user image on avatar)
    avatar.composite(userImage, 130, 190.5);

    // Save the merged image to a temporary file
    const tempFilePath = path.join(process.cwd(), 'temp_merged_image.png');
    await avatar.write(tempFilePath);

    // Upload the final merged image to Cloudinary
    const AvatarResult = await cloudinary.uploader.upload(
      tempFilePath, // Upload the file instead of base64
      { folder: "avatar" }
    );

    // Delete the temporary file after upload
    fs.unlinkSync(tempFilePath);

    const finalAvatarUrl = cloudinary.url(AvatarResult.public_id, {
      secure: true,
      transformation: [
        { flags: "attachment" }, // Add fl_attachment
      ],
    });

    // Return the Cloudinary URLs
    return new Response(
      JSON.stringify({
        mergedImageUrl: finalAvatarUrl,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing image:", error);
    return new Response(
      JSON.stringify({ error: "Image processing failed", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}