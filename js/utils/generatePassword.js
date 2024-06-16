import { characterMap } from "./characterMap.js";
import { LFSR } from "./lfsr.js";

export function generatePassword(input, length, minAlphanumeric,
    maxAlphanumeric, minNumeric, maxNumeric, minSpecial,
    maxSpecial, separator, separatorInterval, totalPasswords) {
    const passwords = [];

    const inputParts = divideString(input, totalPasswords);

    for (let i = 0; i < totalPasswords; i++) {
        let passwordChars = [];

        const bytes = LFSR(inputParts[i]);

        bytes.forEach(byte => {
            passwordChars.push(selectChar(byte));
        });

        passwordChars = adjustPasswordChars(passwordChars, length, minAlphanumeric, maxAlphanumeric, minNumeric, maxNumeric, minSpecial, maxSpecial);

        passwordChars = addSeparators(passwordChars, separator, separatorInterval);

        let slicedPassword = passwordChars.slice(0, passwordChars.length - (passwordChars.length - length));

        passwords.push(slicedPassword);
    }

    return passwords;
}

function divideString(input, number) {
    const parts = [];
    const length = input.length;
    const partSize = Math.ceil(length / number); 
    let startPosition = 0;

    for (let i = 0; i < number; i++) {
        if (startPosition >= length) {
            parts.push("");
        } else {
            const part = input.slice(startPosition, startPosition + partSize);
            parts.push(part);
            startPosition += partSize;
        }
    }

    return parts;
}

function selectChar(byte) {
    const intValue = parseInt(byte, 2);

    const category = Object.keys(characterMap)[intValue % Object.keys(characterMap).length];
    const selectedChar = characterMap[category][intValue % Object.values(characterMap[category]).length];

    return { char: selectedChar, category: category };
}

function adjustPasswordChars(passwordChars, length, minAlphanumeric, maxAlphanumeric, minNumeric, maxNumeric, minSpecial, maxSpecial) {
    let adjustedPasswordChars = [];
    
    const counts = {
        alphanumeric: 0,
        numeric: 0,
        special: 0
    };

    let i = 0;
    while (i < passwordChars.length && adjustedPasswordChars.length < length) {
        if (counts.alphanumeric == minAlphanumeric && counts.numeric == minNumeric && counts.special == minSpecial) {
            break;
        }

        const c = passwordChars[i];

        if (c.category == 'alphanumeric' && counts.alphanumeric < minAlphanumeric) {
            counts.alphanumeric++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        if (c.category == 'numeric' && counts.numeric < minNumeric) {
            counts.numeric++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        if (c.category == 'special' && counts.special < minSpecial) {
            counts.special++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        i++;
    }

    i = 0;
    while (i < passwordChars.length && adjustedPasswordChars.length < length) {
        const c = passwordChars[i];

        if (c.category == 'alphanumeric' && counts.alphanumeric < maxAlphanumeric) {
            counts.alphanumeric++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        if (c.category == 'numeric' && counts.numeric < maxNumeric) {
            counts.numeric++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        if (c.category == 'special' && counts.special < maxSpecial) {
            counts.special++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1);
            continue;
        }

        i++;
    }

    return adjustedPasswordChars;
}

function addSeparators(passwordChars, separator, interval) {
    let passwordWithSeparators = '';
    for (let i = 0; i < passwordChars.length; i++) {
        if (i > 0 && i % interval === 0) {
            passwordWithSeparators += separator;
        }
        passwordWithSeparators += passwordChars[i];
    }

    return passwordWithSeparators;
}