import React, { useState, useEffect } from 'react';
import styles from './Clock.module.css';
import Quote from '../Quote/Quote';
import TimeAndLocation from '../TimeAndLocation/TimeAndLocation';
import useSWR from 'swr';
import MoreDetails from '../MoreDetails/MoreDetails';
import DayBackGroundDesktop from '../../assets/desktop/bg-image-daytime.jpg';
import NightBackgroundDesktop from '../../assets/desktop/bg-image-nighttime.jpg';
import DayBackGroundTablet from '../../assets/tablet/bg-image-daytime.jpg';
import NightBackgroundTablet from '../../assets/tablet/bg-image-nighttime.jpg';
import DayBackGroundMobile from '../../assets/mobile/bg-image-daytime.jpg';
import NightBackgroundMobile from '../../assets/mobile/bg-image-nighttime.jpg';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Clock({ zone, country, city }) {
  const [openState, setOpenState] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { data, error, isLoading } = useSWR(
    zone && `https://worldtimeapi.org/api/timezone/${zone}`,
    fetcher
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const date = data && new Date(data.datetime);
    const newHours = date && date.getHours();
    const newMinutes = date && date.getMinutes();
    setHours(newHours);
    setMinutes(newMinutes);
  }, [data]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const isDaytime = hours > 4 && hours < 18;
  const isMobile = windowSize.width <= 767;
  const isTablet = windowSize.width > 767 && windowSize.width <= 1024;

  return (
    <main
      className={`${styles.ClockWrapper}`}
      style={{
        backgroundImage: `url(${
          isMobile && isDaytime
            ? DayBackGroundMobile
            : isMobile && !isDaytime
            ? NightBackgroundMobile
            : isTablet && isDaytime
            ? DayBackGroundTablet
            : isTablet && !isDaytime
            ? NightBackgroundTablet
            : isDaytime
            ? DayBackGroundDesktop
            : NightBackgroundDesktop
        })`,
      }}
    >
      <div className={`${styles.ClockBackGround}`}>
        <div
          className={`${styles.DataWrapper}`}
          style={
            openState
              ? { height: '50%', justifyContent: 'flex-end' }
              : { height: '100%', justifyContent: 'space-between' }
          }
        >
          {!openState && <Quote />}
          <TimeAndLocation
            openState={openState}
            setOpenState={setOpenState}
            hours={hours}
            minutes={minutes}
            dst={data && data.dst_from}
            country={country}
            city={city}
          />
        </div>
        {openState && (
          <MoreDetails
            zone={zone}
            dayWeek={data && data.day_of_week}
            dayYearN={data && data.day_of_year}
            weekN={data && data.week_number}
          />
        )}
      </div>
    </main>
  );
}

export default Clock;
