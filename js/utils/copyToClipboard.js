export function copyToClipboard() {
    const outputField = document.getElementById('output');
    const copyMessage = document.getElementById('copyMessage');

    if (outputField) {
        if (outputField.value !== '') {
            navigator.clipboard.writeText(outputField.value).then(() => {
                copyMessage.textContent = "Password was successfully copied to clipboard.";
            }).catch(err => {
                copyMessage.textContent = "Could not copy the password to clipboard.";
            })
        } else {
            copyMessage.textContent = "Password output is empty.";
        }
    } else {
        console.error("Could not find output or copyMessage element.")
    }
}