import React, { useEffect } from 'react';
import TeeterTotter from './components/TeeterTotter';
import ControlPanel from './components/ControlPanel';
import useStore from './store';

const App = () => {
  const { addFallingObject, addRightObject } = useStore();

  useEffect(() => {
    //console.log("test: ")



    //right-side object
    const generateRightObject = () => {
      const types = ['triangle', 'circle', 'rectangle'];

      //random weight between 1 and 5
      const weightRight = Math.floor(Math.random() * 5) + 1;

      //right side width of teeter tooter
      const rightWidth = 500;

      //this is for random initial x position of the object 
      const rightPosition = (Math.random() * ( rightWidth - (weightRight * 10) ) ); //weightRight * 10 this is width of the object

      addRightObject({
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        xPosition: rightPosition,
        yPosition: -weightRight * 10,
        weight: weightRight
      });
    };



    //falling object, similar logic
    const generateFallingObject = () => {
      const types = ['triangle', 'circle', 'rectangle'];

      const weightLeft = Math.floor(Math.random() * 5) + 1;

      const leftWidth = 500;

      const leftPosition = (Math.random() * ( leftWidth - (weightLeft * 10) ) );
      const topPosition = 0;
      //const endTop = -weightLeft * 10;

      addFallingObject({
        id: Date.now() + 1,
        type: types[Math.floor(Math.random() * types.length)],
        xPosition: leftPosition,
        yPosition: topPosition,
        weight: weightLeft,
        isAttached: false, //starts as unattached so it can fall after generated
      });
    };


    //generateRightObject();
    //generateFallingObject();
    
    const rightInterval = setInterval(generateRightObject, 7000); 
    const leftInterval = setInterval(generateFallingObject, 7000); 

    return () => {
      clearInterval(rightInterval);
      clearInterval(leftInterval);
    };
  }, [addFallingObject, addRightObject]);

  return (
    <div className="app">
      <TeeterTotter />
      <ControlPanel />
    </div>
  );
};

export default App;
