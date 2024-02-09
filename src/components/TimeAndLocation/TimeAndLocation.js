import React from 'react';
import styles from './TimeAndlocation.module.css';
import Sun from '../../assets/desktop/icon-sun.svg';
import Moon from '../../assets/desktop/icon-moon.svg';
import ArrowUp from '../../assets/desktop/new_arrwo_up.svg';
import ArrowDown from '../../assets/desktop/new_arrwo_down.svg';

function TimeAndLocation({ openState, setOpenState, hours, minutes, dst, country, city }) {
  const [partOfDay, setPartOfDay] = React.useState('');
  React.useEffect(() => {
    if ((hours > 5) & (hours < 11)) {
      setPartOfDay('Good Morgning');
    } else if ((hours > 11) & (hours < 18)) {
      setPartOfDay('Good Afternoon');
    } else {
      setPartOfDay('Good Evening');
    }
  }, [hours]);

  return (
    <section className={`${styles.TimeAndLocationWrapper}`}>
      <div className={`${styles.Group}`}>
        <div className={`${styles.IntroduceWrapper}`}>
          <img src={(hours > 4) & (hours < 18) ? Sun : Moon} alt="Icon of Sun" />
          <h1>{partOfDay}</h1>
          <h1 className={`${styles.TextToHide}`}>, It's Currently</h1>
        </div>
        <div className={`${styles.TimeWrapper}`}>
          <h2>{hours&&`${hours}:${minutes}`}</h2>
          {dst && <h3>dst</h3>}
        </div>
        <h4 className={`${styles.Location}`}>{`In ${city}, ${country}`}</h4>
      </div>
      <button
        className={`${styles.MainButton}`}
        onClick={() => {
          setOpenState(!openState);
        }}
      >
        <span>{!openState ? 'MORE' : 'LESS'}</span>
        <div>
          <img src={openState ? ArrowUp : ArrowDown} alt="" />
        </div>
      </button>
    </section>
  );
}

export default TimeAndLocation;
