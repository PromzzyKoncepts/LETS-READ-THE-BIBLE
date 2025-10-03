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
    // const body = await req.json();
    // const { image } = body;

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

    // Load the avatar image from Cloudinary
    ///const avatarUrl = "https://res.cloudinary.com/dgbeonqpw/image/upload/v1742230506/1000679214_thowre.png";
    const avatarUrl = "https://lovetoons.org/img/LBRF-AVATAR.png";
    const avatar = await Jimp.read(avatarUrl);

    // Load the user's image from the buffer
    const userImage = await Jimp.read(userImageBuffer);

    // Resize images
    avatar.resize({ w: 550, h: 550 }); // Resize avatar
    userImage.resize({ w: 290, h: 290 }); // Resize user's image

    // Merge images (overlay user image on avatar)
    avatar.composite(userImage, 130, 160.5);

    const mergedImageBase64 = await avatar.getBase64(JimpMime.png, {
      quality: 50,
    }); // Explicitly specify MIME type

    // Upload the final merged image to Cloudinary
    const AvatarResult = await cloudinary.uploader.upload(
      mergedImageBase64, // Directly use the base64 string
      { folder: "avatar" }
    );

    const finalAvatarUrl = cloudinary.url(AvatarResult.public_id, {
      secure: true,
      transformation: [
        { flags: "attachment" }, // Add fl_attachment
      ],
    });

    // Return the Cloudinary URLs
    return new Response(
      JSON.stringify({
        // userImageUrl: userImageResult.secure_url,
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
