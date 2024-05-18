import React, { useEffect } from 'react';
import useStore from '../store';
import './RightObject.css';

const RightObject = ({ id, type, weight, xPosition, yPosition }) => {
  const { updateWeights } = useStore();

  useEffect(() => {
    
    updateWeights(0, weight * xPosition); 

  
  }, [updateWeights]);
  

  return (
    <div className={`right-object ${type}`} style={{ left: `${xPosition}px`, top: `${yPosition}px`, width: `${weight * 10}px`, height: `${weight * 10}px` }}>
      <div className={type}></div>
      <span className="weight-text">{weight}</span>
    </div>
  );
};

export default RightObject;
