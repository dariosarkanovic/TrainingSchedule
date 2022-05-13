import { useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableExercise.module.css";
import ExerciseItem from "./ExerciseItem/ExerciseItem";
import NewExercise from "./NewExercise/NewExercise";

const DUMMY_EXERCISE = [
  {
    id: "a1",
    name: "Running",
    description: "Exercise for cardio",
    repetitions: 0,
    durationInMins: 20,
  },
  {
    id: "a2",
    name: "Squatting",
    description: "Exercise for legs",
    repetitions: 0,
    durationInMins: 10,
  },
  {
    id: "a3",
    name: "ABS",
    description: "Exercise for stomach",
    repetitions: 0,
    durationInMins: 10,
  },
  {
    id: "a4",
    name: "Plank",
    description: "Exercise for endurance",
    repetitions: 0,
    durationInMins: 1,
  },
];

const AvailableExercise = (props) => {
  const [exercises, setExercises] = useState(DUMMY_EXERCISE);

  const addNewExerciseHandler = (exercise) => {
    setExercises((prevExercises) => {
      return [exercise, ...prevExercises];
    });
  };

  const exerciseList = exercises.map((exercise) => (
    <ExerciseItem
      key={exercise.id}
      id={exercise.id}
      name={exercise.name}
      description={exercise.description}
      durationInMins={exercise.durationInMins}
      repetitions={exercise.repetitions}
    />
  ));

  return (
    <section className={classes.exercise}>
      <NewExercise onAddNewExercise={addNewExerciseHandler} />
      <Card>
        <ul>{exerciseList}</ul>
      </Card>
    </section>
  );
};

export default AvailableExercise;
