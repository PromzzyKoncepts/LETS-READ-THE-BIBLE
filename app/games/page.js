"use client";
import { link } from "next/link";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const games = [
    {
      imageSrc: "/images/scramble.webp",
      name: "Word Scramble",
      ages: "5+",
      tag: ["Educational", "Bible"],
      description:
        "Word Search is a classic puzzle game where players find and circle words hidden in a grid of letters. It's a great way to enhance vocabulary and cognitive skills while having fun.",
        link: "/games/scramble",
    },
    {
      imageSrc: "/images/pop.png",
      name: "Balloon Pop",
      ages: "5+",
      tag: ["Attention span", "fun"],
      description:
        "Balloon Pop is a fun and engaging game where players pop balloons by clicking on them. It's designed to improve hand-eye coordination and reaction time, making it suitable for all ages.",
        link: "/games/balloon-pop",
    },
    
    {
      imageSrc: "/images/wordle.png",
      name: "Wordle",
      ages: "13+",
      tag: ["Educational", "Bible"],
      description:
        "Wordle is a word puzzle game where players guess a five-letter word within six attempts. Each guess provides feedback on letter placement and correctness, making it a fun and challenging game for all ages.",
        link: "/games/wordle",
    },
    
    
    // {
    //   imageSrc:"/images/whack-a-mole.png",
    //   name: "Whack-a-Mole",
    //   ages: "5+",
    //   tag: "Attention span, fun",
    //   description: "Whack-a-Mole is an arcade-style game where players hit popping moles with a mallet. It's a fast-paced game that improves reflexes and hand-eye coordination, suitable for all ages.",
    // },
  ];
  return (
    <div className="font-sniglet bg-amber-500 min-h-screen md:pt-28 px-5 md:px-20">
      <div className="flex justify-between items-center pb-4 md:pb-8">
        <h3 className="text-2xl md:text-4xl font-lucky">
          Popular Games to play
        </h3>
        <div className="hidden md:flex items-center  border border-amber-100 focus:border-white rounded-full ">
          <input className="bg-transparent placeholder:text-slate-900  focus:outline-none  active:outline-0  pl-5 py-3" type="search" placeholder="search by name, tags " />
          <button className=" rounded-r-full  px-5 py-3 text-white w-full bg-amber-900 bg-opacity-60">Search</button>
        </div>
      </div>
      <div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {games.map((game, index) => (
            <Link 
              href={game.link}
              key={index}
              className="bg-amber-600 px-3 pt-4 pb-8 hover:shadow-2xl hover:border transition-all duration-500 ease-in-out rounded-lg shadow flex flex-col gap-3 hover:bg-amber-700 w-full"
            >
              <Image
                src={game.imageSrc}
                width={200}
                alt={game.name}
                className="w-full object-cover h-52 card-image"
                height={200}
              />
              <div className="flex justify-between"><h4 className="text-2xl font-bold  text-white">{game.name}</h4>
              <p className="bg-amber-800 bg-opacity-60 text-xs text-white px-4 py-2 rounded">{game.ages}</p></div>
              <p className="text-base text-black font-sans">{game.description}</p>
              <div className=" flex justify-between items-center text-sm">
                <div className="text-sm border-l-2 p-2 rounded-lg text-amber-300 border-amber-300">Most popular</div>
                
                <div className="flex items-center gap-2">
                  {game.tag.map((tag, index) => (
                    <p
                      key={index}
                      className="bg-teal-800 text-white  px-4 py-2 text-center  bg-opacity-60 rounded-full"
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
