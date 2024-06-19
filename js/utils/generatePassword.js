import { characterMap } from "./characterMap.js";
import { LFSR } from "./lfsr.js";

// funcția principală pentru generarea de parole bazată pe inputul și opțiunile furnizate
export function generatePassword(input, length, minAlphanumeric,
    maxAlphanumeric, minNumeric, maxNumeric, minSpecial,
    maxSpecial, separator, separatorInterval, totalPasswords) {
    const passwords = [];

    // împarte inputul în totalPasswords părți egale
    const inputParts = divideString(input, totalPasswords);

    for (let i = 0; i < totalPasswords; i++) {
        let passwordChars = [];

        // generează octeții folosind LFSR pentru fiecare parte a inputului
        const bytes = LFSR(inputParts[i]);

        // selectează caracterele corespunzătoare pentru fiecare octet generat
        bytes.forEach(byte => {
            passwordChars.push(selectChar(byte));
        });

        // ajustează numărul de caractere alfanumerice, numerice și speciale
        passwordChars = adjustPasswordChars(passwordChars, length, minAlphanumeric, maxAlphanumeric, minNumeric, maxNumeric, minSpecial, maxSpecial);

        // adaugă separatoarele la un interval specificat
        passwordChars = addSeparators(passwordChars, separator, separatorInterval);

        // taie parolă la lungimea dorită
        let slicedPassword = passwordChars.slice(0, passwordChars.length - (passwordChars.length - length));

        passwords.push(slicedPassword);
    }

    return passwords;
}

// funcție pentru împărțirea unui șir de caractere în părți egale
function divideString(input, number) {
    const parts = [];
    const length = input.length;
    const partSize = Math.ceil(length / number); // calculează dimensiunea fiecărei părți
    let startPosition = 0;

    for (let i = 0; i < number; i++) {
        if (startPosition >= length) {
            parts.push(""); // adaugă o parte goală dacă startPosition depășește lungimea inputului
        } else {
            const part = input.slice(startPosition, startPosition + partSize);
            parts.push(part);
            startPosition += partSize;
        }
    }

    return parts;
}

// funcție pentru selectarea unui caracter din maparea caracterelor în funcție de un octet dat
function selectChar(byte) {
    const intValue = parseInt(byte, 2); // converteste octetul din binar în întreg

    // determină categoria caracterului pe baza valorii întregi
    const category = Object.keys(characterMap)[intValue % Object.keys(characterMap).length];
    // selectează caracterul corespunzător din categoria determinată
    const selectedChar = characterMap[category][intValue % Object.values(characterMap[category]).length];

    return { char: selectedChar, category: category };
}

// funcție pentru ajustarea numărului de caractere alfanumerice, numerice și speciale în parolă
function adjustPasswordChars(passwordChars, length, minAlphanumeric, maxAlphanumeric, minNumeric, maxNumeric, minSpecial, maxSpecial) {
    let adjustedPasswordChars = [];
    
    const counts = {
        alphanumeric: 0,
        numeric: 0,
        special: 0
    };

    let i = 0;
    while (i < passwordChars.length && adjustedPasswordChars.length < length) {
         // ieși din buclă dacă s-au atins numărul minim de caractere pentru fiecare categorie
        if (counts.alphanumeric == minAlphanumeric && counts.numeric == minNumeric && counts.special == minSpecial) {
            break;
        }

        const c = passwordChars[i];
        // alege caracterele alfanumerice, numerice și speciale în funcție de cerințele minime
        if (c.category == 'alphanumeric' && counts.alphanumeric < minAlphanumeric) {
            counts.alphanumeric++;
            adjustedPasswordChars.push(c.char);
            passwordChars.splice(i, 1); // elimină caracterul selectat din array-ul inițial
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
    // alege caracterele alfanumerice, numerice și speciale în funcție de cerințele maxime
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

// funcție pentru adăugarea separatorului specificat la intervalele specificate în parola generată
function addSeparators(passwordChars, separator, interval) {
    let passwordWithSeparators = '';
    for (let i = 0; i < passwordChars.length; i++) {
        if (i > 0 && i % interval === 0) {
            passwordWithSeparators += separator; // adaugă separatorul la fiecare interval specificat
        }
        passwordWithSeparators += passwordChars[i];
    }

    return passwordWithSeparators;
}