import React, { Fragment } from "react";
import styles from "../styles/components/Countdown.module.css";
import { countdownContext } from "../contexts/CountdownContext";

export default function Countdown() {
  const {
    isActive,
    hasFinished,
    minutes,
    seconds,
    startCountdown,
    resetCountdown,
  } = React.useContext(countdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <Fragment>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar o Ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar o Ciclo
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
}
