import Image from "next/image";
import React, { useEffect, useState } from "react";
import FloatingAnimation from "../utils/FloatingAnimation";

const TabSwitcher = () => {
  const tabs = [
    {
      id: 1,
      icon: "/images/readthebible.png",
      title: "About",
      content:
        "'Let's Read the Bible' campaign is an inspiring campaign to engage children around the world to read the bible (a chapter or a verse) thereby contributing to keeping the BIble as the number one book in the world, even among children. The Bible says 'Start children off on the way they should go, and even when they are old they will not turn from it.' Proverbs 22:6.",
      btn: "Be a sponsor",
    },
    {
      id: 2,
      title: "Read",
      content:
        "parents can read alongside their children while recording the activity. This 'Read-to-me' option is a good way to engage younger children so that no child is left out.",
      btn: "Read the bible",
    },
    {
      id: 3,
      title: "Upload",
      content:
        "This beautiful campaign gives every child an opportunity to read at least one chapter of the Bible of his/her choice, get recorded while reading, upload his/her video and share the link to other children. By reading the Bible, the kids will come to know and love the ministry of the Holy Spirit and understand the sacrificial love of our Lord Jesus Christ.",
      btn: "Upload now!",
    },
    {
      id: 4,
      title: "Share",
      content:
        "Forcythe is seriously amazing when it comes to coming up with new ideas. They took our rough ideas and turned them into something incredible online. Their team’s commitment to our vision was evident every step of the way.",
      btn: "Share with your friends",
    },
    {
      id: 5,
      title: "Avatar",
      content:
        "The moment we engaged Forcythe, it was clear they were in a league of their own. Their strategic approach to our project not only enhanced our online platform but also enriched our brand’s story, captivating our audience like never before.",
      btn: "Create my avatar",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  // Automatically switch tabs every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length); // Cycle through tabs
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [tabs.length]);

  return (
    <div>
      <FloatingAnimation />

      <div
        className={`w-full min-h-[60vh] relative z-20 lg:px-28 mx-auto py-16 ${
          activeTab == 0 && "bg-darkbg"
        }  ${activeTab == 2 && "bg-[#229AE0]"} ${
          activeTab == 1 && "bg-pinkbg"
        }  ${activeTab == 3 && "bg-[#8e8eb1]"} ${
          activeTab == 4 && "bg-[#404040]"
        } `}
      >
        {/* Tab Navigation */}
        <h1
          className={`text-5xl text-center font-lucky tracking-wide capitalize pb-7 font-bold ${
            activeTab == 0 && "text-[#EEA236]"
          } ${activeTab == 1 && "text-darkbg"} ${
            activeTab == 2 && "text-white"
          } ${activeTab == 3 && "text-darkbg"}  ${
            activeTab == 4 && "text-white"
          } `}
        >
          Be a part of this Campaign !!
        </h1>
        <div className="flex justify-between items-stretch mx-auto rounded-full mb-4  shadow-md shadow-[#EEA236] md:w-full overflow-x-auto whitespace-nowrap">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`w-full cursor-pointer font-lucky text-white  flex-shrink-0 md:flex-shrink mx-auto ${
                activeTab === 0 && "md:rounded-l-full"
              }  ${
                activeTab === 4 && "md:rounded-r-full"
              } font-medium flex items-center justify-center text-xl ${
                activeTab === index
                  ? `${activeTab == 0 && "bg-[#EEA236]"} text-white ${
                      activeTab == 2 && "bg-[#E06822]"
                    } ${activeTab == 1 && "bg-[#46ACCA]"}`
                  : " "
              } transition-colors`}
            >
              {tab.icon ? (
                <Image
                  src={tab?.icon}
                  className={`w-24`}
                  width={100}
                  height={100}
                  alt={"company logos"}
                />
              ) : (
                tab.title
              )}
              {/* {tab.title && tab.title} */}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`${activeTab == 0 && "bg-[#EEA236]"} ${
            activeTab == 2 && "bg-[#E06822]"
          } ${activeTab == 1 && "bg-[#46ACCA]"}  ${
            activeTab == 4 && "bg-[#C96345] text-white"
          }  ${
            activeTab == 3 && "bg-[#F4C2C2] text-black"
          }  shadow-md relative ${activeTab == 2 && "md:left-[35%]"} ${
            activeTab == 3 && "md:left-[55%]"
          } ${activeTab === 4 && "md:left-[70%]"} ${
            activeTab == 1 && "md:left-44"
          } py-5 px-7 rounded-2xl  gap-3 flex flex-col md:flex-row items-center md:items-start w-fit shadow-md shadow-gray-800`}
        >
          <div className="font-sniglet">
            <h2 className="text-xl  font-bold">{tabs[activeTab].title}</h2>
            <p
              className={`mt-2 ${activeTab == 0 ? "w-[45rem]" : "w-[25rem]"} `}
            >
              {tabs[activeTab].content}
            </p>
            <button
              className={`px-5 py-2 rounded-full animate-shake animate-infinite animate-duration-[7000ms] hover:animate-none animate-ease-in-out animate-normal border mt-5 ${
                activeTab == 0 && "bg-darkbg text-white "
              } ${activeTab == 1 && "bg-darkbg text-white "} ${
                activeTab == 2 && "bg-darkbg text-white "
              } ${activeTab == 3 && "bg-[#404040] text-white "}
              } ${
                activeTab == 4 &&
                "bg-gradient-to-tr from-[#F4C2C2] to-[#8E8EB1] hover:bg-gradient-to-bl text-black "
              }
                `}
            >
              {tabs[activeTab].btn}
            </button>
          </div>

          {/* <img src={tabs[activeTab].image} alt={tabs[activeTab].user + "image"} /> */}
        </div>
      </div>
    </div>
  );
};

export default TabSwitcher;
