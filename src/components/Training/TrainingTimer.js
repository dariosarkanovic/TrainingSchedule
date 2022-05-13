import React, { useContext, useState, useEffect } from "react";

import classes from "./TrainingTimer.module.css";
import TrainingContext from "../../store/training-context";

const TrainingTimer = (props) => {
  const trainingCtx = useContext(TrainingContext);

  const duration = props.duration;
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    if (
      Math.floor((duration - time / 60000) % 60) === 0 &&
      Math.floor((60 - time / 1000) % 60) === 0
    ) {
      setTime(0);
      setTimerOn(false);
      clearInterval(interval);
      trainingCtx.removeExercise(props.id);
    }

    return () => clearInterval(interval);
  }, [timerOn, time, duration, props.id, trainingCtx, props.time]);

  const progre = Math.floor(100 / ((duration * 60) / (time / 1000)));
  return (
    <div className={classes.container}>
      <div className={classes.progress} style={{ width: `${progre}%` }}>
        <div className={classes.Timers}>
          <h2>Stopwatch</h2>
          <div id={classes.display}>
            <span>
              {("0" + Math.floor(duration - ((time / 60000) % 60))).slice(-2)}:
            </span>
            <span>
              {time === 0
                ? "00"
                : ("0" + Math.floor(60 - ((time / 1000) % 60))).slice(-2)}
              :
            </span>
            <span>{("0" + (100 - ((time / 10) % 100))).slice(-2)}</span>
          </div>

          <div id={classes.buttons}>
            {!timerOn && time === 0 && (
              <button className={classes.stop} onClick={() => setTimerOn(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {timerOn && (
              <button
                className={classes.stop}
                onClick={() => setTimerOn(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {!timerOn && time > 0 && (
              <button className={classes.btns} onClick={() => setTime(0)}>
                Reset
              </button>
            )}
            {!timerOn && time > 0 && (
              <button className={classes.btns} onClick={() => setTimerOn(true)}>
                Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingTimer;
