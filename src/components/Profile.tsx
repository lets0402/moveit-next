import React from "react";
import styles from "../styles/components/Profile.module.css";
import { challengeContext } from "../contexts/challengeContext";

export default function Profile() {
  const { level } = React.useContext(challengeContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fGZhY2V8ZW58MHwyfDB8"
        alt="usuário"
      />
      <div>
        <strong>Usuário</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
