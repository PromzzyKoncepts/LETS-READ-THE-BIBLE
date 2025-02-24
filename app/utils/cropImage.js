function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";  // Allow cross-origin images
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
}
export default async function getCroppedImg(imageSrc, croppedAreaPixels) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match the cropped area
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    // Apply circular mask to make the image round
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(
        croppedAreaPixels.width / 2,
        croppedAreaPixels.height / 2,
        croppedAreaPixels.width / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();

    // Convert the canvas to an image blob and return it
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result); // return base64 string
        }, "image/png");
    });
}


