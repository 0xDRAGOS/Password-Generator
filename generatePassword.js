import { characterMap } from "./characterMap.js";
import { LFSR } from "./lfsr.js";

window.generatePassword = function generatePassword() {
    const input = document.getElementById("input").value;
    const length = document.getElementById("length").value;
    const bytes = LFSR(input, length);
    let password = '';

    // console.log(bytes);
    bytes.forEach(byte => {
        // console.log(byte);
        password += selectChar(byte);
    });

    document.getElementById("output").value = password;
} 

function selectChar(byte) {
    const intValue = parseInt(byte, 2);
    const category = Object.keys(characterMap)[intValue % Object.keys(characterMap).length];

    // console.log('category:', intValue % Object.keys(characterMap).length, 'selectChar: ', intValue % Object.values(characterMap[category]).length);
    const selectedChar = characterMap[category][intValue % Object.values(characterMap[category]).length];
    return selectedChar;
}
