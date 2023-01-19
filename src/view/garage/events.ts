import { createCarUI } from '../ui';
import { createCarAPI, cars, getCarsAPI, updateCarAPI, ArraysOfCars } from './api_garage';
import { getCarColor, getCarModel } from './data_cars';

const inputCreateNewColor = <HTMLInputElement>document.querySelector('.input-create-new-color');
const carsContainer = <HTMLElement>document.querySelector('.cars-container');
const generateCars = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateCars = <HTMLElement>document.querySelector('.btn-generate-cars');
const carsInGarage = <HTMLElement>document.querySelector('.cars-in-garage');
const btnGarage = <HTMLElement>document.querySelector('.btn-garage');
const btnWinners = <HTMLElement>document.querySelector('.btn-winners');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn-update');
const inputCreateNewName = <HTMLInputElement>document.querySelector('.input-create-new-name');
const inputCreateColor = <HTMLInputElement>document.querySelector('.input-create-color');
const inputCreateName = <HTMLInputElement>document.querySelector('.input-create-name');
const btnNext = <HTMLButtonElement>document.querySelector('.btn-next');
const garagePage = <HTMLElement>document.querySelector('.garage-page');
const winnersPage = <HTMLElement>document.querySelector('.winners-page');
const btnCreate = <HTMLInputElement>document.querySelector('.btn-create');
let updatedCarId: number;
export let pageNumber = 1;


btnGarage.addEventListener('click', () => {
  winnersPage.classList.add('hide');
  garagePage.classList.remove('hide');
});

btnWinners.addEventListener('click', () => {
  garagePage.classList.add('hide');
  winnersPage.classList.remove('hide');
});



export const updateCarsUI = () => {
  getCarsAPI(pageNumber).then((arr: ArraysOfCars[]) => {
    carsContainer.innerHTML = '';
    let carsForRender: string = '';
    arr.forEach((car) => {
      carsForRender += `${createCarUI(car.id, car.name, car.color)}`;
    });
    carsInGarage.textContent = `(${cars})`;
    carsContainer.innerHTML = carsForRender;
  });
};
updateCarsUI();


btnGenerateCars.addEventListener('click', async () => {

  for (let i = 0; i < 100; i++){
    const color = getCarColor();
    const name = getCarModel();
    createCarAPI({ 'name': `${name}`, 'color': `${color}` });
  }
  updateCarsUI();
  btnNext.disabled = false;
});


inputCreateName.oninput = function(){
  if (!inputCreateName.value) {
    btnCreate.disabled = true;
} else btnCreate.disabled = false;
}

inputCreateNewName.oninput = function(){
  if (!inputCreateNewName.value) {
    btnUpdate.disabled = true;
} else btnUpdate.disabled = false;
}

generateCars.addEventListener('click', (event) => {
  const target = <HTMLElement>event.target;

  if (target.closest('.btn-create')) {
    if (inputCreateName.value) {
      (createCarAPI({ 'name': inputCreateName.value, 'color': inputCreateColor.value })).then(() => updateCarsUI());
      btnCreate.disabled = true;
    }

    if (cars % 7 === 0) btnNext.disabled = false;
    inputCreateName.value = '';
  }

  if (target.closest('.btn-update')) {

    (updateCarAPI( { 'name': inputCreateNewName.value, 'color': inputCreateNewColor.value }, updatedCarId)).then(() => updateCarsUI());

    inputCreateNewName.value = '';
    inputCreateNewName.disabled = true;
    inputCreateNewColor.disabled = true;
    btnUpdate.disabled = true;
  }
});
