import Image from 'next/image';
import React, { useState } from 'react';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon, EmailIcon, EmailShareButton } from 'react-share';
import { Copy } from 'lucide-react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { MdCancel } from "react-icons/md";
const Share = ({setShare}) => {
	const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 5000);
	};

	return (
		<div className="fixed font-sniglet inset-0 z-[99]  flex  items-center justify-center h-screen w-full ">
			{/* Overlay */}
			<div 
				className="absolute inset-0 bg-darkbg cursor-pointer bg-opacity-30" 
				onClick={() => setShare(false)} 
			/>
			<div className="p-3 py-8 md:w-[50vw] flex flex-col text-center items-center  bg-white shadow-lg rounded-2xl z-10">
				
				<div className='flex flex-col items-center justify-center relative'>
					<Image src="/images/letsgo.png" alt="Share" width={500} className='w-[16rem] md:w-[22rem]' height={500} />
					<div onClick={() => setShare(false)} className="absolute right-4 top-4 " ><MdCancel /></div>
					<p className="font-bold font-lucky text-darkbg text-center text-2xl md:text-5xl">Share Campaign Challenge</p>
					<p className="text-xl font-medium">Share this link to over all your social media and friends</p>
					<p className="font-lucky text-amber-500">Lets get the whole world to be part of this Bible Reading Fiesta!!!</p>
				</div>

				<div className='flex items-center py-8 gap-3'>
					{/* WhatsApp Share */}
					<WhatsappShareButton url={shareUrl} title="WhatsApp" className="">
						<WhatsappIcon size={40} round={true}  />
					</WhatsappShareButton>

					

					<TelegramShareButton url={shareUrl}>
						<TelegramIcon size={40} round={true} />
					</TelegramShareButton>

					<a target='_blank' href={'https://kingschat.online'}>
						<Image src="/images/kingschat.webp" alt="Share" width={500} className='w-20' height={500} />
					</a>
					<TwitterShareButton url={shareUrl}>
						<TwitterIcon size={40} round={true} />
					</TwitterShareButton>

					<EmailShareButton subject='Invitation to Join Bible Reading Fiesta!' body='Dearly Esteemed, you have been challenged to participate in Bible Reading FIesta today, Click on the link to join now!' separator=" " url={shareUrl}>
						<EmailIcon size={40} round={true}  />
					</EmailShareButton>

				</div>

				{/* Instagram Copy Link */}
				<button onClick={copyToClipboard} className="w-1/3 hover:bg-purple-700 transition-all duration-300 ease-in-out active:bg-purple-900 bg-purple-500 text-white p-2 rounded-md flex justify-center items-center gap-2">
					{copied ? 'Link Copied!' : 'Copy link'}
					<Copy size={18} />
				</button>
			</div>
		</div>
	);
};

export default Share;
