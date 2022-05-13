import { useRef, useState } from "react";

import classes from "./ExerciseRepetitionForm.module.css";

const ExerciseRepetitionForm = (props) => {
  const inputRef = useRef();

  const [repetitions, setRepetitions] = useState(1);

  const repetitionHandler = (event) => {
    setRepetitions(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredRepetitions = inputRef.current.value;
    const enteredRepetitionsNumber = +enteredRepetitions;
    props.onAddToTraining(enteredRepetitionsNumber);
    setRepetitions(1);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor="repetitions">Repetitions</label>
      <input
        id="repetitions"
        type="number"
        min="1"
        step="1"
        value={repetitions}
        ref={inputRef}
        onChange={repetitionHandler}
      />
      <button>+Add</button>
    </form>
  );
};

export default ExerciseRepetitionForm;
