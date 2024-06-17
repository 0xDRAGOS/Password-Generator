import { copyToClipboard } from './copyToClipboard.js';
import { encrypt, decrypt } from './encryptionUtils.js';

export function savePassword(webAddress, username, password) {
    let encryptedPassword = encrypt(password, username);

    let content = {
        webAddress: webAddress,
        username: username,
        password: encryptedPassword
    };

    const currentDate = new Date();
    const recordName = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    try {
        let passwordHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};
        passwordHistory[recordName] = content;

        localStorage.setItem('PasswordGenerator-history', JSON.stringify(passwordHistory));

        const saveMessage = document.getElementById('save-message');
        saveMessage.textContent = 'Password saved!';
        setTimeout(() => {
            saveMessage.textContent = '';
        }, 2000);
    } catch (error) {
        saveMessage.textContent = 'Failed to save password!';
        setTimeout(() => {
            saveMessage.textContent = '';
        }, 2000);
    }
}

export function displayPasswords() {
    let passwordsHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};

    const passwordsHistoryList = document.getElementById('passwords-list');
    if(Object.keys(passwordsHistory).length === 0) {
        passwordsHistoryList.textContent = '';
        passwordsHistoryList.textContent += 'There are no passwords saved in history.';
    } else {
        passwordsHistoryList.textContent = '';
        
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

function deletePassword(recordName, element) {
    let passwordsHistory = JSON.parse(localStorage.getItem('PasswordGenerator-history')) || {};
    delete passwordsHistory[recordName];
    localStorage.setItem('PasswordGenerator-history', JSON.stringify(passwordsHistory));

    const passwordsHistoryList = document.getElementById('passwords-list');
    passwordsHistoryList.removeChild(element);
}

export function deleteAllPasswords() {
    localStorage.removeItem('PasswordGenerator-history');

    const passwordsHistoryList = document.getElementById('passwords-list');
    passwordsHistoryList.innerHTML = 'There are no passwords saved in history.';
}