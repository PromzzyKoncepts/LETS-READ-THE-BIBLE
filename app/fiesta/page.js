"use client";
import { useEffect, useState } from 'react';
import Link from "next/link"
import Image from "next/image"
import { MdEmergencyRecording } from "react-icons/md"
import { IoShareSocialSharp } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";
import Footer from "@/app/components/Footer";


const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Parse the JSON string into an object
      }
    }
  }, []);

  console.log(user);

  return (
    <div className="bg-[#d6d6cb] md:pt-24 min-h-screen">
      <div style={{ backgroundImage: `url(/images/purplebg.jpg)`, backgroundSize: "cover", backgroundPosition:"center", backgroundRepeat: "no-repeat" }} className="md:w-[85%] flex items-center object-contain justify-center flex-col md:rounded-2xl mx-auto h-36 md:h-64 text-white p-5 md:p-10">
        <div>
          {user?.fullName && (<small className="text-pinkbg text-center  md:text-left md:text-sm">Dear {user?.fullName}</small>)}
          <h1 className="m-auto text-center text-2xl md:text-5xl font-lucky ">
          Thank you  for registering!
        </h1>
          <p className="text-center font-schoolbell ">You have successfully registered for the Lovetoons Bible Reading Fiesta</p>
        </div>
      </div>

      <div className="px-5 md:px-32 pt-5 md:pt-10 md:flex flex-col md:flex-row gap-5 font-sniglet">
      <div className="">
        <h2 className="font-lucky text-3xl md:text-5xl text-darkbg">lOVETOONS BIBLE  READING FIESTA</h2>
        <h2 className="text-xl md:text-3xl font-lucky text-[#FD3006] py-1">A 24-HR BIBLE READING RENDEVOUS</h2>
        <a href="https://lovetoons.org/sponsor.php" className="md:hidden block" target="_blank"><Image src="/images/sponsor.png" alt="sponsor LBR" className="mx-auto my-2 w-full md:w-[85%]" width={1000} height={1000} /></a>
        <p><span className="text-blue-500 font-jua text-lg md:text-xl">Don't just register, take up the mantle...</span> Join millions of kids all over the world read the bible in just one day</p>
        <p>'Lovetoons Bible Reading Fiesta' is an inspiring campaign to engage children around the world to read the bible: a chapter in the New Testament thereby contributing to keeping the BIble as the number one book in the world, even among children. The Bible says "Start children off on the way they should go, and even when they are old they will not turn from it." Proverbs 22:6. This beautiful campaign gives every child an opportunity to read at least one chapter of the Bible of his/her choice, get recorded while reading, upload his/her video and share the link to other children. By reading the Bible, the kids will come to know and love the ministry of the Holy Spirit and understand the sacrificial love of our Lord Jesus Christ. Furthermore, parents can read alongside their children while recording the activity.</p>
      </div>

      <div className="w-full flex flex-col gap-3 mt-5 md:mt-0">
        <Link href="/record" className="bg-gradient-to-tr transition-all duration-200 ease-in-out from-[#0081EE] to-[#88CEDF]  px-5 w-max py-4 rounded-2xl text-slate-100 text-lg font-lucky hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 flex items-center gap-2"><MdEmergencyRecording size={30}/>Record and Read</Link>
        <Link href="/upload" className="bg-gradient-to-bl transition-all duration-200 ease-in-out  hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500  from-[#c7c7e0] to-[#8E8EB1] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky  flex items-center gap-2"><IoMdCloudUpload size={30}/>Upload my bible reading</Link>
        <Link href="/avatar" className="bg-gradient-to-bl transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700  shadow-lg shadow-gray-500 from-[#FFCDB4] to-[#ED6073] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky  flex items-center gap-2"><IoShareSocialSharp size={30} />Create fiesta avatar</Link>
        <Link href="/lbrf" className="bg-gradient-to-tr transition-all duration-200 ease-in-out  hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#EA8937] to-[#F8C254]  px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><RiLoginCircleFill size={30}/>Register a friend</Link>
      </div>
      </div>

      <a href="https://lovetoons.org/sponsor.php" className="hidden md:block" target="_blank"><Image src="/images/sponsor.png" alt="sponsor LBR" className="mx-auto pt-10 md:pt-16 w-full md:w-[85%]" width={1000} height={1000} /></a>

      <Footer />
    </div>
  );
};

export default Page;