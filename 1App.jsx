// App.jsx

import React, { useEffect } from 'react';
import TeeterTotter from './components/TeeterTotter';
import ControlPanel from './components/ControlPanel';
import FallingObject from './components/FallingObject';
import useStore from './store';

const App = () => {
  const { addFallingObject } = useStore();

  useEffect(() => {
    const generateFallingObject = () => {
      const types = ['triangle', 'circle', 'rectangle'];
      const teeterWidth = 500; // Width of the teeter totter itself
    
      // Calculate maximum position for falling objects (from the right edge of the teeter toter)
      const maxPosition = teeterWidth;
    
      // Generate random position within the range (from the right edge of the teeter toter)
      const position = Math.random() * maxPosition;
    
      // Add falling object on the right side
      addFallingObject({ type: types[Math.floor(Math.random() * types.length)], position });
    };

    const interval = setInterval(generateFallingObject, 7000); // Generate every 7 seconds

    return () => {
      clearInterval(interval);
    };
  }, [addFallingObject]);

  return (
    <div className="app">
      <TeeterTotter />
      <ControlPanel />
      <FallingObject />
    </div>
  );
};

export default App;
