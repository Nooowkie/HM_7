import React, { useEffect, useState } from 'react';
import { fetchStarships } from '../api/swapi';

export default function StarshipsList() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchStarships(page)
      .then(data => {
        setStarships(data.results);
        setCount(data.count);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p>Loading starships...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Starships</h3>
      <ul>
        {starships.map(starship => (
          <li key={starship.name}>
            <strong>{starship.name}</strong> — Model: {starship.model}, Crew: {starship.crew}
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
