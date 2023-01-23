import { garageUrl } from '../garage/api_garage';

const winnersUrl = 'http://127.0.0.1:3000/winners';

export let carsWinners: number = 0;
export let sortWinners: string = 'id';
export let orderWinners: string = 'ASC';

export const changeSort = (typeSort: string) => {
  if (sortWinners === typeSort) { if (orderWinners === 'ASC') {
     orderWinners = 'DESC'
    } else {
     orderWinners = 'ASC'
      }}
 else {
    sortWinners = typeSort;
  }
};

export const getWinnersAPI = async (page: number) => {
  const response = await fetch(
    `${winnersUrl}?_page=${page}&_limit=10&_sort=${sortWinners}&_order=${orderWinners}`,
    { method: 'GET' },
  );
  carsWinners = Number(response.headers.get('X-Total-count'));
  return response.json();
};

export const getCarAPIByIdFromGarage = async (id: number) =>
  (await fetch(`${garageUrl}/${id}`, { method: 'GET' })).json();

export const getWinnerAPI = async (id: number) => {
  const response = await fetch(`${winnersUrl}/${id}`, { method: 'GET' });
  return response.json();
};

export const createWinnerAPI = async (body: object) => {
  await fetch(winnersUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteWinnerAPI = async (id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'DELETE',
  });
};

export const updateWinnerAPI = async (body: object, id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
