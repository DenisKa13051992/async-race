const winnersUrl = 'http://127.0.0.1:3000/winners';

export let carsWinners: number = 0;
export let sortWinners: string = 'id';
export let orderWinners: string = 'ASC';

export const getWinnersAPI = async (page: number) => {
  const response = await fetch(`${winnersUrl}?_page=${page}&_limit=7_sort=${sortWinners}_order=${orderWinners}`, { method: 'GET' });
  carsWinners = Number(response.headers.get('X-Total-count')); console.log(carsWinners)
  return response.json();
};

export const getWinnerAPI = async (id: number) => {
  const response = await fetch(`${winnersUrl}/${id}`, { method: 'GET' });
  return response.json();
};

export const createWinnerAPI = async (body: object) => {
  await fetch(winnersUrl, {
  method: 'POST',
    body: JSON.stringify(body),
    headers: {
    'Content-Type': 'application/json'
    },
  });
};

export const deleteWinnerAPI = async (id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'DELETE'
  });
};

export const updateWinneAPI = async (body: object, id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
