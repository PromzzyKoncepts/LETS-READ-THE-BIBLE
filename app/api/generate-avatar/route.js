import fs from "fs";
import { Jimp } from "jimp";
import path from "path";

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
    const avatarPath = path.join(process.cwd(), "public", "images", "avatar.png");
    const avatar = await Jimp.read(avatarPath);

    let userImage = await Jimp.read(imagePath);

    avatar.resize({
      w: 550,
      h: 550
    })
    userImage.resize({
      w: 290,
      h: 290
    })


    // Merge images (overlay user image on avatar)
    avatar.composite(userImage, 130, 190.5);

    // Save output image
    const outputName = `avatar_${Date.now()}.png`;
    const outputPath = path.join(process.cwd(), "public", "images", outputName);
    // console.log(outputPath)

    // await avatar.writeAsync(outputPath)
    // ;

    avatar.write(outputPath, (err) => {
      if (err) console.error("Error saving image:", err);
    });

    // Return image URL
    return new Response(
      JSON.stringify({ imageUrl: `/images/${outputName}` }),
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
