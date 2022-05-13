import { useContext } from "react";

import TrainingContext from "../../../store/training-context";
import ExerciseRepetitionForm from "./ExerciseRepetitionForm";
import classes from "./ExerciseItem.module.css";

const ExerciseItem = (props) => {
  const trainingCtx = useContext(TrainingContext);

  const addToTrainingHandler = (repetitions) => {
    trainingCtx.addExercise({
      id: props.id,
      name: props.name,
      description: props.description,
      durationInMins: props.durationInMins,
      repetitions: repetitions,
    });
  };

  return (
    <li className={classes.exercise}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.duration}>{`${props.durationInMins}min`}</div>
      </div>
      <div>
        <ExerciseRepetitionForm
          id={props.id}
          onAddToTraining={addToTrainingHandler}
        />
      </div>
    </li>
  );
};

export default ExerciseItem;
