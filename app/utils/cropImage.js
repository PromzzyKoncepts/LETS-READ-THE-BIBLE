function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
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

  // Draw the cropped image onto the canvas (rectangle — no mask)
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

  // Convert the canvas to an image blob and return it
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    }, "image/png");
  });
}
