import { generatePassword } from "./utils/generatePassword.js";
import { copyToClipboard } from "./utils/copyToClipboard.js";

document.addEventListener('DOMContentLoaded', () => {

    //header
    const homeIcon = document.getElementById('home-icon');
    const historyIcon = document.getElementById('history-icon');
    const settingsIcon = document.getElementById('settings-icon');

    const homePage = document.getElementById('home-page');
    const historyPage = document.getElementById('history-page');
    const settingsPage = document.getElementById('settings-page');

    let currentPage = homePage;
    historyPage.style.display = 'none';
    settingsPage.style.display = 'none';

    homeIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        homePage.style.display = 'block';
        currentPage = homePage;
    });

    historyIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        historyPage.style.display = 'block';
        currentPage = historyPage;
    });

    settingsIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        settingsPage.style.display = 'block';
        currentPage = settingsPage;
    });

    //home page
    const generatePasswordButton = document.getElementById('generatePasswordButton');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const length = document.getElementById('length');
    const rangeValue = document.getElementById('rangeValue');
    const copyIcon = document.getElementById('copy-icon');
    const saveIcon = document.getElementById('save-icon');

    generatePasswordButton.addEventListener('click', () => {
        const password = generatePassword(input.value, length.value); 
        console.log('pass: ', password);
        output.value = password;
    });

    copyIcon.addEventListener('click', () => {
        copyToClipboard();
    });

    saveIcon.addEventListener('click', () => {
        //savePassword();
    });

    length.addEventListener('input', () => {
        rangeValue.value = length.value;
    });

    rangeValue.addEventListener('input', () => {
        length.value = rangeValue.value;
    });

    //settings page
    const alphanumericRange = document.getElementById('alphanumeric-range-input');
    const alphanumericValue = document.getElementById('alphanumeric-range-value-input');
    const numericRange = document.getElementById('numeric-range-input');
    const numericValue = document.getElementById('numeric-range-value-input');
    const specialRange = document.getElementById('special-range-input');
    const specialValue = document.getElementById('special-range-value-input');

    alphanumericRange.addEventListener('input', () => {
        alphanumericValue.value = alphanumericRange.value;
    });

    alphanumericValue.addEventListener('input', ()=> {
        alphanumericRange.value = alphanumericValue.value;
    });

    numericRange.addEventListener('input', () => {
        numericValue.value = numericRange.value;
    });

    numericValue.addEventListener('input', ()=> {
        numericRange.value = numericValue.value;
    });

    specialRange.addEventListener('input', () => {
        specialValue.value = specialRange.value;
    });

    specialValue.addEventListener('input', ()=> {
        specialRange.value = specialValue.value;
    });
});
