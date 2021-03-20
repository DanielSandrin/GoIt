import { useContext } from 'react';
import { ChallagesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenges, completeChallenge } = useContext(ChallagesContext);
  const {resetCountdown} = useContext(CountdownContext);
  
  const hasActiveChallenge = true;

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenges();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>{activeChallenge.amount}</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button type="button" onClick={handleChallengeFailed} 
            className={styles.challengeFailButton}>
              Falhei
            </button>
            <button type="button" onClick={handleChallengeSucceeded} 
            className={styles.challengeSucceededButton}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>
              Finalize um cilco para receber um desafio
        </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level-Up" />
          Avance de level completando desafios
        </p>
          </div>
        )}
    </div>
  )
}