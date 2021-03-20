import { useContext } from 'react';
import { ChallagesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

  const { level } = useContext(ChallagesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/DanielSandrin.png" alt="Daniel Sandrin" />
      <div>
        <strong>Daniel Sandrin</strong>
        <p>
          <img src="icons/level.svg" alt="Lel" />
          Level {level}
        </p>
      </div>
    </div>
  );
}