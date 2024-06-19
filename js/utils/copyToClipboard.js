export function copyToClipboard(outputElement) {
    // caută elementul în care se va afișa mesajul de copiere
    const copyMessage = document.getElementById('copy-message');

    // dacă outputElement este valid
    if (outputElement) {
        // dacă output element are valoare sau conținut (folosesc funcția pentru taguri de tip input și span)
        if (outputElement.value !== '' || outputElement.textContent !== '') {
            // determină textul în funcție de tipul elementului
            const textToCopy = (outputElement.value != null) ? outputElement.value : outputElement.textContent;

            // se folosește de API-ul clipboard pentru a scrie textul în clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // mesaj în caz de succes
                copyMessage.textContent = "Password was successfully copied to clipboard.";
            }).catch(err => {
                // mesaj in caz de eroare
                copyMessage.textContent = "Could not copy the password to clipboard.";
            })
        } else {
            // mesaj în caz că outputElement este gol
            copyMessage.textContent = "Password output is empty.";
        }
    } else {
        // dacă outputElement nu este găsit
        console.error("Could not find output or copyMessage element.")
    }

    // șterge mesajul de copiere după 2 secunde
    setTimeout(() => {
        copyMessage.textContent = '';
    }, 2000);
}