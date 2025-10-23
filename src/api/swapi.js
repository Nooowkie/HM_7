// src/api/swapi.js
// SWAPI service for fetching planets, starships, films, and characters

const BASE_URL = 'https://swapi.dev/api/';

async function fetchResource(resource, page = 1) {
  try {
    const res = await fetch(`${BASE_URL}${resource}/?page=${page}`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchPlanets(page = 1) {
  return fetchResource('planets', page);
}

export async function fetchStarships(page = 1) {
  return fetchResource('starships', page);
}

export async function fetchFilms() {
  return fetchResource('films', 1);
}

export async function fetchPeople(page = 1) {
  return fetchResource('people', page);
}
