import { useReducer } from "react";

import TrainingContext from "./training-context";

const defaultTrainingState = {
  exercises: [],
  totalNumOfRepetitions: 0,
  totalDurationInMins: 0,
};

const trainingReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedDurationInMins =
      state.totalDurationInMins + action.exercise.durationInMins*action.exercise.repetitions;
    const updatedTotalRepetitons =
      state.totalNumOfRepetitions + action.exercise.repetitions;

    let updatedExercises;
    const existedExerciseIndex = state.exercises.findIndex(
      (exercise) => exercise.id === action.exercise.id
    );
    const existedExercise = state.exercises[existedExerciseIndex];
    if (existedExercise) {
      const updatedExercise = {
        ...existedExercise,
        repetitions: existedExercise.repetitions + action.exercise.repetitions,
      };
      updatedExercises = [...state.exercises];
      updatedExercises[existedExerciseIndex] = updatedExercise;
    } else {
      updatedExercises = state.exercises.concat(action.exercise);
    }

    return {
      exercises: updatedExercises,
      totalNumOfRepetitions: updatedTotalRepetitons,
      totalDurationInMins: updatedDurationInMins,
    };
  }

  if(action.type === "CLEAR_EXERCISE"){
    const existingExerciseIndex = state.exercises.findIndex(exercise => exercise.id === action.id);
    const existedExercise = state.exercises[existingExerciseIndex];
    let updatedExercises = [...state.exercises];
    const updatedTotalRepetitons = state.totalNumOfRepetitions - existedExercise.repetitions;
    const updatedDurationInMins = state.totalDurationInMins - existedExercise.durationInMins*existedExercise.repetitions;
    updatedExercises.splice(existingExerciseIndex, 1);
    
    return{
      exercises: updatedExercises,
      totalNumOfRepetitions: updatedTotalRepetitons,
      totalDurationInMins: updatedDurationInMins
    }
  }

  if (action.type === "REMOVE") {
    const existingExerciseIndex = state.exercises.findIndex(
      (exercise) => exercise.id === action.id
    );
    const existingExercise = state.exercises[existingExerciseIndex];
    const updatedDurationInMins =
      state.totalDurationInMins - existingExercise.durationInMins;
    const updatedTotalRepetitons = state.totalNumOfRepetitions - 1;
    let updatedExercises;
    if (existingExercise.repetitions === 1) {
      updatedExercises = state.exercises.filter(
        (exercise) => exercise.id !== action.id
      );
    } else {
      const updatedExercise = {
        ...existingExercise,
        repetitions: existingExercise.repetitions - 1,
      };
      updatedExercises = [...state.exercises];
      updatedExercises[existingExerciseIndex] = updatedExercise;
    }
    return {
      exercises: updatedExercises,
      totalNumOfRepetitions: updatedTotalRepetitons,
      totalDurationInMins: updatedDurationInMins,
    };
  }
  if(action.type === "CLEAR"){
    return defaultTrainingState;
  }
  return defaultTrainingState;
};

const TrainingProvider = (props) => {
  const [trainingState, dispatchTrainingState] = useReducer(
    trainingReducer,
    defaultTrainingState
  );

  const addExerciseHandler = (exercise) => {
    dispatchTrainingState({ type: "ADD", exercise: exercise });
  };

  const removeExerciseHandler = (id) => {
    dispatchTrainingState({ type: "REMOVE", id: id });
  };

  const clearExerciseHandler = id => {
    dispatchTrainingState({type: "CLEAR_EXERCISE", id: id})
  }

  const clearListHandler = () => {
    dispatchTrainingState({type: "CLEAR"});
  }
  

  const trainingContext = {
    exercises: trainingState.exercises,
    totalNumOfRepetitions: trainingState.totalNumOfRepetitions,
    totalDurationInMins: trainingState.totalDurationInMins,
    addExercise: addExerciseHandler,
    removeExercise: removeExerciseHandler,
    clearExercise: clearExerciseHandler,
    clearList: clearListHandler,
  };

  return (
    <TrainingContext.Provider value={trainingContext}>
      {props.children}
    </TrainingContext.Provider>
  );
};

export default TrainingProvider;
