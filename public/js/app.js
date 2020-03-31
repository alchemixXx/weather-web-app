console.log('Client side js file is loaded')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const headerOne = document.querySelector('#headerOne');
const righNow = document.querySelector('#rightNow');
const inHour = document.querySelector('#inHour');
const inFourHours = document.querySelector('#inFourHours');
const inEightHours = document.querySelector('#inEightHours');
const headerTwo = document.querySelector('#headerTwo');
const tommorowSummary = document.querySelector('#tommorowSummary');
const tommorowForecast = document.querySelector('#tommorowForecast');
const todaySummary = document.querySelector('#todaySummary');
const messageTwo = document.querySelector('#messageTwo');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  headerOne.textContent = '';
  todaySummary.textContent = '';
  righNow.textContent = '';
  inHour.textContent = '';
  inFourHours.textContent = '';
  inEightHours.textContent = '';
  headerTwo.textContent = '';
  tommorowSummary.textContent = '';
  tommorowForecast.textContent = '';
  messageTwo.textContent = '';

    fetch(`/weather?adress=${location}`).then(response => {
      response.json().then(data => {
          if (data.error) {
          messageOne.textContent = data.error;
          console.log(data.error);
          } else {
              messageOne.textContent = data.location;
            headerOne.textContent = 'Сьогодні';
            todaySummary.textContent = `Загалом: ${data.forecast.today.summury}`;
            righNow.textContent = `Зараз: ${data.forecast.today.righNow}`;
            inHour.textContent = `Через годину: ${data.forecast.today.inOneHour}`;
            inFourHours.textContent = `Через 4 години: ${data.forecast.today.inFourHours}`;
            inEightHours.textContent = `Через 8 годин: ${data.forecast.today.inEightHours}`;
            headerTwo.textContent = `Завтра`;
            tommorowSummary.textContent = `Загалом: ${data.forecast.tommorow.summury}`;
            tommorowForecast.textContent = `Прогноз: ${data.forecast.tommorow.forecast}`;
        }
      });
    });
    
})