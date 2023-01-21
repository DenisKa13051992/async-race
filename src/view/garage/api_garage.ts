export const garageUrl = 'http://127.0.0.1:3000/garage';
const engine = 'http://127.0.0.1:3000/engine';

export let cars = 0;

export const getCarsAPI = async (page: number) => {
  const response = await fetch(`${garageUrl}?_page=${page}&_limit=7`, { method: 'GET' });
  cars = Number(response.headers.get('X-Total-count'));
  return response.json();
};

export const createCarAPI = async (body: object) => {
  await fetch(garageUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const deleteCarAPI = async (id: number) => {
  await fetch(`${garageUrl}/${id}`, {
    method: 'DELETE'
  });
};

export const updateCarAPI = async (body: object, id: number) => {
  await fetch(`${garageUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

export const startEngineAPI = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();
export const stopEngineAPI = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();
export const driveCarAPI = async (id: number) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};



export type ArraysOfCars = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};
