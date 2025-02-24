'use client';

import { useState, useRef, useCallback } from 'react';
import { BiLoaderCircle, BiSolidCloudUpload } from 'react-icons/bi';
import Link from 'next/link'

const Page = () => {
  const [videoSrc, setVideoSrc] = useState('');
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['video/mp4', 'video/mov', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Only MP4, MOV, and WEBM are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setVideoSrc(e.target.result);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
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

  return (
    <div  style={{ backgroundImage: `url(/images/ava2.jpg)`, backgroundOpacity: '50', objectFit: "fill", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}  className="m-auto object-contain brightness-10  min-h-screen flex flex-col gap-2 text-center justify-center items-center bg-gradient-to-b from-amber-300 to-[#c9822c] font-sniglet pt-20">
      <h2 className="text-2xl md:text-6xl  font-lucky text-slate-900">Upload your video</h2>
        <h3 className="text-xl ">Or you can choose to <Link href="/record" className="font-bold text-darkbg">Record your video</Link></h3>

      {!videoSrc ? (
        <label
          htmlFor="fileInput"
          className={`md:mx-0 mx-auto  flex flex-col items-center justify-center w-full max-w-[50%] md:h-[500px] shadow-lg shadow-gray-800 bg-amber-200  text-center  border-2 border-dashed rounded-lg cursor-pointer ${
            dragging ? 'border-red-500 bg-amber-100' : 'border-gray-300 hover:bg-amber-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <BiSolidCloudUpload size={50} color={dragging ? '#EE9F35' : '#333'} />
          <p className="mt-4 text-2xl text-slate-800 font-bold">Select Video to Upload</p>
          <p className="mt-1.5 text-gray-800 text-[13px]">Or Drag and Drop a File</p>
          <p className="mt-12 text-gray-500 text-sm">MP4, MOV, WEBM videos only</p>
          <p className="mt-12 text-gray-500 text-sm">720x1280 resolution or higher</p>
          <p className="mt-2 text-[#FE2C55] text-[13px] font-medium">Up to 10 minutes</p>
          <p className="mt-2 text-gray-500 text-[13px]">Less than 200MB</p>
          
          <label
            htmlFor="fileInput"
            className="px-2 py-4 mt-8 text-black font-bold text-[15px] w-[80%] rounded-full colors"
          >
            Select the File
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            hidden
            accept=".mp4,.mov,.webm"
          />
        </label>
      ) : (
        <div className="md:mx-0  mx-auto flex items-center  p-3 cursor-pointer rounded-2xl relative  max- w-[40%] md:h-[30rem]">
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute z-10  rounded-xl p-[13px] w-full h-full "
            autoPlay
            loop
            controls
            muted
          ></video>
        </div>
      )}
    </div>
  );
};

export default Page;
