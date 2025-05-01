"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Share from './Share';
const Header = () => {
  const [animate, setAnimate] = useState(false);
  const [share, setShare] = useState(false)


  return (
    <div>
      <div
        className={`bg-[#631260] hidden   backdrop-blur-md bg-opacity-50 fixed left-0 right-0 w-fit px-10 text-lg font-sniglet rounded-full mx-auto z-50 shadow-lg transition-all duration-500 md:flex items-center gap-20  top-3`}
      >
        <Link href="/"><Image src="/images/readthebible.png" width={100} height={100} alt="read the bible logo" /></Link>
        <div className="flex items-center gap-10 justify-center py-3">
          <Link href={`/read`} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Read
          </Link>
          <button onClick={() => setShare(true)} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Share
          </button> 
          <Link href={`/avatar`} className="text-white hover:text-slate-800 hover:border transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Avatar
          </Link>
          <Link href={`/videos`} className="text-white hover:text-slate-800 hover:border  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            Videos
          </Link>
          {/* <Link href={`/fiesta`} className="text-white hover:text-slate-800 hover:border  transition-all duration-500 ease hover:font-bold hover:bg-gradient-to-tr from-[#EE7822] to-[#EFB741] active:bg-gradient-to-bl hover:rounded-full hover:px-5 hover:py-2">
            View Fiesta
          </Link>
          <Link href={`/lbrf`} className="text-slate-800 border font-bold bg-gradient-to-tr from-[#EE7822] to-[#EFB741] hover:bg-gradient-to-bl rounded-full px-5 py-2 transition-all duration-300 ease">
            Register for Fiesta
          </Link> */}
        </div>

      </div>
      {share && (
        <Share setShare={setShare} />
      )}
    </div>
  );
};

export default Header;
