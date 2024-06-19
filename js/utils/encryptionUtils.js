// funcție pentru criptare folosind alg. AES
export function encrypt(plainText, key) {
    return CryptoJS.AES.encrypt(plainText, key).toString();
}

// funcție pentru decriptare
export function decrypt(cipherText, key) {
    // decriptează textul criptat cu cheia specificată
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    // convertește octeții decriptați în text UTF-8
    return bytes.toString(CryptoJS.enc.Utf8);
}