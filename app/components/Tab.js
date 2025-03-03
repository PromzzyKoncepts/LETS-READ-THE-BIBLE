import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import Share from "./Share";
const Tab = () => {
	const tabs = [
		{
			id: 2,
			icon: "/images/boyread.png",
			title: "read",
			content:
				"parents can read alongside their children while recording the activity. This 'Read-to-me' option is a good way to engage younger children so that no child is left out.",
			btn: "Read the bible",
		},
		{
			id: 3,
			icon: "/images/uploadIcon.png",
			title: "upload",
			content:
				"This beautiful campaign gives every child an opportunity to read at least one chapter of the Bible of his/her choice, get recorded while reading, upload his/her video and share the link to other children.",
			btn: "Upload now!",
		},
		{
			id: 4,
			icon: "/images/share.png",
			title: "share",
			content:
				"Forcythe is seriously amazing when it comes to coming up with new ideas. They took our rough ideas and turned them into something incredible online. Their team’s commitment to our vision was evident every step of the way.",
			btn: "Share with friends",
		},
		{
			id: 5,
			icon: "/images/child.png",
			title: "avatar",
			content:
				"The moment we engaged Forcythe, it was clear they were in a league of their own. Their strategic approach to our project not only enhanced our online platform but also enriched our brand’s story, captivating our audience like never before.",
			btn: "Create my avatar",
		},
	];


	const [share, setShare] = useState(false)
	return (
		<div className="grid md:grid-cols-4 items-stretch font-sniglet justify-between h-full w-full">
			{tabs.map((item, index) => (
				<div key={index} className={`${index == 0 && "bg-gradient-to-tl  from-[#7dbad8] to-[#88CEDF]"} ${index == 1 && "bg-gradient-to-bl  from-[#c7c7e0] to-[#8E8EB1]"} ${index == 2 && "bg-gradient-to-bl  from-[#FFCDB4] to-[#ED6073]"} ${index == 3 && "bg-gradient-to-tl  from-[#EA8937] to-[#F8C254]"} flex items-start h-full pl-5 py-3`} >
					<div className="flex flex-col justify-between items-start h-full">
						<h1 className="font-lucky text-4xl text-darkbg">{item.title}</h1>
						<p className="w-full">{item.content}</p>
						{item.title !== "share" ? (<Link href={`/${item.title}`} className="px-4 py-2 bg-darkbg text-white rounded-full hover:animate-pulse">{item.btn}</Link>)
							: (<button className="px-4 py-2 bg-darkbg text-white rounded-full hover:animate-pulse" onClick={() => setShare(true)}>Share with Friends</button>)}
					</div>

					<Image src={item.icon} alt="image" className="w-44  my-auto flex items-center justify-center" width={300} height={300} />

				</div>
			))}

			{share && (
				<Share setShare={setShare} />
			)}
		</div>
	)
}

export default Tab;