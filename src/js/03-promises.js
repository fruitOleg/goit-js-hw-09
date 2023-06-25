import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelay: document.querySelector('#delay'),
  step: document.querySelector('#step'),
  amount: document.querySelector('#amount'),
  createBtn: document.querySelector('.createBtn'),
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const amountValue = parseInt(refs.amount.value);
  const delayStep = Number(refs.step.value);
  let firstDelayValue = Number(refs.firstDelay.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, firstDelayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelayValue += delayStep;
  }
}
