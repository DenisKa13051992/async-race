import { createCarUI } from '../ui';
import { winnerMessage } from './animation';
import { createCarAPI, cars, getCarsAPI, updateCarAPI, ArraysOfCars, deleteCarAPI } from './api_garage';
import { getCarColor, getCarModel } from './data_cars';

const inputCreateNewColor = <HTMLInputElement>document.querySelector('.input-create-new-color');
const carsContainer = <HTMLElement>document.querySelector('.cars-container');
const generateCars = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateCars = <HTMLElement>document.querySelector('.btn-generate-cars');
const carsInGarage = <HTMLElement>document.querySelector('.cars-in-garage');
const btnGarage = <HTMLInputElement>document.querySelector('.btn-garage');
export const btnWinners = <HTMLInputElement>document.querySelector('.btn-winners');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn-update');
const inputCreateNewName = <HTMLInputElement>document.querySelector('.input-create-new-name');
const inputCreateColor = <HTMLInputElement>document.querySelector('.input-create-color');
const inputCreateName = <HTMLInputElement>document.querySelector('.input-create-name');
const btnNext = <HTMLButtonElement>document.querySelector('.btn-next');
const btnPrev = <HTMLButtonElement>document.querySelector('.btn-prev');
const garagePage = <HTMLElement>document.querySelector('.garage-page');
const winnersPage = <HTMLElement>document.querySelector('.winners-page');
const btnCreate = <HTMLButtonElement>document.querySelector('.btn-create');
const pageNumberHTML = <HTMLElement>document.querySelector('.page-number');
let updatedCarId: number;
export let pageNumber = 1;


export const checkCars = () =>{ getCarsAPI(pageNumber).then(() => {
if (cars / 7 > pageNumber) {btnNext.disabled = false;} else {btnNext.disabled = true;}
if (pageNumber === 1) {btnPrev.disabled = true;}
if (pageNumber > 1) {btnPrev.disabled = false;}
})}
checkCars();

btnGarage.addEventListener('click', () => {
  winnersPage.style.display = 'none';
  garagePage.style.display = 'block';
  btnGarage.disabled = true;
  btnWinners.disabled = false;
});

btnWinners.addEventListener('click', () => {
  garagePage.style.display = 'none';
  winnersPage.style.display = 'block';
  btnWinners.disabled = true;
  btnGarage.disabled = false;
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



btnNext.addEventListener('click', () => {
  if (cars / 7 > pageNumber) {pageNumber += 1; updateCarsUI(); pageNumberHTML.textContent = String(pageNumber); console.log(cars / 7, pageNumber);
  if (cars / 7 < pageNumber) {btnNext.disabled = true; console.log(cars / 7, pageNumber)}}
  checkCars();
})

btnPrev.addEventListener('click', () => {
  if (pageNumber > 1) {pageNumber -= 1; updateCarsUI(); pageNumberHTML.textContent = String(pageNumber); console.log(cars / 7, pageNumber)
  };
  checkCars();
})




carsContainer.addEventListener('click', (event) => {
  const target = <HTMLElement>event.target;

  if (target.closest('.car-select')){
    const carSelect = <HTMLButtonElement>target.closest('.car-select');
    updatedCarId = Number(carSelect.id.split('-')[1]);
    inputCreateNewName.disabled = false;
    inputCreateNewColor.disabled = false;
    let selectCarName = <HTMLElement>document.getElementById(`car_name-${updatedCarId}`);
    inputCreateNewName.value = selectCarName.innerHTML;
    btnUpdate.disabled = false;
  }

  if (target.closest('.car-delete')){
    const carDelete = <HTMLButtonElement>target.closest('.car-delete');
    const deleteCarId = Number(carDelete.id.split('-')[1]);
    deleteCarAPI(deleteCarId).then(() => updateCarsUI());
    inputCreateNewName.value = '';


  }
})

garagePage.addEventListener('click', () => {
  if (winnerMessage.style.display === 'block') winnerMessage.style.display = 'none';
})
