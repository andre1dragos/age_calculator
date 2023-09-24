'use strict';

// HTML elements /////////////////////////////////////////////////////

// inputs
const dayInputEl = document.getElementById('day-input');
const monthInputEl = document.getElementById('month-input');
const yearInputEl = document.getElementById('year-input');

// errors
const dayErrorEl = document.getElementById('day-error');
const monthErrorEl = document.getElementById('month-error');
const yearErrorEl = document.getElementById('year-error');

// outputs
const yearOutput = document.getElementById('years-output');
const monthOutput = document.getElementById('months-output');
const dayOutput = document.getElementById('days-output');

const submitBtn = document.getElementById('btn');

//////////////////////////////////////////////////////////////////////

// function that validates the input fields
const validateInputs = function () {
  // get current year, month and day
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  // create date from user inputs
  const dayInput = +dayInputEl.value;
  const monthInput = +monthInputEl.value;
  const yearInput = +yearInputEl.value;

  let userDate = new Date(yearInput, monthInput - 1, dayInput); // YYYY, MM, DD

  // if no user inputs
  document.querySelectorAll('.input').forEach(input => {
    if (!input.value) {
      invalidField(input, 'This field is required');
    }
  });

  // if all user inputs
  if (dayInput || monthInput || yearInput) {
    // day validation
    if (dayInput >= 1 && dayInput <= 31) {
      validField(dayInputEl);
    } else {
      invalidField(dayInputEl, 'Must be a valid day');
      return;
    }

    // month validation
    if (monthInput >= 1 && monthInput <= 12) {
      validField(monthInputEl);
    } else {
      invalidField(monthInputEl, 'Must be a valid month');
      return;
    }

    // year validation
    if (yearInput > 0 && yearInput <= currentYear) {
      validField(yearInputEl);
    } else {
      invalidField(yearInputEl, 'Must be in the past');
      return;
    }

    // check for invalid date
    if (
      dayInput === userDate.getDate() &&
      monthInput === userDate.getMonth() + 1 &&
      monthInput <= 12 &&
      yearInput === userDate.getFullYear() &&
      yearInput <= currentYear
    ) {
      calcAge(currentYear, currentMonth, currentDay);
    } else {
      invalidField(dayInputEl, 'Must be a valid date');
      invalidField(monthInputEl, '');
      invalidField(yearInputEl, '');
    }
  }
};

// reusable function that generates error
const invalidField = function (inputEl, message) {
  inputEl.previousElementSibling.style.color = 'var(--Light-red)';
  inputEl.style.borderColor = 'var(--Light-red)';
  inputEl.nextElementSibling.classList.remove('hidden');
  inputEl.nextElementSibling.textContent = message;
};

// reusable function that validate
const validField = function (inputEl) {
  inputEl.previousElementSibling.style.color = 'var(--Smokey-grey)';
  inputEl.style.borderColor = 'var(--Light-grey)';
  inputEl.nextElementSibling.classList.add('hidden');
  inputEl.nextElementSibling.textContent = 'No error';
};

// function that calculates age based on user inputs
const calcAge = function (currYear, currMonth, currDay) {
  yearOutput.textContent = currYear - yearInputEl.value;
  monthOutput.textContent = String(
    Math.abs(currMonth - monthInputEl.value)
  ).padStart(2, 0);
  dayOutput.textContent = String(Math.abs(currDay - dayInputEl.value)).padStart(
    2,
    0
  );
};

submitBtn.addEventListener('click', validateInputs);
