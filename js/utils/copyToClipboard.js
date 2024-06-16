export function copyToClipboard(outputElement) {
    const copyMessage = document.getElementById('copy-message');

    if (outputElement) {
        if (outputElement.value !== '') {
            navigator.clipboard.writeText(outputElement.value).then(() => {
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