import { useState, useEffect, useContext } from 'react';
import { ChallagesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {

  const { minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown} = useContext(CountdownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRigth] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRigth}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.CountdownButton}>
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button type="button" onClick={resetCountdown}
                className={`${styles.CountdownButton} ${styles.countdownButtonActive}`}>
                Abandonar ciclo
              </button>
            ) : (
                <button type="button" onClick={startCountdown}
                  className={styles.CountdownButton}>
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  );
}