export function encrypt(plainText, key) {
    return CryptoJS.AES.encrypt(plainText, key).toString();
}

export function decrypt(cipherText, key) {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}