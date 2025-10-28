import { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import Pipes from './Pipes';
import wiliNormal from '../assets/wili-normal.png';
import wiliJump from '../assets/wili-jump.png';
import jesaNormal from '../assets/jesa-normal.png';
import jesaJump from '../assets/jesa-jump.png';

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_SPEED = 3;
const PIPE_GAP = 300;
const PIPE_WIDTH = 60; // must match .pipes width in CSS
const BIRD_X = 50; // bird's horizontal position
const BIRD_SIZE = 62; // bird image/container size (match .bird width in CSS)
const MIN_PIPE_GAP = 350; // minimum horizontal gap between successive pipes

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [birdPos, setBirdPos] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState([{ id: 1, height: 200, position: 400, scored: false }]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState<'wili' | 'jesa'>('wili');

  const jump = useCallback(() => {
    if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
      setBirdRotation(-45);
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 300); // Reset jump animation after 300ms
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      if (gameOver) {
        clearInterval(gameLoop);
        return;
      }

      // Update bird position
      setBirdPos((prev) => {
        const newPos = prev + birdVelocity;
        if (newPos < 0 || newPos > window.innerHeight) {
          setGameOver(true);
          return prev;
        }
        return newPos;
      });

      // Update bird velocity and rotation
      setBirdVelocity((prev) => prev + GRAVITY);
      setBirdRotation((prev) => Math.min(prev + 3, 90));

      // Update pipes (move, spawn, score, collision)
      setPipes((prevPipes) => {
        const moved = prevPipes.map((pipe) => ({ ...pipe, position: pipe.position - PIPE_SPEED }));

        // Check scoring and collision using moved positions
        moved.forEach((pipe) => {
          // scoring: when the pipe's right edge passes the bird X and not yet scored
          if (!pipe.scored && pipe.position + PIPE_WIDTH < BIRD_X) {
            pipe.scored = true;
            setScore((s) => s + 1);
          }

          // collision: check horizontal overlap and vertical collision
          const horizontallyOverlapping = pipe.position < BIRD_X + BIRD_SIZE && pipe.position + PIPE_WIDTH > BIRD_X;
          if (horizontallyOverlapping) {
            if (birdPos < pipe.height || birdPos > pipe.height + PIPE_GAP) {
              setGameOver(true);
            }
          }
        });

        // Remove pipes that are off screen
        let filtered = moved.filter((pipe) => pipe.position > -PIPE_WIDTH);

        // Add new pipe if needed (ensure minimum horizontal gap between pipes)
        const rightmost = filtered.length ? Math.max(...filtered.map((p) => p.position)) : -Infinity;
        if (filtered.length === 0 || rightmost < window.innerWidth - MIN_PIPE_GAP) {
          filtered.push({
            id: Date.now() + Math.random(),
            height: Math.random() * (window.innerHeight - PIPE_GAP - 100) + 50,
            position: window.innerWidth,
            scored: false,
          });
        }

        return filtered;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, birdPos, birdVelocity, pipes]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!gameStarted) {
          setGameStarted(true);
        }
        jump();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [gameStarted, jump]);

  return (
    <div className="game" onClick={jump}>
      {!gameStarted && (
        <div className="start-message">
          Press Space to Start
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <button
          onClick={() => {
            setGameStarted(false);
            setGameOver(false);
            setBirdPos(250);
            setBirdVelocity(0);
            setBirdRotation(0);
            setPipes([{ id: 1, height: 200, position: 400, scored: false }]);
            setScore(0);
          }}
          >
            Try Again
          </button>
        </div>
      )}
      <div className="score">Score: {score}</div>

      <div className="skin-menu">
        <label htmlFor="skin-select">Skin: </label>
        <select
          id="skin-select"
          value={selectedSkin}
          onChange={(e) => setSelectedSkin(e.target.value as 'wili' | 'jesa')}
        >
          <option value="wili">Wili</option>
          <option value="jesa">Jesa</option>
        </select>
      </div>

      <Bird
        position={birdPos}
        rotation={birdRotation}
        isJumping={isJumping}
        normalSrc={selectedSkin === 'jesa' ? jesaNormal : wiliNormal}
        jumpSrc={selectedSkin === 'jesa' ? jesaJump : wiliJump}
      />
      {pipes.map((pipe) => (
        <Pipes
          key={pipe.id}
          height={pipe.height}
          position={pipe.position}
          gap={PIPE_GAP}
        />
      ))}
    </div>
  );
};

export default Game;