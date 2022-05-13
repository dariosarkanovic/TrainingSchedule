import { useContext, useEffect, useState } from "react";

import TrainingContext from "../../store/training-context";
import classes from "./TrainingScheduleButton.module.css";

const TrainingScheduleButton = (props) => {
  const trainingCtx = useContext(TrainingContext);
  const [isAdded, setIsAdded] = useState(false);
  const classBtn = `${classes.button} ${isAdded ? classes.bump : ""}`;

  useEffect(() => {
    if (trainingCtx.totalNumOfRepetitions === 0) return;
    setIsAdded(true);

    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [trainingCtx.totalNumOfRepetitions]);

  return (
    <button className={classBtn} onClick={props.onShow}>
      <span>{props.children}</span>

      <span className={classes.badge}>
        {trainingCtx.totalNumOfRepetitions} rep
      </span>
      <span className={classes.badge}>
        {trainingCtx.totalDurationInMins} min
      </span>
    </button>
  );
};

export default TrainingScheduleButton;
