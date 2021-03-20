import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { stringify } from 'querystring';
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: challenge;
  startNewChallenge: () => void;
  resetChallenges: () => void;
  completeChallenge: () => void;
  closeLeveUpModal: () => void;
}

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallagesContext = createContext({} as ChallengesContextData);

export function ChallagesProvider({ 
  children,
  ...rest
}: ChallangesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, SetChallegesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, SetActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLeveUpModal(){
    setIsLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];

    SetActiveChallenge(challenge);

    new Audio('/notification.mp3').play;

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`
      });
    }
  }

  function resetChallenges() {
    SetActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    SetActiveChallenge(null);
    SetChallegesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallagesContext.Provider value={{
      level,
      levelUp,
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenges,
      completeChallenge,
      closeLeveUpModal
    }}>
      {children}
      {isLevelUpModalOpen &&
        <LevelUpModal/> }
    </ChallagesContext.Provider>
  )
}