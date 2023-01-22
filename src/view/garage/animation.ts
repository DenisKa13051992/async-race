import { driveCarAPI, startEngineAPI, stopEngineAPI } from "./api_garage"

const carsContainer = <HTMLElement>document.querySelector('.cars-container');
const startPositionWidth: number = 160;
let frameId: {
  id: number;
} = {
  id: 1
}
const animationId: { [key: number]: { id: number } } = {};

const animation = (id: number) => {
let time: number;
let way: number;
let carHTML: HTMLElement;
const idCarAnimation = id;

const valuesForMoving = async (id: number) => {
  const obj = await startEngineAPI(id);
  const distance = Number(obj.distance);
  const velocity = Number(obj.velocity);
  time = distance / velocity;
  way = document.body.clientWidth - startPositionWidth;
  carHTML = <HTMLElement>document.getElementById(`car-${id}`);
}
valuesForMoving(idCarAnimation).then(() => {animationId[idCarAnimation] = animationMove(carHTML, way, time)});
driveCarAPI(idCarAnimation).then((status) => {
  if (!status.success) {window.cancelAnimationFrame(animationId[idCarAnimation].id);
  }
});
}

const animationMove = (carHTML: HTMLElement, way: number, time: number) => {
  let startPositionTime: number = 0;
  const getStep = (times: number) => {
    if (!startPositionTime) startPositionTime = times;
    const timeProgress = times - startPositionTime;
    const progressWay = Math.round(timeProgress * (way / time));
    if (progressWay < way) {
      frameId.id = window.requestAnimationFrame(getStep);
      carHTML.style.transform = `translateX(${progressWay}px)`;
    } else {carHTML.style.transform = `translateX(${way}px)`;}
  };

  frameId.id = window.requestAnimationFrame(getStep);
  return frameId;
}

export const animationMoveStop = (idCar: number) => {
  stopEngineAPI(idCar).then(() => {
    const carStop = <HTMLElement>document.getElementById(`car-${idCar}`);
    window.cancelAnimationFrame(animationId[idCar].id);
    carStop.style.transform = 'translateX(0px)';
  });
};

carsContainer.addEventListener('click', (event) => {
  const target = <HTMLElement>event.target;
  if (target.closest('.car-start')){
    const carStart = <HTMLButtonElement>target.closest('.car-start');
    const carId = Number(carStart.id.split('-')[1]);
    const carStop = <HTMLButtonElement>document.getElementById(`stop-${carId}`);
    animation(carId);
    carStop.disabled = false;
    carStart.disabled = true;
  }

  if (target.closest('.car-stop')){
    const carStop = <HTMLButtonElement>target.closest('.car-stop');
    const carId = Number(carStop.id.split('-')[1]);
    const carStart = <HTMLButtonElement>document.getElementById(`start-${carId}`);
    animationMoveStop(carId);
    carStop.disabled = true;
    carStart.disabled = false;
  }
});


