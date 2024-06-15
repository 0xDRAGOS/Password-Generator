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

    length.addEventListener('input', () => {
        rangeValue.value = length.value;
    });

    rangeValue.addEventListener('input', () => {
        length.value = rangeValue.value;
    });

    //settings page
    const minAlphanumericRange = document.getElementById('min-alphanumeric-range-input');
    const minAlphanumericValue = document.getElementById('min-alphanumeric-range-value-input');
    const maxAlphanumericRange = document.getElementById('max-alphanumeric-range-input');
    const maxAlphanumericValue = document.getElementById('max-alphanumeric-range-value-input');
    const minNumericRange = document.getElementById('min-numeric-range-input');
    const minNumericValue = document.getElementById('min-numeric-range-value-input');
    const maxNumericRange = document.getElementById('max-numeric-range-input');
    const maxNumericValue = document.getElementById('max-numeric-range-value-input');
    const minSpecialRange = document.getElementById('min-special-range-input');
    const minSpecialValue = document.getElementById('min-special-range-value-input');
    const maxSpecialRange = document.getElementById('max-special-range-input');
    const maxSpecialValue = document.getElementById('max-special-range-value-input');
    const separatorInterval = document.getElementById('separator-interval');
    
    const updateMinPasswordLength = () => {
        let newMinLength = parseInt(minAlphanumericValue.value) + parseInt(minNumericValue.value) + parseInt(minSpecialValue.value);
        newMinLength += Math.ceil(newMinLength / separatorInterval.value);
        
        length.min = newMinLength;
        rangeValue.min = newMinLength;
    }
    
    const updateMaxPasswordLength = () => {
        let newMaxLength = parseInt(maxAlphanumericValue.value) + parseInt(maxNumericValue.value) + parseInt(maxSpecialValue.value);
        newMaxLength += Math.ceil(newMaxLength / separatorInterval.value);
        
        length.max = newMaxLength;
        length.max = newMaxLength;
    }

    updateMinPasswordLength();
    updateMaxPasswordLength();

    const validateAndResetRanges = () => {
        if (parseInt(minAlphanumericValue.value) > parseInt(maxAlphanumericValue.value)) {
            minAlphanumericValue.value = maxAlphanumericValue.value;
            minAlphanumericRange.value = maxAlphanumericValue.value;
        }
        if (parseInt(maxAlphanumericValue.value) < parseInt(minAlphanumericValue.value)) {
            maxAlphanumericValue.value = minAlphanumericValue.value;
            maxAlphanumericRange.value = minAlphanumericValue.value;
        }

        if (parseInt(minNumericValue.value) > parseInt(maxNumericValue.value)) {
            minNumericValue.value = maxNumericValue.value;
            minNumericRange.value = maxNumericValue.value;
        }
        if (parseInt(maxNumericValue.value) < parseInt(minNumericValue.value)) {
            maxNumericValue.value = minNumericValue.value;
            maxNumericRange.value = minNumericValue.value;
        }

        if (parseInt(minSpecialValue.value) > parseInt(maxSpecialValue.value)) {
            minSpecialValue.value = maxSpecialValue.value;
            minSpecialRange.value = maxSpecialValue.value;
        }
        if (parseInt(maxSpecialValue.value) < parseInt(minSpecialValue.value)) {
            maxSpecialValue.value = minSpecialValue.value;
            maxSpecialRange.value = minSpecialValue.value;
       }
    }

    minAlphanumericRange.addEventListener('input', () => {
        minAlphanumericValue.value = minAlphanumericRange.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    minAlphanumericValue.addEventListener('input', () => {
        minAlphanumericRange.value = minAlphanumericValue.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    maxAlphanumericRange.addEventListener('input', () => {
        maxAlphanumericValue.value = maxAlphanumericRange.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });

    maxAlphanumericValue.addEventListener('input', () => {
        maxAlphanumericRange.value = maxAlphanumericValue.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });
    
    minNumericRange.addEventListener('input', () => {
        minNumericValue.value = minNumericRange.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    minNumericValue.addEventListener('input', () => {
        minNumericRange.value = minNumericValue.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    maxNumericRange.addEventListener('input', () => {
        maxNumericValue.value = maxNumericRange.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });

    maxNumericValue.addEventListener('input', () => {
        maxNumericRange.value = maxNumericValue.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });

    minSpecialRange.addEventListener('input', () => {
        minSpecialValue.value = minSpecialRange.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    minSpecialValue.addEventListener('input', () => {
        minSpecialRange.value = minSpecialValue.value;
        updateMinPasswordLength();
        validateAndResetRanges();
    });

    maxSpecialRange.addEventListener('input', () => {
        maxSpecialValue.value = maxSpecialRange.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });

    maxSpecialValue.addEventListener('input', () => {
        maxSpecialRange.value = maxSpecialValue.value;
        updateMaxPasswordLength();
        validateAndResetRanges();
    });

    const separatorChar = document.getElementById('separator');
    const totalPasswords = document.getElementById('password-count-input');

    generatePasswordButton.addEventListener('click', () => {
        const inputValue = input.value.trim();
        const generateMessage = document.getElementById('generate-message');
        generateMessage.innerHTML = '';
        
        if(!inputValue) {
            generateMessage.textContent = 'Input is empty.';
            return;
        }

        //de adaugat constrangeri pt min > max & max < min

        const passwords = generatePassword(inputValue, length.value, minAlphanumericValue.value, maxAlphanumericValue.value, minNumericValue.value, maxNumericValue.value, minSpecialValue.value, maxSpecialValue.value, separatorChar.value, separatorInterval.value, totalPasswords.value);

        let passwordContent = document.getElementById('password-content');
        if (passwordContent) {
            passwordContent.innerHTML = '';

            passwords.forEach(password => {
                const passwordDiv = document.createElement('div');
                passwordDiv.classList.add('password-item');

                const passwordInput = document.createElement('input');
                passwordInput.setAttribute('id', 'pass');
                passwordInput.type = 'text';
                passwordInput.classList.add('input-field');
                passwordInput.value = password;

                const copyIcon = document.createElement('img');
                copyIcon.src = 'img/copy-icon.png';
                copyIcon.alt = 'Copy to clipboard';
                copyIcon.classList.add('copy-icon');
                copyIcon.addEventListener('click', () => {
                    copyToClipboard(passwordInput);
                });

                const saveIcon = document.createElement('img');
                saveIcon.src = 'img/save-icon.png';
                saveIcon.alt = 'Save password';
                saveIcon.classList.add('save-icon');
                saveIcon.addEventListener('click', () => {
                    //savePassword();
                });

                passwordDiv.appendChild(passwordInput);
                passwordDiv.appendChild(copyIcon);
                passwordDiv.appendChild(saveIcon);

                passwordContent.appendChild(passwordDiv);
            });
        }
    });
});