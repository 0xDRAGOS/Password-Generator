(function() {
    function detectSignupPage() {
        var passwordInputs = document.querySelectorAll('input[type="password"]');
        var emailOrUsernameInputs = document.querySelectorAll('input[name*="email"], input[name*="username"], input[id*="email"], input[id*="username"], input[class*="email"], input[class*="username"]');
        
        var emailOrUsernameNotEmpty = Array.from(emailOrUsernameInputs).some(input => input.value.trim() !== '');

        var isSignupPage = passwordInputs.length > 0 && emailOrUsernameInputs.length > 0 && emailOrUsernameNotEmpty;
        
        if (isSignupPage) {
            showCustomPopup('You can use Password Generator extension to create a strong password.');
        }
    }

    document.addEventListener('click', function(event) {
        var target = event.target;
        if (target && target.matches('input[type="password"]')) {
            detectSignupPage();
        }
    }, true); 

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