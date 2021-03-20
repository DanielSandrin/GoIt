import { useContext } from 'react';
import { ChallagesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompleteChallenges.module.css';


export function CompleteChallenges(){

  const { challengesCompleted } = useContext(ChallagesContext)
  
  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}