import React, { useEffect, useRef, useState } from 'react';
import useStore from '../store';
import './TeeterTotter.css';
import FallingObject from './FallingObject';
import RightObject from './RightObject';
import LeftObject from './LeftObject';

const TeeterTotter = () => {
  const { teeterTotter, fallingObjects, rightObjects, setTeeterTotterAngle } = useStore();
  const { angle, leftSideWeight, rightSideWeight } = teeterTotter;

  const prevLeftSideWeight = useRef(leftSideWeight);
  const prevRightSideWeight = useRef(rightSideWeight);

  const [unattachedFallingObjects, setUnattachedFallingObjects] = useState([]);
  const [attachedFallingObjects, setAttachedFallingObjects] = useState([]);
  const [gameOver, setGameOver] = useState(false);


  
  useEffect(() => {
    //torque calculation and changing the angle
    const calculateTorque = () => {
      const torque = rightSideWeight - leftSideWeight;
      const scaleFactor = 250; //this is for adjusting the scale. bigger the number smaller the angle change
      const angleChange = torque / scaleFactor;
      //const newAngle = angle + angleChange;
      const newAngle = angleChange;

      ////some console logs used for testing
      //console.log("LEFT:", leftSideWeight);
      //console.log("RIGHT:", rightSideWeight);
      //console.log("New Angle:", newAngle);

      if (Math.abs(newAngle) >= 30 ) {
        //game over logic. currently it just sets gameOver state to true
        console.log('Game Over');
        setGameOver(true);
        return;
      }
      setTeeterTotterAngle(newAngle);
    };


    //whenever one side changes weight this invokes the function for calculating torque
    if (prevLeftSideWeight.current !== leftSideWeight || prevRightSideWeight.current !== rightSideWeight) {
      calculateTorque();
      prevLeftSideWeight.current = leftSideWeight;
      prevRightSideWeight.current = rightSideWeight;
    }
  }, [leftSideWeight, rightSideWeight, angle, setTeeterTotterAngle]);



  ////whenever falling objects list is changed filtered lists are updated
  //filtering for unattached objects
  useEffect(() => {
    const filteredFallingObjects = fallingObjects.filter(object => !object.isAttached);
    setUnattachedFallingObjects(filteredFallingObjects);
  }, [fallingObjects]);
  //filtering for attached objects
  useEffect(() => {
    const filteredForLeftObjects = fallingObjects.filter(object => object.isAttached);
    setAttachedFallingObjects(filteredForLeftObjects);
  }, [fallingObjects]);




  return (
    <div className="teeter-totter-container">

      <div className="weight-display">
        <div className="weight-info">Total Left Weight: {leftSideWeight}</div>
        <div className="weight-info">New Angle: {angle}</div>
        <div className="weight-info">Total Right Weight: {rightSideWeight}</div>
      </div>
      
      {gameOver && <div className="game-over-message">Game Over</div>}
      <div className="teeter-totter" style={{ transform: `rotate(${angle}deg)` }}>
        <div className="left-side"></div>
        <div className="right-side">
          {rightObjects.map((object, index) => (
            <RightObject key={index} {...object} />
          ))}
        </div>
        <div className="center-handle"></div>

        {attachedFallingObjects.map((object, index) => (
          <LeftObject key={index} {...object} />
        ))}
      </div>

      {unattachedFallingObjects.map((object, index) => (
        <FallingObject key={index} {...object} />
      ))}

    </div>
  );
};

export default TeeterTotter;
