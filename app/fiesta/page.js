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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper styles
import { Navigation, Pagination } from 'swiper/modules';

const Page = () => {
  const [user, setUser] = useState(null);
  const [viewAvatar, setViewAvatar] = useState(false);
  const card = [
    {
      title: "fiesta 4",
      src: "/images/LBRF_4.png"
    },
    {
      title: "fiesta 1",
      src: "/images/LBRF_3.png"
    },
    {
      title: "fiesta 3",
      src: "/images/LBRF_3_0_2.png"
    },
    {
      title: "fiesta 2",
      src: "/images/LBRF_3_0_1.png"
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
      {viewAvatar && (
        <div className="font-sniglet fixed top-0 h-screen w-full bg-darkbg bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
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
      <div style={{ backgroundImage: `url(/images/purplebg.jpg)`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} className="md:w-[85%] flex items-center object-contain justify-center flex-col md:rounded-2xl mx-auto h-36 md:h-64 text-white p-5 md:p-10">
        <div>
          {user?.fullName && (<small className="text-pinkbg text-center md:text-left md:text-sm">Dear {user?.fullName}</small>)}
          <h1 className="m-auto text-center text-2xl md:text-5xl font-lucky">Thank you for registering!</h1>
          <p className="text-center font-schoolbell">You have successfully registered for the Lovetoons Bible Reading Fiesta</p>
        </div>
      </div>

      <div className="px-5 md:px-32 pt-5 md:pt-10 md:flex flex-col md:flex-row gap-5 font-sniglet">
        <div className="">
          <h2 className="font-lucky text-3xl md:text-5xl text-darkbg">LOVETOONS BIBLE READING FIESTA</h2>
          <h2 className="text-xl md:text-3xl font-lucky text-[#FD3006] py-1">A 24-HR BIBLE READING RENDEVOUS</h2>

          {/* <a href="https://lovetoons.org/sponsor.php" className="md:hidden block" target="_blank"><Image src="/images/sponsor.png" alt="sponsor LBR" className="mx-auto my-2 w-full md:w-[85%]" width={1000} height={1000} /></a> */}

          <div className="my-10">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
          >
            {card.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="flex justify-center">
                  <Image
                    src={item.src}
                    className="w-[20rem]"
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
          <p><span className="text-blue-500 font-jua text-lg md:text-xl">Don't just register, take up the mantle...</span> Join millions of kids all over the world read the bible in just one day</p>
          <p>'Lovetoons Bible Reading Fiesta' is an inspiring campaign to engage children around the world to read the bible: a chapter in the New Testament thereby contributing to keeping the Bible as the number one book in the world, even among children. The Bible says "Start children off on the way they should go, and even when they are old they will not turn from it." Proverbs 22:6. This beautiful campaign gives every child an opportunity to read at least one chapter of the Bible of his/her choice, get recorded while reading, upload his/her video and share the link to other children. By reading the Bible, the kids will come to know and love the ministry of the Holy Spirit and understand the sacrificial love of our Lord Jesus Christ. Furthermore, parents can read alongside their children while recording the activity.</p>
        </div>

        <div className="w-full flex flex-col gap-3 mt-5 md:mt-0">
          <Link href="/record" className="bg-gradient-to-tr transition-all duration-200 ease-in-out from-[#0081EE] to-[#88CEDF] px-5 w-max py-4 rounded-2xl text-slate-100 text-lg font-lucky hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 flex items-center gap-2"><MdEmergencyRecording size={30} />Record and Read</Link>
          <Link href="/upload" className="bg-gradient-to-bl transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#c7c7e0] to-[#8E8EB1] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><IoMdCloudUpload size={30} />Upload my bible reading</Link>
          <Link href="/avatar" className="bg-gradient-to-bl transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#FFCDB4] to-[#ED6073] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><IoShareSocialSharp size={30} />Create fiesta avatar</Link>
          <Link href="/lbrf" className="bg-gradient-to-tr transition-all duration-200 ease-in-out hover:border-2 hover:border-white hover:shadow-lg hover:shadow-gray-700 shadow-lg shadow-gray-500 from-[#EA8937] to-[#F8C254] px-5 w-max py-4 rounded-2xl text-slate-800 text-lg font-lucky flex items-center gap-2"><RiLoginCircleFill size={30} />Register a friend</Link>
        </div>
      </div>
      {/* 
      <a href="https://lovetoons.org/sponsor.php" className="hidden md:block" target="_blank"><Image src="/images/sponsor.png" alt="sponsor LBR" className="mx-auto pt-10 md:pt-16 w-full md:w-[85%]" width={1000} height={1000} /></a> */}

      {/* <div className="flex items-center gap-4 justify-center my-10">{card.map(item => (<Image key={item.title} src={item.src} className="w-[20rem]" alt={item.title} width={500} height={500} />))}</div> */}


      <div className="md:flex items-center hidden gap-4 justify-center my-10">
        {card.map((item) => (
          <Image
            key={item.title}
            src={item.src}
            className="w-[21rem]"
            alt={item.title}
            width={500}
            height={500}
          />
        ))}
      </div>

      <div className="flex justify-center my-10">
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