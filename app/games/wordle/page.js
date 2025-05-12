"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import confetti from "canvas-confetti";

// Organized Bible names by length
const BIBLE_NAMES_BY_LENGTH = {
  4: [
    "Adam", "Amos", "Esau", "Ezra", "Elam", "Eli", "Enos",	"Irad",  
    "Noah", "Obed", "Omri", "Onam", "Paul",  "Saul", "Seth", "Shem", 
  ],
  5: [
    "Aaron", "Abram", "Caleb", "David",  "Enoch", "Ethan", "Isaac", 
    "Jacob", "Jobab",  "Judah", "Lemuel", "Lotan",  "Matth", 
    "Moses", "Naomi", "Nahor",  "Othni",  "Reuel", "Rufus", 
    "Simon",  "Terah", "Tubal", "Zerah", "Peleg", "Peter", "Rahab", 
    "Sarah", "Silas", "Titus", "Uriel", "Zebul"
  ],
  6: [
    "Abijah", "Adriel", "Ahijah", "Amaziah", "Asahel","Joseph", "Azariah", "Benaiah", 
    "Chedor", "Darius", "Elisha", "Jabesh",   "Jethro", "Joab", "Joash", "Elijah","Mahlon","Pharez","Neriah","Sisera","Lemuel","Josiah",
    "Jotham", "Mephib",  "Nahash",  
    
  ],

  7: [
    "Amaziah", "Azariah", "Benaiah", "Eleazar",  
    "Ishmael", "Jehoash", "Jezebel", 
		   "Obadiah", "Pashhur",
    "Jotham", "Malachi", "Manasseh", "Mephib", "Mordecai", "Nahash", 
     "Obadiah", "Pashhur", "Phinehas", "Rehoboam", 
    "Shadrach", "Shealtiel", "Tiglath", "Zechariah", "Zedekiah"
  ]
};

const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
  });
};

export default function BibleWordle() {
  const [nameLength, setNameLength] = useState(5);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [tutorial, setTutorial] = useState(false);

  // Initialize the game with a random Bible name
  useEffect(() => {
    resetGame();
  }, [nameLength]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== nameLength) {
          setMessage(`Name must be ${nameLength} letters`);
          setTimeout(() => setMessage(""), 2000);
          return;
        }

        if (
          !BIBLE_NAMES_BY_LENGTH[nameLength].map((name) => name.toUpperCase()).includes(currentGuess)
        ) {
          setMessage("Not a valid Bible name");
          setTimeout(() => setMessage(""), 2000);
          return;
        }

        const newGuesses = [...guesses];
        const emptyIndex = guesses.findIndex((g) => g === null);
        newGuesses[emptyIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === solution) {
          setIsGameOver(true);
          setMessage("You won!");
          fireConfetti();
        } else if (emptyIndex === 5) {
          setIsGameOver(true);
          setMessage(`Game over! The name was ${solution}`);
        }
      } else if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (/^[A-Za-z]$/.test(event.key) && currentGuess.length < nameLength) {
        setCurrentGuess(currentGuess + event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, isGameOver, solution, nameLength]);

  // Reset the game
  const resetGame = () => {
    const names = BIBLE_NAMES_BY_LENGTH[nameLength];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex].toUpperCase();
    setSolution(randomName);
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setIsGameOver(false);
    setMessage("");
  };

  // Calculate letter statuses for coloring
  const getLetterStatus = (letter, position) => {
    if (solution[position] === letter) {
      return "correct";
    } else if (solution.includes(letter)) {
      return "present";
    } else {
      return "absent";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#ffae38] to-[#ffc44e] [#EB7B65] flex flex-col items-center md:pt-28 font-sniglet px-4">
      <Head>
        <title className="">Bible Name Wordle</title>
        <meta name="description" content="Guess the Bible name in 6 tries" />
      </Head>

      <div className="md:flex  hidden md:flex-row flex-col gap-6 text-white">
        <div className="flex gap-2 text-white">
          <h1 className="text-2xl md:text-4xl  -rotate-3 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#00C486]">
            B
          </h1>
          <h1 className="text-2xl md:text-4xl  rotate-2 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#A8A300]">
            I
          </h1>
          <h1 className="text-2xl md:text-4xl  rotate-6 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#2E90FA]">
            B
          </h1>
          <h1 className="text-2xl md:text-4xl  -rotate-3 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#667085]">
            L
          </h1>
          <h1 className="text-2xl md:text-4xl  -rotate-12 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#F79009]">
            E
          </h1>
        </div>
        <div className="flex gap-2 text-white">
          <h1 className="text-2xl md:text-4xl  rotate-6 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#F63D68]">
            W
          </h1>
          <h1 className="text-2xl md:text-4xl  -rotate-12 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#7A5AF8]">
            O
          </h1>
          <h1 className="text-2xl md:text-4xl  rotate-6 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#12B76A]">
            R
          </h1>
          <h1 className="text-2xl md:text-4xl  -rotate-3 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#F79009]">
            D
          </h1>
          <h1 className="text-2xl md:text-4xl  rotate-12 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-[#F63D68]">
            L
          </h1>
          <h1 className="text-2xl md:text-4xl  -rotate-3 font-bold mb-6 text-center font-lucky px-4 py-3 rounded-xl bg-lime-500">
            E
          </h1>
        </div>
      </div>

			<div className="md:hidden flex flex-col text-white">

				<h1 className="text-4xl pt-6 pb-3 text-slate-600 font-lucky">Bible Wordle</h1>
				<button className="text-white bg-amber-500 px-5 py-2 rounded-xl mb-5" onClick={() => setTutorial(true)}>How to play</button>
				</div>

				{tutorial === true && (
					 <div className="bg-amber-800 px-6 py-9 w-[24rem] top-[16vh] rounded-3xl text-white shadow-lg border-2 border-white absolute left-5 hidden md:block">
					 <h1 className="text-center text-2xl font-lucky pb-4">How to play {solution}</h1>
	 
					 <div className="flex justify-center gap-4 mb-4">
						 <button
							 onClick={() => setNameLength(4)}
							 className={`px-3 py-2 rounded-lg ${
								 nameLength === 4 ? "bg-green-600" : "bg-gray-600"
							 }`}
						 >
							 4 Letters
						 </button>
						 <button
							 onClick={() => setNameLength(5)}
							 className={`px-3 py-2 rounded-lg ${
								 nameLength === 5 ? "bg-green-600" : "bg-gray-600"
							 }`}
						 >
							 5 Letters
						 </button>
						 <button
							 onClick={() => setNameLength(6)}
							 className={`px-3 py-2 rounded-lg ${
								 nameLength === 6 ? "bg-green-600" : "bg-gray-600"
							 }`}
						 >
							 6 Letters
						 </button>
					 </div>
	 
					 <p className="text-slate-900 bg-slate-200 p-2 font-sans rounded-md mb-5">
						 To play this bible name game:
					 </p>
					 <ul className="flex flex-col gap-2 list-disc pl-5">
						 <li>Guess the bible name by typing in the box</li>
						 <p className="text-sm text-slate-300">
							 Examples: {BIBLE_NAMES_BY_LENGTH[nameLength].slice(0, 3).join(", ")}...
						 </p>
						 <li>Currently playing with {nameLength}-letter names</li>
						 <li>You have a total of 6 trials to guess</li>
						 <li>
							 Green color means word is{" "}
							 <span className="text-lime-400 text-lg">CORRECT</span> and in the
							 right position
						 </li>
						 <li>
							 Yellow color means word is{" "}
							 <span className="text-lime-400 text-lg">CORRECT</span> and in the
							 wrong position
						 </li>
						 <li>
							 Gray color means word is{" "}
							 <span className="text-red-400 text-lg">WRONG</span> and does not
							 apply in the game
						 </li>
					 </ul>
	 
					 <div>
						 <button
							 onClick={resetGame}
							 className={`mt-4 px-6 py-2 bg-lime-600 rounded-lg text-white font-medium border shadow-lg hover:bg-blue-700 transition ${
								 message.includes("won") && "animate-bounce"
							 }`}
						 >
							 New Game
						 </button>
					 </div>
				 </div>
				)}
      
      {message && (
        <div
          className={`mb-4 p-2 rounded-md text-center ${
            message.includes("won")
              ? "bg-green-100 text-green-800"
              : message.includes("over")
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-amber-800 px-6 py-9 w-[24rem] top-[16vh] rounded-3xl text-white shadow-lg border-2 border-white absolute left-5 hidden md:block">
        <h1 className="text-center text-2xl font-lucky pb-4">How to play {solution}</h1>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setNameLength(4)}
            className={`px-3 py-2 rounded-lg ${
              nameLength === 4 ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            4 Letters
          </button>
          <button
            onClick={() => setNameLength(5)}
            className={`px-3 py-2 rounded-lg ${
              nameLength === 5 ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            5 Letters
          </button>
          <button
            onClick={() => setNameLength(6)}
            className={`px-3 py-2 rounded-lg ${
              nameLength === 6 ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            6 Letters
          </button>
        </div>

        <p className="text-slate-900 bg-slate-200 p-2 font-sans rounded-md mb-5">
          To play this bible name game:
        </p>
        <ul className="flex flex-col gap-2 list-disc pl-5">
          <li>Guess the bible name by typing in the box</li>
          <p className="text-sm text-slate-300">
            Examples: {BIBLE_NAMES_BY_LENGTH[nameLength].slice(0, 3).join(", ")}...
          </p>
          <li>Currently playing with {nameLength}-letter names</li>
          <li>You have a total of 6 trials to guess</li>
          <li>
            Green color means word is{" "}
            <span className="text-lime-400 text-lg">CORRECT</span> and in the
            right position
          </li>
          <li>
            Yellow color means word is{" "}
            <span className="text-lime-400 text-lg">CORRECT</span> and in the
            wrong position
          </li>
          <li>
            Gray color means word is{" "}
            <span className="text-red-400 text-lg">WRONG</span> and does not
            apply in the game
          </li>
        </ul>

        <div>
          <button
            onClick={resetGame}
            className={`mt-4 px-6 py-2 bg-lime-600 rounded-lg text-white font-medium border shadow-lg hover:bg-blue-700 transition ${
              message.includes("won") && "animate-bounce"
            }`}
          >
            New Game
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-rows-6 gap-2 w-full max-w-lg">
        {message.includes("won") && (
          <div className="absolute top-1/2  mx-auto z-[99] w-[33%] flex flex-col items-center justify-center">
            <button
              onClick={resetGame}
              className={`mt-4 px-6 py-2 bg-lime-600 rounded-lg text-white font-medium border shadow-lg hover:bg-blue-700 transition ${
                message.includes("won") && "animate-bounce"
              }`}
            >
              New Game
            </button>
          </div>
        )}
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((g) => g === null);
          return (
            <div key={i} className={`grid grid-cols-${nameLength} gap-2`}>
              {Array(nameLength)
                .fill(null)
                .map((_, j) => {
                  const letter =
                    isCurrentGuess && j < currentGuess.length
                      ? currentGuess[j]
                      : guess?.[j] || "";
                  const status = guess ? getLetterStatus(letter, j) : "";

                  return (
                    <div
                      key={j}
                      className={`aspect-square ${
                        message.includes("won") && "opacity-20"
                      } flex items-center justify-center text-2xl font-bold rounded-xl 
                      ${
                        status === "correct"
                          ? "bg-green-500 text-white"
                          : status === "present"
                          ? "bg-yellow-500 text-white"
                          : status === "absent"
                          ? "bg-gray-500 text-white"
                          : "border-2 border-gray-300 bg-[#EB7B65] text-white text-3xl"
                      }`}
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}