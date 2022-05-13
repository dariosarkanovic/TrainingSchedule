import { Fragment } from "react";
import classes from "./Header.module.css";
import trainingWallpapper from "../../assets/training_img3.jpg";
import TrainingScheduleButton from "./TrainingScheduleButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Training Schedule</h1>
        <TrainingScheduleButton onShow={props.onShowTraining}>
          Your Training
        </TrainingScheduleButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={trainingWallpapper} alt="training wallpaper" />
      </div>
    </Fragment>
  );
};

export default Header;
