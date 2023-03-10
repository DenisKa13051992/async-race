import { carImg } from '../essets/car';
import { finishSign } from '../essets/finishSign';

export const createCarUI = (id: number, name: string, color: string) =>
  `<div class="car">
    <div class="car-options">
      <button class="btn car-select" id="select-${id}">Select</button>
      <button class="btn car-delete" id="delete-${id}">Delete</button>
      <h4 class="car-name" id="car_name-${id}">${name}</h4>
    </div>
    <div class="car-control">
    <div class="car-control-btn"><button class="car-start" id="start-${id}">Start</button>
    <button class="car-stop" id="stop-${id}" disabled="true">Stop</button></div>
      <div class="car-img" id="car-${id}">${carImg(color)}</div>
      <div class="finishSign">${finishSign}</div>
    </div>
  </div>
`;

export const createWinnerUI = (
  num: number,
  color: string,
  name: string,
  wins: number,
  bestTime: number,
) =>
  `<tr>
    <td>${num}</td>
    <td>${carImg(color)}</td>
    <td>${name}</td>
    <td>${wins}</td>
    <td>${bestTime}</td>
  </tr>
`;

const createBodyUI = async () => {
  const root = document.createElement('div');
  root.innerHTML = `
    <header class="header">
      <div class="nav">
        <button class="btn btn-garage" disabled="true">Garage</button>
        <button class="btn btn-winners">Winners</button>
      </div>
    </header>
    <div class="page garage-page">
      <div class="generate-cars">
        <div class="panel-create">
          <input class="input-create-name" type="text" placeholder="Enter car name">
          <input class="input-create-color" type="color">
          <button class="btn btn-create" disabled="true">create</button>
        </div>
        <div class="panel-update">
          <input class="input-create-new-name" type="text" disabled="true" placeholder="Enter new сar name">
          <input class="input-create-new-color" type="color" disabled="true">
          <button class="btn btn-update" disabled="true">update</button>
        </div>
        <div class="panel-control">
          <button class="btn btn-race">race</button>
          <button class="btn btn-reset" disabled="true">reset</button>
          <button class="btn btn-generate-cars">generate cars</button>
        </div>
      </div>

      <div class="container-garage">
        <h1 class="title">Garage <span class="cars-in-garage"></span></h1>
        <h3 class="title">Page #<span class="page-number">1</span></h3>

        <div class="cars-container"></div>
      </div>

      <div class="pagination">
        <button class="btn btn-prev" disabled="true">Prev</button>
        <button class="btn btn-next" disabled="true">Next</button>
      </div>

      <div class="winners"></div>

    </div>

    <div class="winner-message" style="display: none">
    </div>

    <div class="page winners-page" style="display: none">
      <h1 class="title">Winners <span class="count-winners"></span></h1>
      <h3 class="title">Page <span class="page-number-winners">1</span></h3>

      <div class="container-winners">
        <table class="winners-list">
            <tr>
              <th>Number</th>
              <th>Car</th>
              <th>Name</th>
              <th id="winsTimes">Wins</th>
              <th id="winsBestTime">Best time (seconds)</th>
            </tr>
          <tbody class="container-winners-body">
          </tbody>
        </table>
      </div>

      <div class="pagination pagination-win">
        <button class="btn btn-prev-win">Prev</button>
        <button class="btn btn-next-win">Next</button>
      </div>

    </div>

    <footer class="footer">
    <div class="me">
    <a href="https://github.com/DenisKa13051992">Denis Karnachenko 2023<br>
    </a>
    </div>
    <div class="rsschool">
            <div><a href="https://rs.school/js/">©RSSchool JavaScript/Front-end 2022Q3<br>
            </a></div>
          </div>

    </footer>
  `;
  document.body.appendChild(root);
};
createBodyUI();
