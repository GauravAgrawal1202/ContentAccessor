import React from 'react';
import styles from './Navbar.module.css';

type Props = {
  loggedIn: boolean;
  onLogout: () => void;
};

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        {/* Left icon - e.g. home / logo / menu */}
        <span className={styles.icon} title="Home / Menu">
          <img src="http://122.184.75.199:8501/assets/Bridgecloud-BetO-Mfe.svg" alt="" />
        </span>
      </div>

      <div className={styles.right}>
          <button 
            className={styles.logoutBtn}
          >
            <img src="http://122.184.75.199:8501/assets/miimansa-DEaZChlN.svg" alt="" />
          </button>
      </div>
    </nav>
  );
}