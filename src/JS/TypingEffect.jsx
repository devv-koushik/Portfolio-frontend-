import React, { useState, useEffect } from 'react';

const words = ["Web Developer", "Programmer", "Web Designer", "Editor", "Software Developer"];

const TypingEffect = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return; // Do nothing while paused — the pause timer handles the transition

    const type = () => {
      const currentFullWord = words[wordIndex];
      if (!isDeleting) {
        // Typing forward
        if (charIndex < currentFullWord.length) {
          setCurrentWord(prev => prev + currentFullWord.charAt(charIndex));
          setCharIndex(prev => prev + 1);
        } else {
          // Finished typing — pause 1 second before starting to delete
          setIsPausing(true);
          setTimeout(() => {
            setIsPausing(false);
            setIsDeleting(true);
          }, 1000);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setCurrentWord(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to the next word
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 150;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer); // Cleanup function
  }, [wordIndex, charIndex, isDeleting, isPausing]);

  return (
    <div className="typing-text">
      <span>{currentWord}</span>
      <span className="cursor">|</span> {/* This is your blinking cursor */}
    </div>
  );
};

export default TypingEffect;