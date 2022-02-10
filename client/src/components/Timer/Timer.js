import { Schedule } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";

const Timer = ({
  initialMinute = 0,
  initialSeconds = 0,
  onComplete,
  currentTime,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    if (minutes === 0 && seconds === 59) {
      setOpenSnackBar(true);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, onComplete, seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 59) {
      setTimeout(() => {
        onComplete();
      }, 60000);
    }
    currentTime.current = `${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }, [currentTime, minutes, onComplete, seconds]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message="One (1) minute remaining!!! Make Sure You Complete All Questions!!!"
        key="topright"
        autoHideDuration={5000}
      />
      <div className="test-page__title-timer">
        <Schedule className="test-page__title-timer__icon" />
        <p
          className={`paragraph ${minutes === 0 && seconds <= 5 && "danger"} `}
        >
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} min
        </p>
      </div>
    </>
  );
};

export default Timer;
