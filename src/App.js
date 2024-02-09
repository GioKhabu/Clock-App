import styles from './App.module.css';
import Clock from './components/Clock/Clock';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const { data} = useSWR(
    'https://api.ipgeolocation.io/ipgeo?apiKey=c6036c7bbaeb40258a04a494e7d49bed',
    fetcher
  );
  return (
    <div className={`${styles.App}`}>
      <Clock zone={data && data.time_zone.name} country={data && data.country_name} city={data && data.city} />
    </div>
  );
}

export default App;
