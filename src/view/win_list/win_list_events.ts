import { btnWinners } from '../garage/garage_events';
import { createCarUI } from '../ui';
import { carsWinners, sortWinners, orderWinners, getWinnersAPI } from './api_win_list';


let updatedCarId: number;
export let pageNumberWinners = 1;
const btnPrevWin = <HTMLButtonElement>document.querySelector('.btn-prev-win');
const btnNextWin = <HTMLButtonElement>document.querySelector('.btn-next-win');

export const checkCarsWinners = () =>{
btnPrevWin.disabled = true; btnNextWin.disabled = true;
getWinnersAPI(pageNumberWinners).then(() => {
if (carsWinners / 7 > pageNumberWinners) {btnNextWin.disabled = false; console.log(carsWinners / 7, pageNumberWinners)};
if (pageNumberWinners === 1) {btnPrevWin.disabled = true; console.log(carsWinners / 7, pageNumberWinners)}
if (pageNumberWinners > 1) {btnPrevWin.disabled = false; console.log(carsWinners / 7, pageNumberWinners)}
})
console.log(btnPrevWin.disabled)}


btnWinners.addEventListener('click', () => {
  checkCarsWinners();
})
