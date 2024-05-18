import React from 'react';
import useStore from '../store'; 
import './ControlPanel.css';

const ControlPanel = () => {
  const { isSimulationPaused, pauseSimulation, resumeSimulation } = useStore();

  const handlePause = () => {
    pauseSimulation();
  };

  const handleResume = () => {
    resumeSimulation();
  };

  return (
    <div className="control-panel">
      <button onClick={handlePause} disabled={isSimulationPaused}>
        Pause
      </button>
      <button onClick={handleResume} disabled={!isSimulationPaused}>
        Resume
      </button>
    </div>
  );
};

export default ControlPanel;
