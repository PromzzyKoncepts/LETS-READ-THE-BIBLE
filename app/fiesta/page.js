"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { MdEmergencyRecording } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import { RiLoginCircleFill } from "react-icons/ri";
import Footer from "@/app/components/Footer";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Swiper from '../components/Swiper';
import { IoMdCloudDownload } from "react-icons/io";

const Page = () => {
  const [user, setUser] = useState(null);
  const [viewAvatar, setViewAvatar] = useState(false);
  const card = [
    {
      title: "fiesta 4",
      src: "/images/LBRF_4_0.png"
    },
    {
      title: "fiesta 1",
      src: "/images/LBRF_3yy.png"
    },
    {
      title: "fiesta 3",
      src: "/images/LBRF_3_1.png"
    },
    {
      title: "fiesta 2",
      src: "/images/LBRF_3_0.png"
    },

  ]

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    setIsDownloading(true);

    const zip = new JSZip();
    const imgFolder = zip.folder('cards'); // Create a folder for the images

    try {
      // Fetch each image, convert it to a blob, and add it to the zip file
      for (const item of card) {
        const response = await fetch(item.src);
        const blob = await response.blob();
        imgFolder.file(`${item.title}.png`, blob, { binary: true });
      }

      // Generate the zip file and trigger the download
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'fiesta-cards.zip');
    } catch (error) {
      console.error('Error downloading images:', error);
    } finally {
      setIsDownloading(false);
    }
  };


  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      // Check if the user data exists in local storage
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Parse the JSON string into an object
      }

      // Check if the popup has already been shown using session storage
      const hasPopupBeenShown = sessionStorage.getItem('hasPopupBeenShown');
      if (!hasPopupBeenShown) {
        setViewAvatar(true); // Show the popup
        sessionStorage.setItem('hasPopupBeenShown', 'true'); // Mark the popup as shown
      }
    }
  }, []);

  return (
    <div className="bg-[#d6d6cb] md:pt-24 min-h-screen">
      {viewAvatar && user && (
        <div className="font-sniglet z-[99] fixed top-0 h-screen w-full bg-darkbg bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg py-7 px-4 md:px-10 flex items-center gap-2 flex-col">
            <h2 className="text-2xl text-center md:text-4xl font-lucky text-[#d1942b]">Congratulations</h2>
            <p>You successfully registered.</p>
            <p className="text-lg">Next, we recommend you to create your Bible Fiesta Avatar</p>
            <div className="flex items-center gap-2 mt-3">
              <button onClick={() => setViewAvatar(false)} className="border-2 border-darkbg rounded-full px-4 py-2">I have created mine</button>
              <Link href="/avatar" className="bg-darkbg rounded-full text-white px-4 py-2 hover:border-2 hover:border-white shadow-lg">Create my avatar</Link>
            </div>
          </div>
        </div>
      )}
      <div style={{ backgroundImage: `url(/images/top.png)`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} className="md:w-[85%] flex items-center object-contain justify-center flex-col md:rounded-2xl mx-auto h-36 md:h-64 text-white p-5 md:p-10">
        {user ? (<div>
          {user?.fullName && (<small className="text-darkbg text-center md:text-left md:text-xl">Dearly Esteemed {user?.fullName}</small>)}
          <h1 className="m-auto text-center text-2xl md:text-5xl font-lucky">Thank you for registering!</h1>
          <p className="text-center font-schoolbell">You have successfully registered for the Lovetoons Bible Reading Fiesta</p>
        </div>)
        :
        (<div>
          
          <h1 className="m-auto text-center text-2xl md:text-5xl font-lucky">Kindly register to participate</h1>
          <p className="text-center font-sniglet"><Link className="underline" href="/lbrf">Click here to register </Link>for the Lovetoons Bible Reading Fiesta</p>
        </div>)
        }
      </div>

      <div className="px-5 md:px-32 pt-5 md:pt-10  md:grid grid-cols-3 flex-col md:flex-row gap-4 md:gap-10 font-sniglet">
        <div className="col-span-2">
          <h2 className="font-lucky text-3xl md:text-5xl text-darkbg">LOVETOONS BIBLE READING FIESTA</h2>
          <h2 className="text-xl md:text-3xl font-lucky text-[#FD3006] py-1">A 24-HR BIBLE READING RENDEVOUS</h2>

          <div className="block md:hidden z-[9]">
            <Swiper carousels={card} />
          </div>

          <div className="flex md:hidden justify-center mb-3">
            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="bg-blue-500 text-white font-sniglet text-lg px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              {isDownloading ? 'Downloading...' : 'Download all Publicity Cards'}
            </button>
          </div>

          <p><span className="text-blue-500 font-jua text-lg md:text-xl">Dont just register, take up the mantle...</span> Join millions of children around the world in a meaningful journey to read the Bible in just one day!
          </p>
          <p className="mt-1">The Lovetoons Bible Reading Fiesta is an inspiring campaign aimed at engaging children everywhere to read the Bible. This is more than just reading; it's about instilling a consciousness of the Bible while fostering a love for the Bible in their hearts.
          </p>
          <p className="mt-1">As the Bible lovingly reminds us, "Start children off on the way they should go, and even when they are old, they will not turn from it" (Proverbs 22:6).
          </p>
          <p className="mt-1">Through this wonderful program, children can read a chapter of the New Testament Section of the Bible, record themselves, and share their readings with millions of other children. This will enable them to learn inspiring truths and engage with the profound messages of faith, hope, and love found in the pages of the Bible.
          </p>
          <p className="mt-1">Let’s come together to guide our kids on this beautiful journey, helping them to discover the love of our Lord Jesus Christ and the amazing person of the Holy Spirit. Your involvement can make a lasting difference in their lives!
          </p>
        </div>

        <div className="w-full col-span-1 flex flex-col gap-3 mt-5 md:mt-0">
          <Link href="/avatar" className="bg-gradient-to-bl transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#FFCDB4] to-[#ED6073] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><IoShareSocialSharp size={30} />Create fiesta avatar</Link>
          <Link href="/record" className="bg-gradient-to-tr transition-all duration-200 ease-in-out from-[#0081EE] to-[#88CEDF] px-5 w-max py-4 rounded-2xl text-slate-100 text-lg font-lucky hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 flex items-center gap-2"><MdEmergencyRecording size={30} />Record and Read</Link>
          <Link href="/fiesta/upload" className="bg-gradient-to-bl transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#c7c7e0] to-[#8E8EB1] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><IoMdCloudUpload size={30} />Upload my bible reading</Link>
          <Link href="/lbrf" className="bg-gradient-to-tr transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#EA8937] to-[#F8C254] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><RiLoginCircleFill size={30} />Register a friend</Link>
        </div>
      </div>

      <div className="bg-gradien t-to-b bg-slate-400 mt-10 from-[#EBD7D2] to-white">
        <Image src="/images/banner3.png" alt="sponsor LBR" className="mx-auto md:py-10 md:w-[85%]" width={1000} height={1000} />
      </div>
     
      <div className="md:flex items-center hidden gap-4 justify-center my-10">
        {card.map((item) => (
          <div className="relative"><Image
            key={item.title}
            src={item.src}
            className="w-[21rem]"
            alt={item.title}
            width={500}
            height={500}
          />
          <a href={item.src} 
            download={item.title} 
            className="absolute top-2 text-white right-2 rounded-full bg-slate-600 p-3"><IoMdCloudDownload size="25" />
          </a>
          </div>
        ))}
      </div>

      <div className="md:flex hidden justify-center my-10">
        <button
          onClick={handleDownloadAll}
          disabled={isDownloading}
          className="bg-blue-500 text-white font-sniglet text-lg px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          {isDownloading ? 'Downloading...' : 'Download all Publicity Cards'}
        </button>
      </div>


      <Footer />
    </div>
  );
};

export default Page;