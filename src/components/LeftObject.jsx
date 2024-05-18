import React, { useEffect } from 'react';
import useStore from '../store';
import './LeftObject.css';

const LeftObject = ({ id, type, weight, xPosition, yPosition }) => {
  const { updateWeights } = useStore();

  useEffect(() => {

    updateWeights(weight *  xPosition, 0); 

  }, [updateWeights]);
  

  return (
    <div className={`left-object ${type}`} style={{ left: `${xPosition}px`, top: `${-weight * 10}px`, width: `${weight * 10}px`, height: `${weight * 10}px` }}>
      <div className={type}></div>
      <span className="weight-text">{weight}</span>
    </div>
  );
};

export default LeftObject;
