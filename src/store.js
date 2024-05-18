import { create } from 'zustand';

const useStore = create((set) => ({
  teeterTotter: {
    angle: 0,
    maxBendingPercentage: 30,
    maxExtraWeight: 20,
    leftSideWeight: 0,
    rightSideWeight: 0,
  },
  fallingObjects: [],
  rightObjects: [],

  setTeeterTotterAngle: (angle) => {
    set((state) => ({
      teeterTotter: { ...state.teeterTotter, angle: isNaN(angle) ? 0 : angle },
    }));
  },

  addFallingObject: (object) =>
    set((state) => ({
      fallingObjects: [...state.fallingObjects, object],
    })),


  //changing the isAttached property
  updateFallingObject: (objectId, isAttached) =>
    set((state) => ({
      fallingObjects: state.fallingObjects.map((obj) =>
        obj.id === objectId ? { ...obj, isAttached } : obj
      ),
    })),

  updateFallingObjectPosition: (objectId, leftPosition, topPosition) =>
    set((state) => ({
      fallingObjects: state.fallingObjects.map((obj) =>
        obj.id === objectId ? { ...obj, leftPosition, topPosition } : obj
      ),
    })),

  addRightObject: (object) =>
    set((state) => ({
      rightObjects: [...state.rightObjects, object],
    })),

  updateWeights: (leftSideWeightChange, rightSideWeightChange) =>
    set((state) => {
      const leftSideWeight = state.teeterTotter.leftSideWeight + leftSideWeightChange;
      const rightSideWeight = state.teeterTotter.rightSideWeight + rightSideWeightChange;
      
      return {
        teeterTotter: {
          ...state.teeterTotter,
          leftSideWeight: isNaN(leftSideWeight) ? 0 : leftSideWeight,
          rightSideWeight: isNaN(rightSideWeight) ? 0 : rightSideWeight,
        },
      };
    }),

  pauseSimulation: () => set({ isSimulationPaused: true }),

  resumeSimulation: () => set({ isSimulationPaused: false }),
}));

useStore.subscribe((state) => {
  //some console logs used for testing
  //console.log("TeeterTotter:", state.teeterTotter);
  //console.log("Falling objects:", state.fallingObjects);
  //console.log("Right objects:", state.rightObjects);
});

export default useStore;
