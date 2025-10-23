import React, { useState } from 'react';
import PlanetsList from '../components/PlanetsList';
import StarshipsList from '../components/StarshipsList';

export default function Encyclopedia() {
  const [tab, setTab] = useState('planets');
  return (
    <div>
      <h2>Encyclopedia</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab('planets')} disabled={tab === 'planets'}>Planets</button>
        <button onClick={() => setTab('starships')} disabled={tab === 'starships'}>Starships</button>
      </div>
      {tab === 'planets' ? <PlanetsList /> : <StarshipsList />}
    </div>
  );
}
