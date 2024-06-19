// funcție care este injectată automat în paginile web
(function() {
    function detectSignupPage() {
        // selectează toate inputurile de tip password și inputurile care pot conține email/username
        var passwordInputs = document.querySelectorAll('input[type="password"]');
        var emailOrUsernameInputs = document.querySelectorAll('input[name*="email"], input[name*="username"], input[id*="email"], input[id*="username"], input[class*="email"], input[class*="username"]');
        
        // verifică dacă există cel puțin un email/username
        var emailOrUsernameNotEmpty = Array.from(emailOrUsernameInputs).some(input => input.value.trim() !== '');
        
        // verifică dacă este o pagină de înregistrare
        var isSignupPage = passwordInputs.length > 0 && emailOrUsernameInputs.length > 0 && emailOrUsernameNotEmpty;
        
        // dacă este o pagină de înregistrare se afișează un popup personalizat
        if (isSignupPage) {
            showCustomPopup('You can use Password Generator extension to create a strong password.');
        }
    }

    // adaugă un event listener pentru click pe întreaga pagină
    document.addEventListener('click', function(event) {
        var target = event.target;
        // dacă se apasă pe un input de tip password se acționează detectSignupPage
        if (target && target.matches('input[type="password"]')) {
            detectSignupPage();
        }
    }, true); 

    // funcție pentru afișarea unui popup personalizat care conține crearea și stilizarea lui
    function showCustomPopup(message) {
        var popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = 'rgb(58, 27, 35)';
        popup.style.padding = '15px';
        popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        popup.style.zIndex = '10000';
        popup.style.borderRadius = '5px';
        popup.style.fontFamily = 'Arial, sans-serif';
        popup.style.fontSize = '14px';
        popup.style.color = 'rgb(153, 127, 43)';

        var messageText = document.createElement('p');
        messageText.textContent = message;
        messageText.style.fontWeight = '900';
        popup.appendChild(messageText);

        var closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.backgroundColor = 'rgb(153, 127, 43)';
        closeButton.style.color = 'rgb(58, 27, 35)';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '3px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(popup);
        });

        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }
})();