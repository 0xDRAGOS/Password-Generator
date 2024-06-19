import { generatePassword } from "./utils/generatePassword.js";
import { copyToClipboard } from "./utils/copyToClipboard.js";
import { deleteAllPasswords, displayPasswords, savePassword } from "./utils/passwordUtils.js";

// funcție care se execută când documentul HTML este complet încărcat
document.addEventListener('DOMContentLoaded', () => {

    // header
    // elemente pentru navigarea între pagini
    const homeIcon = document.getElementById('home-icon');
    const historyIcon = document.getElementById('history-icon');
    const settingsIcon = document.getElementById('settings-icon');

    const homePage = document.getElementById('home-page');
    const historyPage = document.getElementById('history-page');
    const settingsPage = document.getElementById('settings-page');

    // setează pagina curentă și ascunde celelalte pagini
    let currentPage = homePage;
    historyPage.style.display = 'none';
    settingsPage.style.display = 'none';

    // home page
    // gestionare click pe iconița de Home pentru afișarea paginii Home
    homeIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        homePage.style.display = 'block';
        currentPage = homePage;
    });

    const generatePasswordButton = document.getElementById('generatePasswordButton');
    const input = document.getElementById('input');
    const length = document.getElementById('length');
    const rangeValue = document.getElementById('rangeValue');

    // actualizează valoarea afișată pentru lungimea parolei când utilizatorul schimbă slider-ul
    length.addEventListener('input', () => {
        rangeValue.value = length.value;
    });

    rangeValue.addEventListener('input', () => {
        length.value = rangeValue.value;
    });

    // history page
    // gestionare click pe iconița de History pentru afișarea paginii History și afișarea parolelor salvate
    historyIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        historyPage.style.display = 'block';
        currentPage = historyPage;

        displayPasswords();
    });

    const deleteAllPasswordsButton = document.getElementById('deleteAllPasswordsButton');
     // gestionare click pe butonul de ștergere a tuturor parolelor salvate
    deleteAllPasswordsButton.addEventListener('click', () => {
        deleteAllPasswords();
    });

    // settings page
    // gestionare click pe iconița de Settings pentru afișarea paginii Settings
    settingsIcon.addEventListener('click', () => {
        currentPage.style.display = 'none';
        settingsPage.style.display = 'block';
        currentPage = settingsPage;
    });

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

    // funcție pentru actualizarea lungimii minime a parolei
    const updateMinPasswordLength = () => {
        let newMinLength = parseInt(minAlphanumericValue.value) + parseInt(minNumericValue.value) + parseInt(minSpecialValue.value);
        newMinLength += Math.ceil(newMinLength / separatorInterval.value);

        length.min = newMinLength;
        rangeValue.min = newMinLength;
    }

    // funcție pentru actualizarea lungimii maxime a parolei
    const updateMaxPasswordLength = () => {
        let newMaxLength = parseInt(maxAlphanumericValue.value) + parseInt(maxNumericValue.value) + parseInt(maxSpecialValue.value);
        newMaxLength += Math.ceil(newMaxLength / separatorInterval.value);

        length.max = newMaxLength;
        rangeValue.max = newMaxLength;
    }

    updateMinPasswordLength();
    updateMaxPasswordLength();

    // funcție pentru validarea și resetarea valorilor intervalelor minime și maxime
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

    // adăugare event listener pentru schimbarea valorilor intervalelor și actualizarea lungimii parolei
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

    var currentWebAddress = '';
    // obține adresa web curentă din tabul activ al browserului folosind API-ul tabs 
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) { // dorim doar tabul activ în fereastra curentă
        let url = new URL(tabs[0].url); // se crează un obiect URL din URL-ul primului element din array-ul tabs
        currentWebAddress = url.origin; // salvează adresa de bază
    });

     // gestionare click pe butonul de generare parolă
    generatePasswordButton.addEventListener('click', () => {
        const inputValue = input.value.trim();
        const generateMessage = document.getElementById('generate-message');
        generateMessage.innerHTML = '';

        // verifică dacă inputul este gol
        if (!inputValue) {
            generateMessage.textContent = 'Input is empty.';
            setTimeout(() => {
                generateMessage.textContent = '';
            }, 2000);
        } else {
            const passwords = generatePassword(inputValue, length.value, minAlphanumericValue.value, maxAlphanumericValue.value, minNumericValue.value, maxNumericValue.value, minSpecialValue.value, maxSpecialValue.value, separatorChar.value, separatorInterval.value, totalPasswords.value);

            let passwordContent = document.getElementById('password-content');
            if (passwordContent) {
                passwordContent.innerHTML = '';

                // afișează fiecare parolă generată într-un element div și adaugă funcționalități de copiere și salvare
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
                        savePassword(currentWebAddress, inputValue, password);
                    });

                    passwordDiv.appendChild(passwordInput);
                    passwordDiv.appendChild(copyIcon);
                    passwordDiv.appendChild(saveIcon);

                    passwordContent.appendChild(passwordDiv);
                });
            }
        }
    });
});