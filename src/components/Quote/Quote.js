import React from 'react';
import useSWR from 'swr';
import styles from './Quote.module.css';
import Refresh from '../../assets/desktop/icon-refresh.svg'
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Quote() {
  const { data, error, isLoading, mutate } = useSWR(
    'https://api.quotable.io/quotes/random',
    fetcher
  );
  return (
    <div className={`${styles.QuoteGroup}`}>
      <div className={`${styles.QuoteWrapper}`}>
        <p>
          {error && 'failed to load'}
          {isLoading && 'Loading...'}
          {data && `“${data[0].content}”`}
        </p>
        <h2 className={`${styles.Author}`}>{data && data[0].author}</h2>
      </div>
      <button className={`${styles.RefreshWrapper}`} onClick={() => mutate()}>
        <img src={Refresh} alt="" />
      </button>
    </div>
  );
}

export default Quote;
