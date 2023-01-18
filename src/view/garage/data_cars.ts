export const brandOfCars: string[] = [
  'Audi', 'Alfa Romeo', 'Aston Martin', 'Ford', 'McLaren',
  'Nissan', 'Opel', 'Pontiac', 'Hummer', 'Hyundai',
  'Infiniti', 'Jaguar', 'Jeep', 'Lexus', 'MAN',
  'Maybach', 'Mazda', 'Ferrari', 'Fiat', 'GMC',
  'Honda', 'Porsche', 'Renault', 'Škoda', 'Subaru',
  'Tesla', 'Toyota', 'Volvo', 'Saab', 'Chevrolet'
];

export const modelOfCars: string[] = [
  'X5', 'X7', 'X3', 'X6', 'GT4',
  'FXX', '599 GTO', 'Enzo', '458 Italia', 'Focus',
  'Captiva', 'A7', 'A5', 'A3', 'A8',
  'TT', 'Corolla', 'Camry', 'RAV4', 'WRX',
  'ES', 'LS', 'RX', 'GX', 'LX',
  'GS', 'Gallardo', 'Aventador', '911', 'Cayenne'
];

const getCarModel = () => {
  const brandCar: string = brandOfCars[Math.floor(Math.random() * brandOfCars.length)];
  const modelCar: string = modelOfCars[Math.floor(Math.random() * modelOfCars.length)];
  const carModel: string = brandCar + modelCar;
  return carModel;
};

const getCarColor = () => {
  function randomColor(){
    return String(Math.floor(Math.random() * 255));
  }
  const carColor = `rgb("${randomColor()}","${randomColor()}","${randomColor()}")`
  return carColor;
};

// export const generateRandomCars = (carCount = 100): Array<SimpleCar> =>
//   new Array(carCount)
//     .fill(1)
//     .map(() => ({ name: getCarModel(), color: getCarColor() }));
