import React, { createContext, ReactNode } from "react";
import { challengeContext } from "../contexts/challengeContext";

interface countdownContextData {
  time: number;
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const countdownContext = createContext({} as countdownContextData);

interface countdownProviderProps {
  children: ReactNode;
}

let countdownTimeout; //= NodeJS.Timeout;

export function CountdownProvider({ children }: countdownProviderProps) {
  const [time, setTime] = React.useState(1 * 5);
  const [isActive, setIsActive] = React.useState(false);
  const [hasFinished, setHasFinished] = React.useState(false);
  const { startNewchallenge } = React.useContext(challengeContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setTime(1 * 5);
    setIsActive(false);
    setHasFinished(false);
  }

  React.useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewchallenge();
    }
  }, [isActive, time]);

  return (
    <countdownContext.Provider
      value={{
        time,
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </countdownContext.Provider>
  );
}
