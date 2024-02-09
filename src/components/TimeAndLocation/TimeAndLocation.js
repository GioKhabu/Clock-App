import React from 'react';
import styles from './TimeAndlocation.module.css';
import Sun from '../../assets/desktop/icon-sun.svg';
import Moon from '../../assets/desktop/icon-moon.svg';
import ArrowUp from '../../assets/desktop/new_arrwo_up.svg';
import ArrowDown from '../../assets/desktop/new_arrwo_down.svg';

function TimeAndLocation({ openState, setOpenState, hours, minutes, dst, country, city }) {
  const [partOfDay, setPartOfDay] = React.useState('');
  const [hoursN, setHoursN] = React.useState('');
  const [minutesN, setMinutesN] = React.useState('');

  React.useEffect(() => {
    if ((hours > 5) & (hours < 11)) {
      setPartOfDay('Good Morgning');
    } else if ((hours > 11) & (hours < 18)) {
      setPartOfDay('Good Afternoon');
    } else {
      setPartOfDay('Good Evening');
    }
  }, [hours]);
  React.useEffect(() => {
    if (hours < 10) {
      setHoursN(`0${hours}`);
    } else {
      setHoursN(`${hours}`);
    }
    if (minutes < 10) {
      setMinutesN(`0${minutes}`);
    } else {
      setMinutesN(`${minutes}`);
    }
  }, [hours, minutes]);
  return (
    <section className={`${styles.TimeAndLocationWrapper}`}>
      <div className={`${styles.Group}`}>
        <div className={`${styles.IntroduceWrapper}`}>
          <img src={(hours > 4) & (hours < 18) ? Sun : Moon} alt="Icon of Sun" />
          <h1>{partOfDay}</h1>
          <h1 className={`${styles.TextToHide}`}>, It's Currently</h1>
        </div>
        <div className={`${styles.TimeWrapper}`}>
          <h2>{hours && `${hoursN}:${minutesN}`}</h2>
          {dst && <h3>dst</h3>}
        </div>
        <h3 className={`${styles.Location}`}>{`In ${city}, ${country}`}</h3>
      </div>
      <div
        className={`${styles.MainButton}`}
        onClick={() => {
          setOpenState(!openState);
        }}
      >
        <span>{!openState ? 'MORE' : 'LESS'}</span>
        <div>
          <img src={openState ? ArrowUp : ArrowDown} alt="" />
        </div>
      </div>
    </section>
  );
}

export default TimeAndLocation;
