document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour trouver le bouton de soumission
  function findSubmitButton() {
    // Recherche plus générique du bouton de soumission
    return document.querySelector('a[href="#submit"], button[type="submit"], input[type="submit"]');
  }

  var submitButton = findSubmitButton();
  if (!submitButton) {
    console.error("Bouton de soumission non trouvé");
    return;
  }

  var otpVerified = false;
  var otpSent = false;

  submitButton.addEventListener('click', function(event) {
    if (!otpVerified) {
      event.preventDefault();
      event.stopPropagation();

      var phoneInput = document.querySelector('input[name="phone"], input[type="tel"]');
      var phoneNumber = phoneInput ? phoneInput.value.trim() : '';

      if (!phoneNumber) {
        alert('Veuillez entrer votre numéro de téléphone.');
        return;
      }

      if (!otpSent) {
        // Simuler l'envoi de l'OTP (à remplacer par un appel API réel)
        sendOtp(phoneNumber).then(function() {
          otpSent = true;
          showOtpPrompt();
        }).catch(function(error) {
          alert('Erreur lors de l\'envoi de l\'OTP: ' + error);
        });
      } else {
        showOtpPrompt();
      }
    }
  });

  function sendOtp(phoneNumber) {
    // Simulation d'envoi d'OTP (à remplacer par un appel API réel)
    return new Promise(function(resolve) {
      setTimeout(function() {
        window.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Code OTP généré (pour test) : ' + window.generatedOtp);
        resolve();
      }, 1000);
    });
  }

  function verifyOtp(enteredOtp) {
    // Simulation de vérification d'OTP (à remplacer par un appel API réel)
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(enteredOtp === window.generatedOtp);
      }, 1000);
    });
  }

  function showOtpPrompt() {
    var modalOverlay = document.createElement('div');
    modalOverlay.id = 'otpModalOverlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.zIndex = '1000000';

    var modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.textAlign = 'center';
    modalContent.style.maxWidth = '90%';
    modalContent.style.boxSizing = 'border-box';

    var message = document.createElement('p');
    message.textContent = 'Veuillez entrer le code OTP envoyé à votre téléphone :';
    modalContent.appendChild(message);

    var otpInput = document.createElement('input');
    otpInput.type = 'text';
    otpInput.placeholder = 'Code OTP';
    otpInput.style.width = '80%';
    otpInput.style.padding = '10px';
    otpInput.style.marginBottom = '10px';
    otpInput.style.fontSize = '16px';
    otpInput.style.borderRadius = '4px';
    otpInput.style.border = '1px solid #ccc';
    modalContent.appendChild(otpInput);

    var submitOtpButton = document.createElement('button');
    submitOtpButton.textContent = 'Valider';
    submitOtpButton.style.padding = '10px 20px';
    submitOtpButton.style.fontSize = '16px';
    submitOtpButton.style.borderRadius = '4px';
    submitOtpButton.style.border = 'none';
    submitOtpButton.style.backgroundColor = '#28a745';
    submitOtpButton.style.color = '#fff';
    submitOtpButton.style.cursor = 'pointer';
    modalContent.appendChild(submitOtpButton);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    otpInput.focus();

    function closeModal() {
      document.body.removeChild(modalOverlay);
    }

    function handleOtpSubmit() {
      var enteredOtp = otpInput.value.trim();
      if (enteredOtp) {
        verifyOtp(enteredOtp).then(function(isValid) {
          if (isValid) {
            otpVerified = true;
            closeModal();
            submitButton.click();
          } else {
            alert('Code OTP incorrect, veuillez réessayer.');
          }
        });
      }
    }

    submitOtpButton.addEventListener('click', handleOtpSubmit);
    otpInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        handleOtpSubmit();
      }
    });
  }
});
