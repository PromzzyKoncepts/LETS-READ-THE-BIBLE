"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  return (
    <div
      className={`bg-[#631260] hidden   backdrop-blur-md bg-opacity-50 fixed left-0 right-0 w-fit px-10 text-lg font-sniglet rounded-full mx-auto z-50 shadow-lg transition-all duration-500 md:flex items-center gap-20 ${
        animate ? 'top-5' : '-top-20'
      }`}
    >
        <Image src="/images/readthebible.png"width={50} height={50} alt="read the bible logo" />
      <div className="flex items-center gap-10 justify-center py-3">
        <Link href={`read`} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
          Read
        </Link>
        <Link href={`share`} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
          Share
        </Link>
        <Link href={`avatar`} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
          Avatar
        </Link>
        <Link href={`sponsor`} className="text-white hover:text-slate-800 hover:border  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
          Sponsor
        </Link>
        <Link href={`upload`} className="text-slate-800 border font-bold bg-gradient-to-tr from-[#EE7822] to-[#EFB741] hover:bg-gradient-to-bl rounded-full px-5 py-2 transition-all duration-300 ease">
          Join Campaign
        </Link>
      </div>
    </div>
  );
};

export default Header;
