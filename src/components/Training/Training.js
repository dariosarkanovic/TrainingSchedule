import { useContext } from "react";

import TrainingContext from "../../store/training-context";
import Modal from "../UI/Modal";
import classes from "./Training.module.css";
import TrainingItem from "./TrainingItem";
const Training = (props) => {
  const trainingCtx = useContext(TrainingContext);

  const removeHandler = (id) => {
    trainingCtx.removeExercise(id);
  };

  const addHandler = (exercise) => {
    trainingCtx.addExercise({ ...exercise, repetitions: 1 });
  };

  const clearHandler = (id) => {
    trainingCtx.clearExercise(id);
  };

  const trainingList = (
    <ul className={classes["training-items"]}>
      {trainingCtx.exercises.map((exercise) => (
        <TrainingItem
          key={exercise.id}
          id={exercise.id}
          name={exercise.name}
          description={exercise.description}
          duration={exercise.durationInMins}
          repetitions={exercise.repetitions}
          onRemove={removeHandler.bind(null, exercise.id)}
          onAdd={addHandler.bind(null, exercise)}
          onClear={clearHandler.bind(null, exercise.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes["training-header"]}>Your Training:</h1>
      {trainingList}
      <div className={classes.total}>
        <div className={classes.tot}>
          <span>Total repetitions:</span>
          <p className={classes.reps}>{trainingCtx.totalNumOfRepetitions}</p>
        </div>
        <div className={classes.tot}>
          <span>Total duration:</span>
          <p className={classes.duration}>
            {trainingCtx.totalDurationInMins}min
          </p>
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={props.onClose}>Close</button>
        {trainingCtx.exercises.length !== 0 && (
          <button onClick={trainingCtx.clearList}>Clear all</button>
        )}
      </div>
    </Modal>
  );
};

export default Training;
