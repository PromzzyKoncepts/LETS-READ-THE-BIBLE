"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./WordScrambleGame.module.css";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

const words = [
  {
    word: "addition",
    hint: "The process of adding numbers",
  },
  {
    word: "meeting",
    hint: "Event in which people come together",
  },
  {
    word: "number",
    hint: "Math symbol used for counting",
  },
  {
    word: "exchange",
    hint: "The act of trading",
  },
  {
    word: "canvas",
    hint: "Piece of fabric for oil painting",
  },
  {
    word: "garden",
    hint: "Space for planting flower and plant",
  },
  {
    word: "position",
    hint: "Location of someone or something",
  },
  {
    word: "feather",
    hint: "Hair like outer covering of bird",
  },
  {
    word: "comfort",
    hint: "A pleasant feeling of relaxation",
  },
  {
    word: "tongue",
    hint: "The muscular organ of mouth",
  },
  {
    word: "expansion",
    hint: "The process of increase or grow",
  },
  {
    word: "country",
    hint: "A politically identified region",
  },
  {
    word: "group",
    hint: "A number of objects or persons",
  },
  {
    word: "taste",
    hint: "Ability of tongue to detect flavour",
  },
  {
    word: "store",
    hint: "Large shop where goods are traded",
  },
  {
    word: "field",
    hint: "Area of land for farming activities",
  },
  {
    word: "friend",
    hint: "Person other than a family member",
  },
  {
    word: "pocket",
    hint: "A bag for carrying small items",
  },
  {
    word: "needle",
    hint: "A thin and sharp metal pin",
  },
  {
    word: "expert",
    hint: "Person with extensive knowledge",
  },
  {
    word: "statement",
    hint: "A declaration of something",
  },
  {
    word: "second",
    hint: "One-sixtieth of a minute",
  },
  {
    word: "library",
    hint: "A place containing collection of books",
  },
];

export default function WordScrambleGame() {
  const [scrambledWord, setScrambledWord] = useState("");
  const [hint, setHint] = useState("");
  const [correctWord, setCorrectWord] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [userInput, setUserInput] = useState("");
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const timerRef = useRef(null);
  const currentWordRef = useRef("");
  const modalRef = useRef(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ],
    });
  };

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const initTimer = useCallback(
    (maxTime) => {
      clearTimer();
      setTimeLeft(maxTime);

      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearTimer();
            setShowTimeUpModal(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    },
    [clearTimer]
  );

  const initGame = useCallback(() => {
    setShowTimeUpModal(false);
    setShowCorrectModal(false);
    setShowWrongModal(false);
    clearTimer();

    const randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    // Scramble the word
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    const newWord = randomObj.word.toLowerCase();
    setScrambledWord(wordArray.join(""));
    setHint(randomObj.hint);
    setCorrectWord(randomObj.word.toLowerCase());
    currentWordRef.current = newWord;
    setUserInput("");
    initTimer(30);
  }, [initTimer, clearTimer]);

  useEffect(() => {
    initGame();
    return () => clearTimer();
  }, []);

  const checkWord = () => {
    const userWord = userInput.toLowerCase();
    if (!userWord) {
      toast.error("Please enter the word to check!");
      return;
    }
    if (userWord !== correctWord) {
      clearTimer();
      setShowWrongModal(true);
    } else {
      clearTimer();
      fireConfetti();
      setShowCorrectModal(true);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkWord();
    }
  };

  const handlePlayAgain = () => {
    initGame();
  };

  // Auto-close modals after 5 seconds with countdown
  useEffect(() => {
    if (showTimeUpModal || showCorrectModal || showWrongModal) {
      let countdown = 5;
      setTimeLeft(countdown);

      const timer = setInterval(() => {
        countdown -= 1;
        setTimeLeft(countdown);

        if (countdown <= 0) {
          clearInterval(timer);
          initGame();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showTimeUpModal, showCorrectModal, showWrongModal, initGame]);

  return (
    <div className="bg-amber-500">
      <Toaster position="bottom-center" />

      {/* Time Up Modal */}
      {showTimeUpModal && (
        <div className={styles.modalOverlay}>
          <div
            ref={modalRef}
            className={`${styles.modal} ${
              showTimeUpModal ? styles.modalEnter : ""
            }`}
          >
            <div className={styles.modalContent}>
              <h3>⏰ Oops, Time is Up!</h3>
              <p>The correct answer was:</p>

              <div className={styles.correctAnswer}>
                {correctWord.toUpperCase()}
              </div>

              <div className={styles.countdown}>
                Refreshing game in{" "}
                <span className={styles.countdownNumber}>
                  {timeLeft > 0 ? timeLeft : 5}
                </span>
              </div>

              <div className={styles.modalButtons}>
                <button
                  onClick={handlePlayAgain}
                  className={styles.playAgainButton}
                >
                  Play Again Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Correct Answer Modal */}
      {showCorrectModal && (
        <div className={styles.modalOverlay}>
          <div
            ref={modalRef}
            className={`${styles.modal} ${
              showCorrectModal ? styles.modalEnter : ""
            }`}
          >
            <div className={styles.modalContent}>
              <h3>🎉 Correct Answer!</h3>
              <p>You guessed it right:</p>

              <div className={styles.correctAnswer}>
                {correctWord.toUpperCase()}
              </div>

              <div className={styles.countdown}>
                Next word in{" "}
                <span className={styles.countdownNumber}>
                  {timeLeft > 0 ? timeLeft : 5}
                </span>
              </div>

              <div className={styles.modalButtons}>
                <button
                  onClick={handlePlayAgain}
                  className={styles.playAgainButton}
                >
                  Next Word Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto flex flex-col items-center justify-center h-screen">

        {/* Wrong Answer Modal */}
        {showWrongModal && (
          <div className={styles.modalOverlay}>
            <div
              ref={modalRef}
              className={`${styles.modal} ${
                showWrongModal ? styles.modalEnter : ""
              }`}
            >
              <div className={styles.modalContent}>
                <h3>❌ Wrong Answer</h3>
                <p>The correct answer was:</p>

                <div className={styles.correctAnswer}>
                  {correctWord.toUpperCase()}
                </div>

                <div className={styles.countdown}>
                  Trying again in{" "}
                  <span className={styles.countdownNumber}>
                    {timeLeft > 0 ? timeLeft : 5}
                  </span>
                </div>

                <div className={styles.modalButtons}>
                  <button
                    onClick={handlePlayAgain}
                    className={styles.playAgainButton}
                  >
                    Try Again Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="font-sniglet shadow-lg rounded-xl bg-lime-400 px-10 py-8 max-w-3xl min-w-2xl mx-auto">
          <h2 className="text-2xl md:text-6xl px-3 text-center font-lucky">Word Scramble</h2>
          <div className={styles.content}>
            <div className="animate-jump animate-thrice animate-delay-1000 duration-500 animate-duration-1000 animate-ease-in-out "> <p className={styles.word}>{scrambledWord}</p></div>
            <div className={styles.details}>
              <p>
                Hint: <span className="italic ">{hint}</span>
              </p>
              <p className="bg-neutral-400 rounded-md p-4">
                Time Left:{" "}
                <span>
                  <b>{timeLeft}</b>s
                </span>
              </p>
            </div>
            <input
              type="text"
              spellCheck="false"
              placeholder="Enter a valid word"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              maxLength={correctWord.length}
            />
            <div className={styles.buttons}>
              <button className={`!rounded-2xl bg-slate-500 hover:bg-slate-600`} onClick={initGame}>
                Refresh Word
              </button>
              <button className='bg-orange-500 !rounded-2xl' onClick={checkWord}>
                Check Word
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
