import { Fragment } from "react";

import AvailableExercise from "./AvailableExercises";
import WorkoutSummary from "./WorkoutSummary";

const Exercises = () => {
  return (
    <Fragment>
      <WorkoutSummary />
      <AvailableExercise />
    </Fragment>
  );
};

export default Exercises;
