import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import Share from "./Share";
const Tab = () => {
	const tabs = [
		{
			id: 2,
			icon: "/images/boyread.png",
			title: "Upload Picture",
			content:
				"Join this Glorious fiesta! Join our 'Let's Read the Bible' fiesta by uploading a clear image of your kid(s) reading the Bible!",
				link:"lbrf/picture",
			btn: "Upload now",
		},
		{
			id: 3,
			icon: "/images/uploadIcon.png",
			title: "upload a Video",
			content:
				"Your voice matters! Record or upload your own video reading the Bible and be part of our global campaign. Let’s bring the Scriptures to life together!",				
				link:"fiesta/upload",
			btn: "Select a chapter",
		},
		{
			id: 4,
			icon: "/images/share.png",
			title: "share",
			content:
				"Spread the light! Share your favorite Bible verses and inspire others by posting on social media with #LetsReadTheBible. Let’s make the Word go viral!",
				link:"",
			btn: "Share with friends",
		},
		{
			id: 5,
			icon: "/images/child.png",
			title: "avatar",
			content:
				"Create your unique campaign flyer! Personalize your FIESTA avatar and share it with your community to encourage everyone to join the movement.",
				link:"avatar",
			btn: "Create my avatar",
		},
	];


	const [share, setShare] = useState(false)
	return (
		<div className="grid md:grid-cols-4 items-stretch font-sniglet justify-between h-full w-full">
			{tabs.map((item, index) => (
				<div key={index} className={`${index == 0 && "bg-gradient-to-tl  from-[#7dbad8] to-[#88CEDF]"} ${index == 1 && "bg-gradient-to-bl  from-[#c7c7e0] to-[#8E8EB1]"} ${index == 2 && "bg-gradient-to-bl  from-[#FFCDB4] to-[#ED6073]"} ${index == 3 && "bg-gradient-to-tl  from-[#EA8937] to-[#F8C254]"} flex items-start h-full pl-5 py-5`} >
					<div className="flex flex-col justify-between items-start h-full">
						<h1 className="font-lucky text-4xl text-darkbg">{item.title}</h1>
						<p className="w-full">{item.content}</p>
						{item.title !== "share" ? (<Link href={`/${item.link}`} className="px-4 py-2 bg-darkbg text-white w-fit  rounded-full hover:animate-pulse">{item.btn}</Link>)
							: (<button className="px-4 py-2 bg-darkbg text-white rounded-full hover:animate-pulse" onClick={() => setShare(true)}>Share with Friends</button>)}
					</div>

					<Image src={item.icon} alt="image" className="w-40  my-auto flex items-center justify-center" width={300} height={300} />

				</div>
			))}

			{share && (
				<Share setShare={setShare} />
			)}
		</div>
	)
}

export default Tab;