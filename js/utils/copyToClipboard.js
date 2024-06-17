export function copyToClipboard(outputElement) {
    const copyMessage = document.getElementById('copy-message');

    if (outputElement) {
        if (outputElement.value !== '' || outputElement.textContent !== '') {
            const textToCopy = (outputElement.value != null) ? outputElement.value : outputElement.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
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

    setTimeout(() => {
        copyMessage.textContent = '';
    }, 2000);
}