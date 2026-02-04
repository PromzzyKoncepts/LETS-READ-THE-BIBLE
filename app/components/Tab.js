import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Share from "./Share";
const Tab = () => {
  const tabs = [
    {
      id: 2,
      icon: "/images/boyread.png",
      title: "READ",
      content:
        "Be part of our Let’s Read the Bible challenge by reading one chapter of the Bible each day.",
      link: "read",
      btn: "Read Now",
    },
    {
      id: 3,
      icon: "/images/uploadIcon.png",
      title: "upload a Video",
      content:
        "Record a video of yourself reading the Bible and upload it to join our global Bible-reading campaign.",
      link: "/fiesta/upload",
      btn: "Upload Video",
    },
    {
      id: 4,
      icon: "/images/share.png",
      title: "share",
      content: "Share with friends and family.",
      link: "",
      btn: "Share with friends",
    },
    {
      id: 5,
      icon: "/images/child.png",
      title: "Games",
      content:
        "Learn, play and have fun with our engaging, interactive games sure to leave you entertained and educated.",
      link: "games",
      btn: "Play now",
    },
  ];

  const [share, setShare] = useState(false);
  return (
    <div className="grid md:grid-cols-4 items-stretch font-sniglet justify-between h-full w-full">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`${
            index == 0 && "bg-gradient-to-tl  from-[#7dbad8] to-[#88CEDF]"
          } ${index == 1 && "bg-gradient-to-bl  from-[#c7c7e0] to-[#8E8EB1]"} ${
            index == 2 && "bg-gradient-to-bl  from-[#FFCDB4] to-[#ED6073]"
          } ${
            index == 3 && "bg-gradient-to-tl  from-[#EA8937] to-[#F8C254]"
          } flex items-start h-full pl-5 py-5`}
        >
          <div className="flex flex-col justify-between items-start h-full">
            <h1 className="font-lucky text-4xl text-darkbg">{item.title}</h1>
            <p className="w-full">{item.content}</p>
            {item.title !== "share" ? (
              <Link
                href={`/${item.link}`}
                className="px-4 py-2 bg-darkbg text-white w-fit  rounded-full hover:animate-pulse"
              >
                {item.btn}
              </Link>
            ) : (
              <button
                className="px-4 py-2 bg-darkbg text-white rounded-full hover:animate-pulse"
                onClick={() => setShare(true)}
              >
                Share with Friends
              </button>
            )}
          </div>

          <Image
            src={item.icon}
            alt="image"
            className="w-40  my-auto flex items-center justify-center"
            width={300}
            height={300}
          />
        </div>
      ))}

      {share && <Share setShare={setShare} />}
    </div>
  );
};

export default Tab;
