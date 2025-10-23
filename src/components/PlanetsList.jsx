import React, { useEffect, useState } from 'react';
import { fetchPlanets } from '../api/swapi';

export default function PlanetsList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchPlanets(page)
      .then(data => {
        setPlanets(data.results);
        setCount(data.count);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p>Loading planets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Planets</h3>
      <ul>
        {planets.map(planet => (
          <li key={planet.name}>
            <strong>{planet.name}</strong> — Climate: {planet.climate}, Population: {planet.population}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page * 10 >= count}>Next</button>
      </div>
    </div>
  );
}
