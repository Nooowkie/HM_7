import React, { useEffect, useState } from 'react';
import { fetchFilms, fetchPeople } from '../api/swapi';

export default function FilmsCharactersGrid() {
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Fetch all films
        const filmsData = await fetchFilms();
        setFilms(filmsData.results);
        // Fetch all people (handle pagination)
        let allPeople = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const peopleData = await fetchPeople(page);
          allPeople = allPeople.concat(peopleData.results);
          if (peopleData.next) page++;
          else hasMore = false;
        }
        setPeople(allPeople);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading films and characters...</p>;
  if (error) return <p>Error: {error}</p>;

  // Build a grid: rows = films, columns = characters, mark if character is in film
  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" cellPadding="4" style={{ borderCollapse: 'collapse', minWidth: 600 }}>
        <thead>
          <tr>
            <th>Film \ Character</th>
            {people.map(person => (
              <th key={person.url} style={{ writingMode: 'vertical-rl', minWidth: 40 }}>{person.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {films.map(film => (
            <tr key={film.title}>
              <td><strong>{film.title}</strong></td>
              {people.map(person => (
                <td key={person.url + film.title} style={{ textAlign: 'center' }}>
                  {person.films.includes(film.url) ? '✔️' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
