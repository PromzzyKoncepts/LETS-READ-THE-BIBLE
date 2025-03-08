"use client"
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

const menuItems = [
  { path: "/read", icon: <FaBookOpenReader color="#9e4264" size={28} />, label: "Read" },
  { path: "/avatar", icon: <FaUserCircle color="#7DA042" size={28} />, label: "Avatar" },
  { path: "/", icon: <GoHomeFill color="#9e4242" size={30} />, label: "Home" },
  { path: "/videos", icon: <BiSolidVideos color="#425a9e" size={28} />, label: "Videos" },
  { path: "/share", icon: <MdShare color="#ca6446" size={28} />, label: "Share" }
];

const BottomBar = () => {
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
    setCurrentItem(index);
    router.push(path);
  };

  return (
    <div
      ref={menuBarRef}
      className="sc-bottom-bar font-lucky flex justify-between items-center px-5 py-6 w-screen h-14 mx-auto top-0 left-0 right-0 bg-transparent bg-[radial-gradient(circle_at_36px_6px,transparent_36px,#ffffff_37px)] shadow-[0px_-1px_6px_rgba(0,0,0,0.08),0px_-2px_12px_rgba(0,0,0,0.12)] rounded-t-[30px] transition-all duration-500 ease-[cubic-bezier(0.57,0.23,0.08,0.96)]"
    >
      {menuItems.map((item, index) => (
        <div
          key={item.path}
          onClick={() => handleNavigation(index, item.path)}
          className={`sc-menu-item text-gray-600 flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer ${
            currentItem === index ? "sc-current text-white transform translate-x-[-1px] translate-y-[-31px] z-10" : ""
          }`}
        >
          {item.icon}
          {currentItem !== index && <small>{item.label}</small>}
        </div>
      ))}
      <div
        ref={menuIndicatorRef}
        className="sc-nav-indicator absolute w-14 h-14 bottom-7 backdrop-blur-sm bg-amber-200 bg-opacity-30 flex items-center justify-center shadow-[0px_3px_12px_rgba(0,0,0,0.08),0px_3px_6px_rgba(0,0,0,0.12)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.45,0.73,0,0.59)]"
      ></div>
    </div>
  );
};

export default BottomBar;
