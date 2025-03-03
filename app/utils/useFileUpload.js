import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = process.env.BASE_URL
export function useFileUpload() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [uploaded, setUploaded] = useState(false);
  const [ffmpeg, setFFmpeg] = useState(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      // Dynamically import ffmpeg.wasm only on the client side
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const ffmpegInstance = new FFmpeg({ log: true });

      if (!ffmpegInstance.loaded) {
        await ffmpegInstance.load();
        setIsFFmpegLoaded(true);
        setFFmpeg(ffmpegInstance);
      }
    };

    loadFFmpeg();
  }, []);

  const uploadFile = async (filename, file) => {
    // console.log(filename, 'filename from hook')
    // if (!isFFmpegLoaded) {
    //   console.error("FFmpeg is not loaded yet");
    //   return false;
    // }

    // Convert file to FFmpeg format
    // const newFileName = filename.file.name.replace(/\s/g, "_"); // Ensure no spaces in filename
    //  await ffmpeg.writeFile( newFileName, await fetchFile(filename.file));

    // await ffmpeg.exec(
    //   "-i", filename.file, // Input file
    //   "-vf", "scale=1280:720", // Resize to 720p
    //   "-c:v", "libx264", // Use libx264 codec for video
    //   "-b:v", "1000k", // Set video bitrate to 1000 kbps
    //   "-crf", "23", // Set Constant Rate Factor for quality
    //   "-preset", "fast", // Use fast preset for encoding
    //   "-c:a", "aac", // Use AAC codec for audio
    //   "-b:a", "128k", // Set audio bitrate to 128 kbps
    //   "output.mp4" // Output file
    // );
    // Get the processed file from FFmpeg
    // const compressedData = ffmpeg.readFile("output.mp4");
    // const compressedBlob = new Blob([compressedData.buffer], { type: "video/mp4" });


    // Send a POST request to the API with the filename in the body
    const result = await axios.post(`${baseUrl}/api/upload`, filename);

    // Parse the response to get the signe d URL and fields
    const { url, fields } = result.data;



    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // ✅ Convert Blob to File before appending
    // const compressedFile = new File([compressedBlob], newFileName, { type: "video/mp4" });

    // ✅ Append file properly
    formData.append("file", filename.file);

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    };

    const upload = await axios.post(url, formData, config);
    // if(upload.status === 200) {
    //   setUploaded(true)
    // } else{setUploaded(false)}
    console.log(upload)

    return upload.status === 204;
  };

  return { uploadFile, uploadProgress };
}