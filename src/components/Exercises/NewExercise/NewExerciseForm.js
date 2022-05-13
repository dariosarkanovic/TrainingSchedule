import { useState } from "react";

import classes from "./NewExerciseForm.module.css";

const NewExerciseForm = (props) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const submitHanlder = (event) => {
    event.preventDefault();

    if (name.trim() === "" || duration.trim() === "") {
      setError(true);
      return;
    }
    const NewExercise = {
      name: name,
      durationInMins: duration,
      repetitions: 0,
      description: description,
    };

    props.onAddNew(NewExercise);
    setDuration("");
    setName("");
    setDescription("");
    setError(false);
  };

  return (
    <form onSubmit={submitHanlder}>
      <div className={classes["new-exercise-controls"]}>
        <label htmlFor="name">Exercise Name:</label>
        <input type="text" id="name" value={name} onChange={onNameChange} />
        <label htmlFor="duration">Duration (min):</label>
        <input
          type="number"
          id="duration"
          min="1"
          value={duration}
          onChange={onDurationChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="textarea"
          id="description"
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div className={classes.actions}>
        <button>Add</button>
        <button onClick={props.onCloseForm}>Close</button>
      </div>
      {error && <p>Please fill all input fields.</p>}
    </form>
  );
};

export default NewExerciseForm;
