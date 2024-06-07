import { primitivePolynomials } from "./primitivePolynomialsMap.js";

export function LFSR(seed, length) {
    let state = stringToBinary(seed);
    let stateLength = Math.ceil(Math.log2(state + 1));
    let output = [];
    let chunk = '';

    if (!primitivePolynomials[stateLength]) {
        throw new Error(`No primitive polynomial defined for length ${stateLength}`);
    }

    let feedbackBits = primitivePolynomials[stateLength];

    do {
        let newbit = feedbackBits.reduce((acc, bitPos) => acc ^ ((state >> bitPos) & 1), 0);
        state = (state >> 1) | (newbit << (stateLength - 1));
        chunk += (state & 1).toString();

        if (chunk.length % 8 == 0) {
            output.push(chunk.padEnd(8, '0'));
            chunk = '';
        }
    } while (state != seed && output.length < length && state)

    return output;
}

function stringToBinary(string) {
    let binary = 0;
    
    string.split("").forEach(element => {
        let char = element.charCodeAt(0);
        binary = (binary << 8) | char;
    });

    return binary;
}