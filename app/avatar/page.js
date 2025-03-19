"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/app/utils/cropImage"; // Helper function to crop the image
import { FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon } from "react-share";
import toast, { Toaster } from "react-hot-toast";
import { CldImage } from 'next-cloudinary';

// const baseUrl = "https://letsreadthebible.club"
const baseUrl = "https://lets-read-the-bible.vercel.app"

export default function AvatarUploader() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [dragging, setDragging] = useState(false);
  const[loading, setLoading] = useState(false)

  // console.log(`${baseUrl}/api/generate-avatar`)

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedImg = await getCroppedImg(image, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!croppedImage) return;

    try {
      setLoading(true)
      const response = await axios.post(`${baseUrl}/api/generate-avatar`, { image: croppedImage });


      if (response?.data?.mergedImageUrl) {
        setLoading(false)
        toast.success("Your avatar has been created!")
        setAvatarUrl(response.data.mergedImageUrl);
      }
    } catch (error) {
      setLoading(false)
      toast.error("Avatar creation failed, try Again")
      console.error("Error uploading image:", error);
    }
  };



  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      console.log('Invalid file type. Only PNG, JPG, and JPEG images are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setImage(e.target.result);

    };
    reader.readAsDataURL(file);

  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const clearImage = () => {
    setImage(null)
    setCroppedImage(null)

  }

  

  return (
    <div style={{ backgroundImage: `url(/images/ava.jpg)`, backgroundOpacity: '50', objectFit: "fill", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="text-center w-full min-h-screen object-contain font-sniglet  md:pt-28 bg-[#D9E6F3] bg-opacity-50  md:px-28">
      <Toaster position="top-right" />
      
      <h2 className="text-2xl md:text-4xl font-medium font-lucky bg-white md:bg-transparent bg-opacity-60 backdrop-blur-sm md:backdrop-blur-none w-full md:w-auto md:py-0 py-5">Upload your best picture to Create an Avatar</h2>
      <div className={` mt-5 md:px-0  ${!image ? "flex items-center justify-center" : ""}`}> {image == null ? (
        <label
          htmlFor="fileInput"
          className={`md:mx-0 mx-auto   flex flex-col items-center justify-center w-[80%] md:max-w-[50%] h-[50vh] md:h-[500px] shadow-lg  bg-white bg-opacity-90  text-center p-5 border-2 border-dashed border-slate-500 rounded-lg cursor-pointer ${dragging ? 'border-red-500 colors' : 'border-gray-300 hover:bg-slate-100'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Image src="/images/upload.png" width={200} height={200} alt="upload" className="md:w-32 w-20" />

          <label
            htmlFor="fileInput"
            className="px-1 md:px-2 py-1.5 md:py-3 mt-8 text-black font-bold text-[15px] w-[80%] rounded-full colors"
          >
            Select picture
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            hidden
            accept=".jpg, .jpeg, .png" // Ensure correct file types
          />
        </label>)
        : (
          <div className="grid md:grid-cols-2 justify-between place-items-between items-start gap-8 pb-16 px-5 md:px-0 md:pb-0 md:gap-10">
            <div className="flex flex-col items-center w-full">
              <div className={`relative w-full h-[300px] md:max-w-[100%] md:h-[500px] ${croppedImage ? "opacity-60" : "opacity-100"} rounded-xl`}>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // Makes it a square crop
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  className="rounded-xl "
                />
                <button onClick={clearImage} className="absolute right-4 top-4 bg-red-500 font-sniglet  text-white p-3 rounded-2xl "><FaTrash /></button>
              </div>
              <button onClick={handleCrop} className="bg-orange-800  px-5 py-2 rounded-xl text-white mt-2">
                {!croppedImage ? "Crop Image" : "Cropped!"}
              </button>
            </div>
            {!croppedImage ? (
              <div className="flex items-center flex-col gap-5 brightness-50">
                <h3 className="text-xl font-lucky bg-pink-600 text-white px-5 rounded-xl py-1.5">Preview Image</h3>
                <Image src="/images/profile.png" alt="Cropped Avatar" width={300} height={300} className="w-[27rem]" />
              </div>
            ) : (
              <div className="flex items-center flex-col gap-5">
                <h3 className="text-xl font-lucky bg-pink-600 text-white px-5 rounded-xl py-1.5">Preview Image</h3>
                <Image src={croppedImage} alt="Cropped Avatar" width={300} height={300} className="w-[27rem] border-4 border-white rounded-full shadow-lg" />

                {croppedImage && image && (
                  <button onClick={handleSubmit} className={`bg-green-800 ${!avatarUrl && "animate-bounce hover:animate-none"} px-5 py-2 rounded-xl text-white`}>
                   {loading ?  "Generating... please wait" : "Generate Avatar"}
                  </button>)}
              </div>
            )}
          </div>
        )
      }
      </div>


      {avatarUrl && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm cursor-pointer z-50"
    onClick={() => setAvatarUrl("")} // Clicking overlay closes modal
    >
    <div
      className=" cursor-auto relative flex items-center flex-col gap-10 w-fit text-center"
      onClick={(e) => e.stopPropagation()}
      >
      <div className="absolute right-2 top-2 cursor-pointer  rounded-full"
      onClick={() => setAvatarUrl("")} // Clicking overlay closes modal
      >
        
      <MdCancel size={30} color="#ef4444"/>
      </div>
      {/* Display the generated avatar */}
      <Image
        src={avatarUrl}
        alt="Generated Avatar"
        width={300}
        height={300}
        className="mx-auto w-[30rem]"
      />
      
      <div className="flex justify-center gap-4">
      <a
        href={avatarUrl}
        className="bg-[#734907] animate-pulse hover:animate-none px-5 py-2.5 rounded-xl text-white "
        download="avatar.png"
      >
        DOWNLOAD AVATAR
      </a>

      <div className="flex justify-center gap-1">
      <a target='_blank' href={'https://kingschat.online'}>
						<Image src="/images/kingschat.webp" alt="Share" width={500} className='w-10' height={500} />
					</a>
        <WhatsappShareButton url={avatarUrl} title={"Join in the Read the Bible Campaign"}>
          <WhatsappIcon size={40} round={true}  />
        </WhatsappShareButton>

        <TelegramShareButton>
          <TelegramIcon  size={40} round={true}/>
        </TelegramShareButton>
      </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
