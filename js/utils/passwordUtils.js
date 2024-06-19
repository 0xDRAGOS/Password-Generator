import { copyToClipboard } from './copyToClipboard.js';
import { encrypt, decrypt } from './encryptionUtils.js';

// funcție pentru salvarea unei parole în istoricul local
export function savePassword(webAddress, username, password) {
    // criptează parola folosind numele de utilizator ca cheie
    let encryptedPassword = encrypt(password, username);

    // creează un obiect pentru a stoca datele
    let content = {
        webAddress: webAddress,
        username: username,
        password: encryptedPassword
    };

    // generează un nume pentru înregistrare bazat pe data și ora curentă
    const currentDate = new Date();
    const recordName = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    try {
        // preia istoricul de parole existent din localStorage sau creează unul nou
        let passwordHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};
        // adaugă noua parolă în istoric
        passwordHistory[recordName] = content;
        // salvează istoricul actualizat în localStorage
        localStorage.setItem('PasswordGenerator-history', JSON.stringify(passwordHistory));

        // în caz de succes se afișează un mesaj
        const saveMessage = document.getElementById('save-message');
        saveMessage.textContent = 'Password saved!';
        setTimeout(() => {
            saveMessage.textContent = '';
        }, 2000);
    } catch (error) {
        // în caz de eroare se afișează un mesaj
        saveMessage.textContent = 'Failed to save password!';
        setTimeout(() => {
            saveMessage.textContent = '';
        }, 2000);
    }
}

// funcție pentru afișarea parolelor salvate din istoric
export function displayPasswords() {
    // preia istoricul de parole din localStorage
    let passwordsHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};

    const passwordsHistoryList = document.getElementById('passwords-list');
    // verifică dacă nu există parole salvate
    if(Object.keys(passwordsHistory).length === 0) {
        passwordsHistoryList.textContent = '';
        passwordsHistoryList.textContent += 'There are no passwords saved in history.';
    } else {
        passwordsHistoryList.textContent = '';
        // parcurge fiecare înregistrare din istoric și crează elementul 
        Object.keys(passwordsHistory).forEach(recordName => {
            let content = passwordsHistory[recordName];
            
            let div = document.createElement('div');
            div.classList.add('password-history-item');

            let webAddressSpan = document.createElement('span');
            webAddressSpan.classList.add('web-address');
            webAddressSpan.textContent = content.webAddress;
            div.appendChild(webAddressSpan);

            let usernameSpan = document.createElement('span');
            usernameSpan.classList.add('username');
            usernameSpan.textContent = content.username;
            div.appendChild(usernameSpan);

            let passwordSpan = document.createElement('span');
            passwordSpan.classList.add('password');
            const decryptedPassword = decrypt(content.password, content.username);
            passwordSpan.textContent = decryptedPassword;
            div.appendChild(passwordSpan);
            
            let iconDiv = document.createElement('div');
            iconDiv.classList.add('password-history-icons');

            let copyIconImg = document.createElement('img');
            copyIconImg.src = 'img/copy-icon.png';
            copyIconImg.alt = 'Copy password';
            copyIconImg.classList.add('copy-icon-history');
            copyIconImg.addEventListener('click', () =>  {
                copyToClipboard(passwordSpan);
            });
            iconDiv.appendChild(copyIconImg);

            let deleteIconImg = document.createElement('img');
            deleteIconImg.src = 'img/delete-icon.png';
            deleteIconImg.alt = 'Delete password';
            deleteIconImg.classList.add('delete-icon');
            deleteIconImg.addEventListener('click', () => {
                deletePassword(recordName, div);
            });
            iconDiv.appendChild(deleteIconImg);

            div.appendChild(iconDiv);
            passwordsHistoryList.appendChild(div);
        });
    }
}

// funcție pentru ștergerea unei parole specifice din istoric
function deletePassword(recordName, element) {
    let passwordsHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};
    delete passwordsHistory[recordName];
    localStorage.setItem('PasswordGenerator-history', JSON.stringify(passwordsHistory));

    const passwordsHistoryList = document.getElementById('passwords-list');
    passwordsHistoryList.removeChild(element);
}

// funcție pentru ștergerea tuturor parolelor din istoric
export function deleteAllPasswords() {
    localStorage.removeItem('PasswordGenerator-history');

    const passwordsHistoryList = document.getElementById('passwords-list');
    passwordsHistoryList.innerHTML = 'There are no passwords saved in history.';
}