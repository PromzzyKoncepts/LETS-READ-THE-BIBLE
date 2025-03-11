"use client"
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdCloudUpload } from "react-icons/io";
import Share from './Share';
import ShareMobile from './ShareMobile';
import Link from 'next/link';
import { FaRecordVinyl } from "react-icons/fa6";

const menuItems = [
  { path: "/read", icon: <FaBookOpenReader color="#9e4264" size={26} />, label: "Read" },
//   { path: "/avatar", icon: <FaUserCircle color="#7DA042" size={26} />, label: "Avatar" },
{ path: "/videos", icon: <BiSolidVideos color="#425a9e" size={26} />, label: "Videos" },
{ path: "/", icon: <GoHomeFill color="#9e4242" size={30} />, label: "Home" },
  { path: "/upload", icon: <IoMdCloudUpload  color="#ca6446" size={26} />, label: "Upload" },
  { path: "#", icon: <HiMenuAlt3 color="#ca6446" size={26} />, label: "More" },
  //   { path: "/share", icon: <MdShare color="#ca6446" size={26} />, label: "Share" },
];

const Popup = ({ onClose }) => {
  
    return (
      <div className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg py-4 px-2 bg-opacity-50 backdrop-blur-md w-64">
        
        <Link
        href="/avatar"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 text-[#425a9e] rounded-md cursor-pointer"
          onClick={onClose}

        >
          <FaUserCircle color="#425a9e" size={24} />
          <span>Avatar</span>
        </Link>
        <Link
        href="/record"
          className="flex items-center gap-2 p-2 text-darkbg hover:bg-gray-100 rounded-md cursor-pointer"
          onClick={onClose}

        >
          <FaRecordVinyl  color="#661361" size={24} />
          <span>Record</span>
        </Link>
        <Link
        href="/lbrf"
          className="flex items-center gap-2 p-2 text-[#9D4141] hover:bg-gray-100 rounded-md cursor-pointer"
          onClick={onClose}
        >
          <BiSolidVideos color="#9D4141" size={24} />
          <span>BIBLE READING FIESTA</span>
        </Link>
        {/* <div
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
          onClick={() => setShare(true)} // Replace with your Share logic
        >
          <MdShare color="#ca6446" size={20} />
          <span>Share</span>
        </div> */}
        
      </div>
    );
  };

const BottomBar = () => {
    const [share, setShare] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
  const menuBarRef = useRef(null);
  const menuIndicatorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [currentItem, setCurrentItem] = useState(menuItems.findIndex(item => item.path === pathname));

  useEffect(() => {
    const menuEls = menuBarRef.current.querySelectorAll(".sc-menu-item");
    const indicator = menuIndicatorRef.current;

    if (currentItem !== -1) {
      const selectedItem = menuEls[currentItem];
      const position = selectedItem.offsetLeft - 16;
      indicator.style.left = `${position}px`;
      menuBarRef.current.style.backgroundPosition = `${position - 8}px`;
    }
  }, [currentItem]);

  const handleNavigation = (index, path) => {
    if (path === "#") {
      setShowPopup((prev) => !prev); 
    } else {
      setCurrentItem(index);
      router.push(path);
      setShowPopup(false); 
    }
  };

  return (
    <div
      ref={menuBarRef}
      className="sc-bottom-bar font-lucky flex justify-between items-center px-5 py-6 w-screen h-14 mx-auto top-0 left-0 right-0 bg-transparent bg-[radial-gradient(circle_at_36px_6px,transparent_36px,#ffffff_37px)] shadow-[0px_-1px_6px_rgba(0,0,0,0.08),0px_-2px_12px_rgba(0,0,0,0.12)] rounded-t-[30px] transition-all duration-500 ease-[cubic-bezier(0.57,0.23,0.08,0.96)]"
    >
      {menuItems.map((item, index) => (
        <Link
        href={item.path}
          key={item.path}
          onClick={() => handleNavigation(index, item.path)}
          className={`sc-menu-item text-gray-600 flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer ${
            currentItem === index ? "sc-current text-white transform translate-x-[-1px] translate-y-[-31px] z-10" : ""
          }`}
        >
          {item.icon}
          {currentItem !== index && <small>{item.label}</small>}
        </Link>
      ))}
      <div
        ref={menuIndicatorRef}
        className="sc-nav-indicator absolute w-14 h-14 bottom-7 backdrop-blur-sm bg-amber-200 bg-opacity-30 flex items-center justify-center shadow-[0px_3px_12px_rgba(0,0,0,0.08),0px_3px_6px_rgba(0,0,0,0.12)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.45,0.73,0,0.59)]"
      ></div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      {share && (
            <div className="">
        <ShareMobile setShare={setShare} />
        </div>
      )}
    </div>
  );
};

export default BottomBar;
