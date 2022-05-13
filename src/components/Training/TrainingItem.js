import { useEffect, useState } from "react";

import classes from "./TrainingItem.module.css";

import TrainingTimer from "./TrainingTimer";

const TrainingItem = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (props.repetitions === 0) return;
    setIsClicked(true);
    const timer = setTimeout(() => {
      setIsClicked(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [props.repetitions]);

  const repetitionClass = `${classes.repetitions} ${
    isClicked ? classes.bump : ""
  }`;

  return (
    <li className={classes["exercise-item"]}>
      <div className={classes.summary}>
        <h2>{props.name}</h2>
        <div>
          <span className={classes.description}>{props.description}</span>
        </div>
      </div>
      <div className={classes.player}>
        <TrainingTimer id={props.id} duration={props.duration} />
      </div>

      <div className={classes.actions}>
        <div>
          <span className={classes.duration}>{props.duration}min</span>
          <p className={repetitionClass}>x {props.repetitions} reps</p>
          <span className={classes["total-exercise-duration"]}>
            Total: {props.duration * props.repetitions}min
          </span>
        </div>
        <div className={classes["action-btns"]}>
          <button onClick={props.onAdd}>+</button>
          <button onClick={props.onRemove}>-</button>
        </div>
        <div className={classes.clear}>
          <button onClick={props.onClear}>clear</button>
        </div>
      </div>
    </li>
  );
};

export default TrainingItem;
