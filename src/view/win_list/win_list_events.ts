import { ArraysOfCars } from '../garage/api_garage';
import { btnWinners } from '../garage/garage_events';
import { createCarUI, createWinnerUI } from '../ui';
import { carsWinners, sortWinners, orderWinners, getWinnersAPI, getCarAPIByIdFromGarage, changeSort } from './api_win_list';

const pageNumberWinnersHTML = <HTMLElement>document.querySelector('.page-number-winners');
let updatedCarId: number;
export let pageNumberWinners = 1;
export let num: number = 0;
const btnPrevWin = <HTMLButtonElement>document.querySelector('.btn-prev-win');
const btnNextWin = <HTMLButtonElement>document.querySelector('.btn-next-win');
const winnersContainerBody = <HTMLElement>document.querySelector('.container-winners-body');
const winsTimes = <HTMLElement>document.getElementById('winsTimes');
const winsBestTime = <HTMLElement>document.getElementById('winsBestTime');


export const checkCarsWinners = () =>{
btnPrevWin.disabled = true; btnNextWin.disabled = true;
getWinnersAPI(pageNumberWinners).then(() => {
if (carsWinners / 10 > pageNumberWinners) {btnNextWin.disabled = false;};
if (pageNumberWinners === 1) {btnPrevWin.disabled = true;}
if (pageNumberWinners > 1) {btnPrevWin.disabled = false;}
})}


btnWinners.addEventListener('click', () => {
  num = (pageNumberWinners - 1) * 10;
  checkCarsWinners();
  let winCarsForRender: string = '';
  getWinnersAPI(pageNumberWinners).then((arr: ArraysOfCars[]) => {
    for (let car of arr){
      let winName: string;
      let winColor: string;
      let winId = car.id;
      let winWins = car.wins;
      let winTime = car.time;

      getCarAPIByIdFromGarage(car.id).then((ar: ArraysOfCars) => {
        winName = ar.name;
        winColor = ar.color;
      }).then(() => {
        num += 1;
        winCarsForRender += createWinnerUI(num, winColor, winName, winWins, winTime);
        }).then(() => {
        winnersContainerBody.innerHTML = winCarsForRender;
        })
    }
  })
})

const swichWinPage = () => {
  num = (pageNumberWinners - 1) * 10;
  let winCarsForRender: string = '';
  getWinnersAPI(pageNumberWinners).then((arr: ArraysOfCars[]) => {
    for (let car of arr){
      let winName: string;
      let winColor: string;
      let winId = car.id;
      let winWins = car.wins;
      let winTime = car.time;

      getCarAPIByIdFromGarage(car.id).then((ar: ArraysOfCars) => {
        winName = ar.name;
        winColor = ar.color;
      }).then(() => {
        num += 1;
        winCarsForRender += createWinnerUI(num, winColor, winName, winWins, winTime);
        }).then(() => {
        winnersContainerBody.innerHTML = winCarsForRender;
        })
    }
  })
}


btnNextWin.addEventListener('click', () => {
  if (carsWinners / 10 > pageNumberWinners) {pageNumberWinners += 1; swichWinPage(); pageNumberWinnersHTML.textContent = String(pageNumberWinners);
    btnPrevWin.disabled = false;
  if (carsWinners / 10 < pageNumberWinners) {btnNextWin.disabled = true;}}
  checkCarsWinners();
})

btnPrevWin.addEventListener('click', () => {
  if (pageNumberWinners > 1) {pageNumberWinners -= 1; swichWinPage(); pageNumberWinnersHTML.textContent = String(pageNumberWinners);
    btnNextWin.disabled = false;}
  if (carsWinners / 10 < pageNumberWinners) {btnPrevWin.disabled = true;}
  checkCarsWinners();
})


winsBestTime.addEventListener('click', () => {
  changeSort('time');
  swichWinPage();
})

winsTimes.addEventListener('click', () => {
  changeSort('wins');
  swichWinPage();
})
