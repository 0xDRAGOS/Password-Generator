import { primitivePolynomials } from "./primitivePolynomialsMap.js";

// funcție pentru generarea unui șir de octeti folosind un registru liniar cu deplasare de feedback (LFSR)
export function LFSR(seed) {
    // converteste seedul în reprezentare binară
    let binarySeed = stringToBinary(seed);;
    let state = binarySeed;
    // determină lungimea stării binare
    let stateLength = Math.ceil(Math.log2(state + 1));
    let output = [];
    let chunk = '';
    
    // verifică dacă există un polinom primitiv definit pentru lungimea stării
    if (!primitivePolynomials[stateLength]) {
        throw new Error(`No primitive polynomial defined for length ${stateLength}`);
    }

    let feedbackBits = primitivePolynomials[stateLength];

    // buclă pentru a genera șirurile binare folosind LFSR
    do {
        // calculează noul bit de feedback folosind pozițiile definite în feedbackBits
        let newbit = feedbackBits.reduce((acc, bitPos) => acc ^ ((state >> bitPos) & 1), 0);
        // actualizează starea deplasând biții și adăugând noul bit calculat
        state = (state >> 1) | (newbit << (stateLength - 1));
        chunk += (state & 1).toString();
        
        // adaugă șirurile binare de lungime 8 în output
        if (chunk.length % 8 == 0) {
            output.push(chunk.padEnd(8, '0'));
            chunk = '';
        }
    } while (state != seed && output.length < 512 && state)

    return output;
}

// funcție pentru convertirea unui șir de caractere într-un număr binar
function stringToBinary(string) {
    let binary = 0;
    
    // parcurge fiecare caracter din șir și îl convertește în codul său ASCII, concatenându-l la reprezentarea binară
    string.split("").forEach(element => {
        let char = element.charCodeAt(0);
        binary = (binary << 8) | char;
    });

    return binary;
}