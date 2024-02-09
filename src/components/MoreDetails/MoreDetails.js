import React from 'react';
import styles from './MoreDetails.module.css';

function MoreDetails({ zone, dayYearN, dayWeek, weekN }) {
  return (
    <section className={`${styles.MoreDetailsWrapper}`}>
      <div className={`${styles.Group}`}>
        <div className={`${styles.SubGroup} ${styles.SubGroupOne}`}>
          <div className={`${styles.DataGroup}`}>
            <h1>CURRENT TIMEZONE</h1>
            <h2>{zone}</h2>
          </div>
          <div className={`${styles.DataGroup}`}>
            <h1>Day of the year</h1>
            <h2>{dayYearN}</h2>
          </div>
        </div>
        <div className={`${styles.SubGroup}`}>
          <div className={`${styles.DataGroup}`}>
            <h1>Day of the week</h1>
            <h2>{dayWeek}</h2>
          </div>
          <div className={`${styles.DataGroup}`}>
            <h1>Week number</h1>
            <h2>{weekN}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoreDetails;
