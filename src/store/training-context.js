import React from "react";

const TrainingContext = React.createContext({
    exercises: [],
    totalNumOfRepetitions: 0,
    totalDurationInMins: 0,
    addExercise: (exercise) => {},
    removeExercise: (id) => {},
    clearExercise: (id) => {},
    clearList: () => {}
});

export default TrainingContext;