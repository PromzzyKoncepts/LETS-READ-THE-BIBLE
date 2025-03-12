import fs from "fs";
import { Jimp } from "jimp";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary

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
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Decode base64 image
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    const imageName = `${Date.now()}.png`;
    const imagePath = path.join(process.cwd(), "public", "images", imageName);

    fs.writeFileSync(imagePath, base64Data, "base64");

    // Load images
    const avatarUrl = "https://res.cloudinary.com/dgbeonqpw/image/upload/v1741774122/avatar_rpjt8r.png";
    const avatar = await Jimp.read(avatarUrl);

    let userImage = await Jimp.read(imagePath);

    avatar.resize({
      w: 550,
      h: 550
    });
    userImage.resize({
      w: 290,
      h: 290
    });

    // Merge images (overlay user image on avatar)
    avatar.composite(userImage, 130, 190.5);

    // Save output image
    const outputName = `avatar_${Date.now()}.png`;
    const outputPath = path.join(process.cwd(), "public", "images", outputName);

    // await avatar.writeAsync(outputPath);

    avatar.write(outputPath, (err) => {
      if (err) console.error("Error saving image:", err);
    });

    // Upload user's cropped image to Cloudinary
    const userImageUploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: "user_images",
    });

    // Upload final merged image to Cloudinary
    const mergedImageUploadResult = await cloudinary.uploader.upload(outputPath, {
      folder: "merged_images",
    });
    console.log(mergedImageUploadResult, "mergedImageUploadResult", userImageUploadResult, "userImageUploadResult" )

    // Return image URLs
    return new Response(
      JSON.stringify({
        userImageUrl: userImageUploadResult.secure_url,
        mergedImageUrl: mergedImageUploadResult.secure_url,
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