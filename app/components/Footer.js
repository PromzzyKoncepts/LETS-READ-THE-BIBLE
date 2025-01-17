"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiArrowToTop, BiLogoFacebook } from "react-icons/bi";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <div className={`${pathname == "/" ? "bg -[#631260] " : ""} `}>
      <section className="section">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>

      <div className="bg-[#631260] font-sniglet roun ded-t-[3rem] px-5  pb-7 sm:px-24">
        <div className=" text-white flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col">
            <h3 className="text-2xl text-orange pb-3">Quick Links</h3>
            <Link href="/orders">LiveTV</Link>
            <Link href="/user">Watc h Videos</Link>
            <Link href="/auth/login">Give a seed</Link>
            <Link href="/favorites">KingsChat</Link>
            <Link href="/favorites">Login | Register</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-orange pb-3">Enquiry</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/contact">Our Channels</Link>
            <Link href="/t&c">Terms and Conditions</Link>
            <Link href="/faqs">FAQS</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-orange pb-3">Support</h3>
            <Link href="/about" className="flex items-center gap-1">
              <CiMail /> Email Support
            </Link>
            <Link href="/contact" className="flex items-center gap-1">
              <CiPhone /> Phone Support
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1">
              <Image src="/assets/png/kingschat.webp" alt="Kingschat logo icon" width={20} height={20}/>
               KingsChat Support
            </Link>
          </div>
          <div className="">
            <h3 className="text-xl text-orange pb-3">Connect with Us</h3>
            <div className="flex gap-3">
              <Link
                href="/about"
                className=""
              >
                <Image src="/assets/png/kingschat.webp" alt="Kingschat logo icon" width={40} height={40}/>
              </Link>
              <Link
                href="/contact"
                className="p-3 bg-primary text-white rounded-[100%]"
              >
                <FaXTwitter />{" "}
              </Link>
              
            </div>
          </div>
        </div>

        <div className="pt-7 text-white">
          <h3>GET DAILY/WEEKLY UPDATES</h3>
          <small>Receive emails on our newsletters</small>
          <form className="mt-4  flex items-center  sm:w-fit bg-white rounded-xl">
            <input
              type="email"
              name="email"
              className="bg-transparent text-black p-2 w-full focus:outline-none"
            />
            <button
              type="submit"
              className="  bg-[#9C29B2] rounded-r-xl p-3"
            >
              subscribe
            </button>
          </form>
        </div>

        <hr className="my-6 border-slate-500" />

        <div className="text-xs text-center  text-slate-400 sm:float-right">
          Copyright &copy; {currentYear} Loveworld Kiddies Network All Rights
          Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
