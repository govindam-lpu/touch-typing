import React, { useState, useEffect, useRef } from 'react';
import './TypingBox.css';

const TypingBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentKey, setCurrentKey] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [incorrectKeys, setIncorrectKeys] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [displayedKeys, setDisplayedKeys] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentKey(getRandomKey());
  }, []);

  useEffect(() => {
    if (isTypingStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTypingStarted]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    if (!isTypingStarted) {
      setIsTypingStarted(true);
    }
  };

  const handleKeyPress = (e) => {
    e.preventDefault();
    const key = e.key.toLowerCase();

    setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);

    if (key !== currentKey) {
      setIncorrectKeys((prevIncorrectKeys) => prevIncorrectKeys + 1);
    }
  };

  const handleKeyUp = () => {
    if (!isTypingStarted) {
      setIsTypingStarted(true);
    }
    setCurrentKey(getRandomKey());
    setDisplayedKeys((prevDisplayedKeys) => [...prevDisplayedKeys, currentKey]);
    setInputValue('');
  };

  const getRandomKey = () => {
    const keys = 'asdfjkl;';
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const calculateAccuracy = () => {
    const totalKeys = keysPressed;
    if (totalKeys === 0) {
      return 100;
    }
    const accuracy = (((totalKeys - incorrectKeys) / totalKeys) * 100).toFixed(2);
    return accuracy;
  };

  const accuracy = calculateAccuracy();

  return (
    <div className="typing-container">
      <h1>Touch Typing Practice</h1>
      <p>Keys pressed: {keysPressed}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Time elapsed: {timer} seconds</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyUp}
        ref={inputRef}
        className="typing-input"
        autoFocus
      />
      <div className="typing-display">
        <div className="current-key">
          <p>Current key: {currentKey}</p>
        </div>
        <div className="displayed-keys">
          <p>Displayed keys: {displayedKeys.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default TypingBox;

