import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minEl = document.querySelector('[data-minutes]');
const secEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() < 0) {
      Report.failure('Warning', 'Please choose a date in the future', 'OK');
      return;
    }

    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      const timerId = setInterval(() => {
        const timerDate = convertMs(selectedDates[0] - Date.now());
        const { days, hours, minutes, seconds } = timerDate;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timerId);
        }

        daysEl.textContent = addZero(timerDate.days);
        hoursEl.textContent = addZero(timerDate.hours);
        minEl.textContent = addZero(timerDate.minutes);
        secEl.textContent = addZero(timerDate.seconds);
      }, 1000);
    });
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
