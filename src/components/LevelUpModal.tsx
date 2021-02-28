import React from "react";
import styles from "../styles/components/LevelUpModal.module.css";
import { challengeContext } from "../contexts/challengeContext";

export default function LevelUpModal() {
  const { level, closeLevelUpModal } = React.useContext(challengeContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal" />
        </button>
      </div>
      ;
    </div>
  );
}
