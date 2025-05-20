'use client';
import './balloon.css'
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Constants = {
  gameDuration: 60,
  gameCells: 6,
  balloonWidth: 120,
  threadHeight: 50,
  randomnessLimits: { upper: 3000, lower: 1000 },
  balloonColor: "#9980FA",
  sounds: {
    pop: '/balloon-pop.wav',
    buzzer: '/buzzer2.wav'
  }
};

const Balloon = React.forwardRef(function Balloon(
  { id, color, isActive, onClick }, 
  ref
) {
  const [isPopped, setIsPopped] = useState(false);
 const popSoundRef = useRef(null);
  const buzzerSoundRef = useRef(null);

  useEffect(() => {
    // Preload sounds
    popSoundRef.current = new Audio(Constants.sounds.pop);
    buzzerSoundRef.current = new Audio(Constants.sounds.buzzer);
  }, []);


  const classNames = classnames("balloon balloon--moving", {
    "balloon--active": isActive,
    "balloon--popping": isPopped
  });

  const clickHandler = (e) => {
    if (!isPopped) {
      if (isActive) {
        setIsPopped(true);
        popSoundRef.current.currentTime = 0;
        popSoundRef.current.play();
        onClick();
      } else {
        buzzerSoundRef.current.currentTime = 0;
        buzzerSoundRef.current.play();
        onClick();
      }

      setTimeout(() => {
        setIsPopped(false);
      }, Constants.randomnessLimits.lower);
    }
  };

  const balloonWidth = Constants.balloonWidth;
  const balloonHeight = balloonWidth * 1.17;
  const threadHeight = Constants.threadHeight;

  return (
    <div className="balloon-cell">
      <div
        onClick={clickHandler}
        className={classNames}
        style={{ color: color }}
      >
        <svg
          className="balloon-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${balloonWidth} ${balloonHeight + threadHeight}`}
        >
          <defs>
            <radialGradient
              id={`balloon-gradient-${id}`}
              cx="40%"
              cy="40%"
              r="50%"
              fx="30%"
              fy="30%"
            >
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="currentColor" />
            </radialGradient>
          </defs>

          <rect
            x={balloonWidth / 2}
            y={balloonHeight}
            width="1"
            height={threadHeight}
            fill="currentColor"
          />
          <polygon
            points={`${balloonWidth / 2},${balloonHeight - 3} ${
              balloonWidth / 2 + 8
            },${balloonHeight + 5} ${balloonWidth / 2 - 8},${
              balloonHeight + 5
            }`}
            fill="currentColor"
          />
          <ellipse
            cx={balloonWidth / 2}
            cy={balloonHeight / 2}
            rx={balloonWidth / 2}
            ry={balloonHeight / 2}
            fill={`url(#balloon-gradient-${id})`}
            filter={`url(#balloon-shadow-${id})`}
          />
        </svg>
      </div>
    </div>
  );
});

const BalloonGrid = ({ numberOfBalloons, onBalloonClick }) => {
  const [activeBalloons, setActiveBalloons] = useState([]);

  const handleBalloonClick = (id) => {
    if (onBalloonClick) {
      onBalloonClick(id);
    }
  };

  useEffect(() => {
    const intervalIds = [];

    const generateRandomBalloon = () => {
      const randomBalloonId = Math.floor(Math.random() * numberOfBalloons);

      setActiveBalloons((prevActiveBalloons) => {
        if (prevActiveBalloons.includes(randomBalloonId)) {
          return prevActiveBalloons.filter(
            (activeId) => activeId !== randomBalloonId
          );
        } else {
          return [...prevActiveBalloons, randomBalloonId];
        }
      });
    };

    for (let i = 0; i < numberOfBalloons; i++) {
      const intervalId = setInterval(
        generateRandomBalloon,
        getRandomNumber(
          Constants.randomnessLimits.lower,
          Constants.randomnessLimits.upper
        )
      );
      intervalIds.push(intervalId);
    }

    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, []);

  const balloons = [];

  for (let i = 0; i < numberOfBalloons; i++) {
    balloons.push(
      <Balloon
        key={i}
        id={i}
        color={Constants.balloonColor}
        isActive={activeBalloons.includes(i)}
        onClick={() => handleBalloonClick(i)}
      />
    );
  }

  return (
    <div className="balloon-grid-wrapper">
      <p className="balloon-grid-caption">Click a balloon to score</p>
      <div className="balloon-grid">{balloons}</div>
    </div>
  );
};

const Game = ({ numberOfBalloons, gameDuration }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeBalloons, setActiveBalloons] = useState([]);
  const [score, setScore] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [stop, setStop] = useState(false);
  const [hit, setHit] = useState(false);

  const timerRef = useRef(null);
   const transitionRef = useRef(null);

  const handleBalloonClick = (id) => {
    setScore((prevScore) => prevScore + 1);
    setHit(true);
    setActiveBalloons((prevActiveBalloons) =>
      prevActiveBalloons.filter((activeId) => activeId !== id)
    );

    setTimeout(() => {
      setHit(false);
    }, Constants.randomnessLimits.lower);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setActiveBalloons([]);
    setTimeRemaining(gameDuration);
    setStop(false);
  };

  const stopGame = () => {
    setGameStarted(false);
    setStop(true);
  };

  useEffect(() => {
    if (gameStarted && !stop) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          if (prevTimeRemaining > 0) {
            return prevTimeRemaining - 1;
          } else {
            clearInterval(timerRef.current);
            setGameStarted(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [gameStarted, stop]);

  return (
    <div className="game-container" ref={transitionRef}>
      {(!gameStarted || stop) && (
        <CoverScreen
          score={score}
          onStartGame={startGame}
          duration={Constants.gameDuration}
        />
      )}
      <CSSTransition
        in={gameStarted}
        timeout={250}
        classNames="balloons-screen"
        mountOnEnter
        unmountOnExit
        nodeRef={transitionRef}
      >
        {(state) => (
          <div className={`balloons-screen balloons-screen--${state}`}>
            <div className="game-nav">
              <h1 className="game-title">Pop-a-balloon!</h1>
              <div className="game-settings">
                <ScoreCard score={score} time={timeRemaining} />
                <Button type={"alert"} onClick={stopGame}>
                  Stop
                </Button>
              </div>
            </div>
            <BalloonGrid
              numberOfBalloons={numberOfBalloons}
              activeBalloons={activeBalloons}
              onBalloonClick={handleBalloonClick}
            />
          </div>
        )}
      </CSSTransition>
      <Toast message={"+1 hits"} trigger={hit} />
    </div>
  );
};

const Button = ({ width, onClick, children }) => {
  const widthMap = {
    wide: "btn--wide",
    full: "btn--full"
  };
  const buttonClassNames = `btn ${widthMap[width] || ""}`;
  return (
    <button className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};

const Toast = ({ message, trigger }) => {
  const nodeRef = useRef(null);
  
  return (
    <CSSTransition
      in={trigger}
      timeout={250}
      classNames="toast"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <div ref={nodeRef} className={`toast toast--${state}`}>
          {message}
        </div>
      )}
    </CSSTransition>
  );
};

const ScoreCard = ({ score, time }) => {
  return (
    <div className="game-score">
      {score} hits / {time}s remaining
    </div>
  );
};

const CoverScreen = ({ score, onStartGame, duration }) => (
  <div className="intro">
    <h1 className="title">{score > -1 ? "Game over!" : "Pop-a-balloon! 🎈"}</h1>
    {score > -1 ? (
      <p className="description">
        {`You scored ${
          score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
        }`}
      </p>
    ) : (
      <p className="description">
        A small &amp; simple {duration}-second balloon game for your kids.
       
      </p>
    )}
    <div className="action">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
  </div>
);

const App = () => {
  return (
    <Game
      numberOfBalloons={Constants.gameCells}
      gameDuration={Constants.gameDuration}
    />
  );
};
export default App

// ReactDOM.render(<App />, document.querySelector("#root"));
