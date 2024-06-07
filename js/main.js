import { generatePassword } from "./generatePassword.js";

document.addEventListener('DOMContentLoaded', () => {
    const generatePasswordButton = document.getElementById('generatePasswordButton');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const length = document.getElementById('length');
    const rangeValue = document.getElementById('rangeValue');

    rangeValue.textContent = length.value;

    generatePasswordButton.addEventListener('click', () => {
        const password = generatePassword(input.value, length.value); 
        console.log('pass: ', password);
        output.value = password;
    });

    length.addEventListener('input', () => {
        rangeValue.value = length.value;
    });

    rangeValue.addEventListener('input', () => {
        let value = parseInt(rangeValue.value, 10);
        if (value < 8) {
            value = 8;
        } else if (value > 64) {
            value = 64;
        }
        length.value = value;
        rangeValue.value = value;
    });

});
