import React from "react";
import styles from "../styles/components/CompletedChallenges.module.css";
import { challengeContext } from "../contexts/challengeContext";

export default function CompletedChallenges() {
  const { challengesCompleted } = React.useContext(challengeContext);
  return (
    <div className={styles.CompletedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
