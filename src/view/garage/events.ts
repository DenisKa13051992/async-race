import { createCarUI } from '../ui';
import { createCarAPI, countAllCars, getCarsAPI, updateCarAPI } from './api_garage';
import { DescriptionCar, getCarColor, getCarModel } from './data_cars';

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


