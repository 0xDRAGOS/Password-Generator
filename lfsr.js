import { primitivePolynomials } from "./primitivePolynomialsMap.js";

export function LFSR(seed, length) {
    let state = stringToBinary(seed);
    console.log(state.toString(2));
    let stateLength = Math.ceil(Math.log2(state + 1));
    console.log(stateLength);
    let output = [];
    let chunk = '';

    if (!primitivePolynomials[stateLength]) {
        throw new Error(`No primitive polynomial defined for length ${stateLength}`);
    }

    let feedbackBits = primitivePolynomials[stateLength];
    console.log('Feedback bits:', feedbackBits);

    do {
        console.log('state init: ', state.toString(2));
        let newbit = feedbackBits.reduce((acc, bitPos) => acc ^ ((state >> bitPos) & 1), 0);
        state = (state >> 1) | (newbit << (stateLength - 1));
        console.log('state >> 1', (state >> 1).toString(2));
        console.log('newbit << (stateLength - 1)', (newbit << (stateLength - 1)).toString(2));
        console.log('newbit: ', newbit.toString(2), 'state: ', state.toString(2));
        chunk += (state & 1).toString();
        console.log('chunk: ', chunk);
        if (chunk.length % 8 == 0) {
            output.push(chunk.padEnd(8, '0'));
            chunk = '';
        }
    } while (state != seed && output.length < length && state)

    console.log('output: ', output);
    return output;
}

function stringToBinary(string) {
    let binary = 0;
    
    string.split("").forEach(element => {
        let char = element.charCodeAt(0);
        binary = (binary << 8) | char;
    });
    console.log(binary.toString(2));  // For debugging: show the binary representation
    return binary;
}

// export function LFSR(seed, length) {
//     let state = stringToBinary(seed);
//     console.log(state);
//     let stateLength = state.length;
//     console.log(stateLength);
//     let output = [];
//     let chunk = '';

//     console.log(typeof(state));
//     console.log(typeof('0b101010'))
//     console.log(typeof(0b101010))

//     if (!primitivePolynomials[stateLength]) {
//         throw new Error(`No primitive polynomial defined for length ${stateLength}`);
//     }

//     let feedbackBits = primitivePolynomials[stateLength];
//     console.log('Feedback bits:', feedbackBits);

//     do {
//         console.log('state init: ', state.toString(2));
//         let newbit = feedbackBits.reduce((acc, bitPos) => acc ^ ((state >> bitPos) & 1), 0);
//         state = (state >> 1) | (newbit << (stateLength - 1));
//         console.log('state >> 1', (state >> 1).toString(2));
//         console.log('newbit << (stateLength - 1)', (newbit << (stateLength - 1)).toString(2));
//         console.log('newbit: ', newbit.toString(2), 'state: ', state.toString(2));
//         chunk += (state & 1).toString();
//         console.log('chunk: ', chunk);
//         if (chunk.length % 8 == 0) {
//             output.push(chunk.padEnd(8, '0'));
//             chunk = '';
//         }
//     } while (state != seed && output.length < length && state)

//     console.log('output: ', output);
//     return output;
// }

// function stringToBinary(string) {
//     let output = '';

//     string.split("").forEach(element => {
//         let char = element.charCodeAt(0).toString(2);
//         output += ("00000000" + char).slice(-8);
//     });

//     return output;
// }