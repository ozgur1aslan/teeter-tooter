import React, { useState, useEffect } from 'react';
import useStore from '../store';
import './FallingObject.css';
import '../App.css';

const FallingObject = ({ id, type, weight, xPosition, yPosition }) => {
  const { teeterTotter, updateFallingObject, setTeeterTotterAngle, updateFallingObjectPosition } = useStore();
  const { angle } = teeterTotter;

  //since we are using useStates here it becomes problematic when there are two falling objects at the same time.
  //so one needs to land before other fallingobject component is generated
  const [position, setPosition] = useState({ x: xPosition, y: yPosition });
  const [falling, setFalling] = useState(true);


  //this function returns corresponding y position of the teeter tooter according to object's x position
  const calculateTeeterTotterY = (x) => {
    if (angle === 0) return 500; // 500 is width and also height of container. it's also the sides width of the teeter tooter. when angle is 0 no need for trigonometry
    return angle > 0 ? 500 - ((500 - x) * Math.tan(angle * (Math.PI / 180))) : 500 + (x * Math.tan(angle * (Math.PI / 180)));
  };

  //this function returns corresponding x position of the teeter tooter according to its y position
  const calculateTeeterTotterX = (y, x) => {
    return angle !== 0 ? 500 - ((500 - y) * (1 / Math.tan(angle * (Math.PI / 180)))) : x;
  };




  //useEffect for changing x position of the falling object
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (falling) {
        if (event.key === 'ArrowLeft') {
          setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 5, y: prevPosition.y }));
        } else if (event.key === 'ArrowRight') {
          setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 5, y: prevPosition.y }));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [falling]);


  

  useEffect(() => {
    //console.log("FallingObject angle:", angle);

    if (falling) {
      const objectY = position.y;
      const teeterTotterY = calculateTeeterTotterY(position.x);

      //interval stops here. + 40 is for teeter tooter height
      if (objectY + 40 >= teeterTotterY) {
        //stopping the fall
        setFalling(false);

        //setting the isAttached property to true 
        updateFallingObject(id, true);

        //const teeterTotterX = calculateTeeterTotterX(position.y, position.x);
        const teeterTotterX = calculateTeeterTotterX(teeterTotterY, position.x);



        //updateFallingObjectPosition(id, teeterTotterX, teeterTotterY); //actually this should have worked. at least in theory...
        //for some reason unless I make these changes according to angle results are weird. but it's almost perfect like this
        //either there's a logic error somewhere or my trigonometry is not good enough
        if(angle > 0) {
          updateFallingObjectPosition(id, teeterTotterX - 15, teeterTotterY);
        } else if(angle < 0) {
          updateFallingObjectPosition(id, teeterTotterX - 500, teeterTotterY);
        } else {
          setPosition((prevPosition) => ({ ...prevPosition, x: teeterTotterX + 500 , y: teeterTotterY }));
        }

        
      } else {
        const fallInterval = setInterval(() => {
          setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
        }, 10);
        return () => clearInterval(fallInterval);
      }
    }
  }, [falling, position, id, updateFallingObject, setTeeterTotterAngle, angle]);

  return (
    <div
      className={`falling-object ${type}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${weight * 10}px`,
        height: `${weight * 10}px`,
      }}
    >
      <div className={type}></div>
      <span className="weight-text">{weight}</span>
    </div>
  );
};

export default FallingObject;
