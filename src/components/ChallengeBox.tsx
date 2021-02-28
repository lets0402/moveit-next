import React, { Fragment } from "react";
import styles from "../styles/components/ChallengeBox.module.css";
import { challengeContext } from "../contexts/challengeContext";
import { countdownContext } from "../contexts/CountdownContext";

export default function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
    CompleteChallenge,
  } = React.useContext(challengeContext);
  const { resetCountdown } = React.useContext(countdownContext);

  function handleChallengeSucceeded() {
    CompleteChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeboxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeboxActive}>
          <header>Ganhe {activeChallenge.amount}px</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Level Up" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeboxFailButton}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={handleChallengeSucceeded}
              className={styles.challengeboxSuccessButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeboxNotActive}>
          <strong>Finalize o ciclo para receber o desafio</strong>

          <p>
            <img src="icons/level-up.svg" alt="level" />
            Avança de Level completando desafio
          </p>
        </div>
      )}
    </div>
  );
}
