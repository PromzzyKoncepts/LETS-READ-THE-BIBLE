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
    <div className={`${pathname == "/" ? "bg-[#8E8EB1] " : ""} relative `}>
      <section className="section ">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </section>

      <div className="bg-[#631260] font-sniglet roun ded-t-[3rem] px-5  pb-7 sm:px-24">
        <div className=" text-white  flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-orange pb-3">Quick Links</h3>
            <Link href="/lrbf">Bible Reading Fiesta</Link>
            <Link href="/videos">Watch Videos</Link>
            {/* <Link href="/auth/login">Sponsor this campaign</Link> */}
            <Link href="/record">Record your video</Link>
            <Link href="/upload">Upload a Video</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-orange font-bold  pb-3">Enquiry</h3>
            {/* <Link href="/about">About Us</Link> */}
            {/* <Link href="/contact">Contact Us</Link> */}
            <Link href="/read">Read the bible</Link>
            <Link href="/t&c">Terms and Conditions</Link>
            <Link href="/faqs">FAQS</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-orange font-bold  pb-3">Support</h3>
            <a href="mailto:lovetoons@gmail.com" className="flex items-center gap-1">
              <CiMail /> Email Support
            </a>
            <a href="tel:07012897856" className="flex items-center gap-1">
              <CiPhone /> Phone Support
            </a>
            <a href="https://kingschat.online" className="flex items-center gap-1">
              <Image src="/images/kingschat.webp" alt="Kingschat logo icon" width={20} height={20}/>
               KingsChat Support
            </a>
          </div>
          <div className="">
            <h3 className="text-xl text-orange pb-3 font-bold ">Connect with Us</h3>
            <div className="flex gap-3">
              <a
                href="https://kingschat.online"
                className=""
              >
                <Image src="/images/kingschat.webp" alt="Kingschat logo icon" width={40} height={40}/>
              </a>
              <a
                href="https://x.com/lovetoonstv"
                className="p-3 bg-primary text-white rounded-[100%]"
              >
                <FaXTwitter />{" "}
              </a>
              
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
          Copyright &copy; {currentYear} Lovetoons TV All Rights
          Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
