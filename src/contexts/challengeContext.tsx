import React, { createContext, ReactNode } from "react";
import challenges from "../../challenges.json";
import Cookie from "js-cookie";
import LevelUpModal from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface challengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  LevelUp: () => void;
  startNewchallenge: () => void;
  resetChallenge: () => void;
  CompleteChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const challengeContext = createContext({} as challengesContextData);

interface challengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function ChallengesProvider({
  children,
  ...rest
}: challengesProviderProps) {
  const [level, setLevel] = React.useState(rest.level ?? 0);
  const [currentExperience, setCurrentExperience] = React.useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = React.useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = React.useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  React.useEffect(() => {
    Cookie.set("level", String(level));
    Cookie.set("currentExperience", String(currentExperience));
    Cookie.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function LevelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewchallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function CompleteChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      LevelUp();
    }

    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(finalExperience);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <challengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        LevelUp,
        startNewchallenge,
        resetChallenge,
        CompleteChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </challengeContext.Provider>
  );
}
