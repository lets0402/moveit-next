import styles from "../styles/components/ExperienceBar.module.css";
import { challengeContext } from "../contexts/challengeContext";''
import React from "react";

export const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = React.useContext(
    challengeContext
  );
  const parentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${parentToNextLevel}%` }}></div>
        <span
          className={styles.currentExperience}
          style={{ left: `${parentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
};
