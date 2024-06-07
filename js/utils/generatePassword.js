import { characterMap } from "./characterMap.js";
import { LFSR } from "./lfsr.js";

export function generatePassword(input, length) {
    const bytes = LFSR(input, length);
    let password = '';

    bytes.forEach(byte => {
        console.log(byte);
        password += selectChar(byte);
    });
    
    return password;
} 

function selectChar(byte) {
    const intValue = parseInt(byte, 2);

    const category = Object.keys(characterMap)[intValue % Object.keys(characterMap).length];
    const selectedChar = characterMap[category][intValue % Object.values(characterMap[category]).length];
    
    return selectedChar;
}
