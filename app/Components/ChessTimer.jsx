import React, { useState, useEffect, useRef } from 'react';

const ChessTimer = ({ initialTime = 600, onTimeUp, player, onStart, onStop }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const currentPlayerRef = useRef(player); // Keep track of the current player

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingTime(prevTime => Math.max(0, prevTime - 1)); // Decrement time by 1 second
        if (prevTime === 1) { // Check for time up before decrementing to 0
          handleTimeUp();
        }
      }, 1000);
    }
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isRunning]);

  const handleTimeUp = () => {
    if (onTimeUp) onTimeUp(currentPlayerRef.current); // Call callback with current player
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to handle player change and switch timers
  const handlePlayerChange = (newPlayer) => {
    if (isRunning) { // Stop timer for previous player
      onStop(currentPlayerRef.current); // Call provided onStop function
    }
    setRemainingTime(initialTime); // Reset time for new player
    currentPlayerRef.current = newPlayer; // Update current player
    onStart(newPlayer); // Call provided onStart function
  };

  return (
    <div>
      <span>{formatTime(remainingTime)}</span>
      {remainingTime === 0 && <p>Time Up! ({currentPlayerRef.current})</p>}
    </div>
  );
};

export default ChessTimer;
