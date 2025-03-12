import { Jimp, JimpMime  } from "jimp";
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
    const avatarUrl = "https://res.cloudinary.com/dgbeonqpw/image/upload/v1741774122/avatar_rpjt8r.png";
    const avatar = await Jimp.read(avatarUrl);

    // Load the user's image from the buffer
    const userImage = await Jimp.read(userImageBuffer);

    // Resize images
    avatar.resize({w: 550, h:550}); // Resize avatar
    userImage.resize({w:290, h:290}); // Resize user's image

    // Merge images (overlay user image on avatar)
    avatar.composite(userImage, 130, 190.5);
    console.log(Jimp.MIME_JPEG)

    const mergedImageBase64 = await avatar.getBase64(JimpMime.png); // Explicitly specify MIME type


    // Convert the merged image to a buffer
    // const mergedImageBuffer = await avatar.getBuffer(Jimp.MIME_PNG);

    // Upload the user's cropped image to Cloudinary
    const userImageUploadResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Data}`,
      { folder: "user_images" }
    );

    // Upload the final merged image to Cloudinary
    const mergedImageUploadResult = await cloudinary.uploader.upload(
      mergedImageBase64, // Directly use the base64 string
      { folder: "merged_images" }
    );

    // Return the Cloudinary URLs
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