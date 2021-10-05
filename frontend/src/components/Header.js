import React, { useState, useEffect, useCallback } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const texts = [
    'Free shipping on US over $45!',
    'Zero waste on all packaging',
    'Summer discount up to 30%',
  ];

  // change header text every 3 s
  const [textIdx, setTextIdx] = useState(0);

  const shuffle = useCallback(() => {
    setTextIdx((prevIdx) => (prevIdx === texts.length - 1 ? 0 : prevIdx + 1));
  }, [texts.length]);

  useEffect(() => {
    let intervalId = setInterval(shuffle, 3000);
    return () => clearInterval(intervalId);
  }, [shuffle]);

  return (
    <header className="text-white bg-brown text-center">
      <div className="py-2 text-sm max-w-6xl m-auto">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={uuidv4()}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            classNames="transition"
          >
            <h5>{texts[textIdx]}</h5>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </header>
  );
};

export default Header;
