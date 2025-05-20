"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  balloonColor: "#9980FA"
};

const Balloon = React.memo(function Balloon({ id, color, isActive, onClick }) {
  const [isPopped, setIsPopped] = useState(false);

  const classNames = classnames("balloon balloon--moving", {
    "balloon--active": isActive,
    "balloon--popping": isPopped
  });

  const clickHandler = useCallback((e) => {
    if (!isPopped) {
      setIsPopped(true);
      onClick();

      setTimeout(() => {
        setIsPopped(false);
      }, Constants.randomnessLimits.lower);
    }
  }, [isPopped, onClick]);

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

Balloon.displayName = 'Balloon';

const BalloonGrid = React.memo(function BalloonGrid({ numberOfBalloons, onBalloonClick }) {
  const [activeBalloons, setActiveBalloons] = useState([]);

  const handleBalloonClick = useCallback((id) => {
    if (onBalloonClick) {
      onBalloonClick(id);
    }
  }, [onBalloonClick]);

  useEffect(() => {
    const intervalIds = [];
    const balloonIds = Array.from({ length: numberOfBalloons }, (_, i) => i);

    const generateRandomBalloon = () => {
      const randomBalloonId = balloonIds[Math.floor(Math.random() * balloonIds.length)];

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

    balloonIds.forEach((id) => {
      const intervalId = setInterval(
        generateRandomBalloon,
        getRandomNumber(
          Constants.randomnessLimits.lower,
          Constants.randomnessLimits.upper
        )
      );
      intervalIds.push(intervalId);
    });

    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [numberOfBalloons]);

  return (
    <div className="balloon-grid-wrapper">
      <p className="balloon-grid-caption">Click a balloon to score</p>
      <div className="balloon-grid">
        {Array.from({ length: numberOfBalloons }, (_, i) => (
          <Balloon
            key={i}
            id={i}
            color={Constants.balloonColor}
            isActive={activeBalloons.includes(i)}
            onClick={() => handleBalloonClick(i)}
          />
        ))}
      </div>
    </div>
  );
});

BalloonGrid.displayName = 'BalloonGrid';

function Game({ numberOfBalloons, gameDuration }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [stop, setStop] = useState(false);
  const [hit, setHit] = useState(false);

  const timerRef = useRef(null);

  const handleBalloonClick = useCallback((id) => {
    setScore((prevScore) => prevScore + 1);
    setHit(true);
    setTimeout(() => {
      setHit(false);
    }, Constants.randomnessLimits.lower);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setTimeRemaining(gameDuration);
    setStop(false);
  }, [gameDuration]);

  const stopGame = useCallback(() => {
    setGameStarted(false);
    setStop(true);
  }, []);

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
    <div className="game-container">
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
              onBalloonClick={handleBalloonClick}
            />
          </div>
        )}
      </CSSTransition>
      <Toast message={"+1 hits"} trigger={hit} />
    </div>
  );
}

Game.displayName = 'Game';

const Button = React.memo(function Button({ width, onClick, children }) {
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
});

Button.displayName = 'Button';

const Toast = React.memo(function Toast({ message, trigger }) {
  return (
    <CSSTransition
      in={trigger}
      timeout={250}
      classNames="toast"
      mountOnEnter
      unmountOnExit
    >
      {(state) => <div className={`toast toast--${state}`}>{message}</div>}
    </CSSTransition>
  );
});

Toast.displayName = 'Toast';

const ScoreCard = React.memo(function ScoreCard({ score, time }) {
  return (
    <div className="game-score">
      {score} hits / {time}s remaining
    </div>
  );
});

ScoreCard.displayName = 'ScoreCard';

const CoverScreen = React.memo(function CoverScreen({ score, onStartGame, duration }) {
  return (
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
          A small &amp; simple {duration}-second balloon game built with React.
          Find the <a href="//github.com/c99rahul/pop-a-balloon/" target="_blank" rel="noopener noreferrer">source here</a>.
        </p>
      )}
      <div className="action">
        <Button onClick={onStartGame} width={"wide"}>
          {score > -1 ? "Play again" : "Start Game"}
        </Button>
      </div>
    </div>
  );
});

CoverScreen.displayName = 'CoverScreen';

export default Game;