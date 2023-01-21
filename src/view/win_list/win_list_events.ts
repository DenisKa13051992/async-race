import { ArraysOfCars } from '../garage/api_garage';
import { btnWinners } from '../garage/garage_events';
import { createCarUI, createWinnerUI } from '../ui';
import { carsWinners, sortWinners, orderWinners, getWinnersAPI, getCarAPIByIdFromGarage } from './api_win_list';


let updatedCarId: number;
export let pageNumberWinners = 1;
let num: number = 0;
const btnPrevWin = <HTMLButtonElement>document.querySelector('.btn-prev-win');
const btnNextWin = <HTMLButtonElement>document.querySelector('.btn-next-win');
const winnersContainerBody = <HTMLElement>document.querySelector('.container-winners-body');

export const checkCarsWinners = () =>{
btnPrevWin.disabled = true; btnNextWin.disabled = true;
getWinnersAPI(pageNumberWinners).then(() => {
if (carsWinners / 7 > pageNumberWinners) {btnNextWin.disabled = false; console.log(carsWinners / 7, pageNumberWinners)};
if (pageNumberWinners === 1) {btnPrevWin.disabled = true; console.log(carsWinners / 7, pageNumberWinners)}
if (pageNumberWinners > 1) {btnPrevWin.disabled = false; console.log(carsWinners / 7, pageNumberWinners)}
})
console.log(btnPrevWin.disabled)}


btnWinners.addEventListener('click', () => {
  num = 0;
  checkCarsWinners();
  console.log(getWinnersAPI(pageNumberWinners));
  let winCarsForRender: string = '';
  getWinnersAPI(pageNumberWinners).then((arr: ArraysOfCars[]) => {
    for (let car of arr){
      num += 1;
      let winName: string;
      let winColor: string;
      let winId = car.id;
      let winWins = car.wins;
      let winTime = car.time;

      getCarAPIByIdFromGarage(car.id).then((ar: ArraysOfCars) => {
        winName = ar.name;
        winColor = ar.color;
      }).then(() => {
        winCarsForRender += createWinnerUI(num, winColor, winName, winWins, winTime);
        }).then(() => {
        winnersContainerBody.innerHTML = winCarsForRender;
        })
    }
  })
})


// createWinnerUI = ( num: number, color: string, name: string, wins: number, bestTime: number)
