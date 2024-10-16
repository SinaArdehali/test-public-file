<script>
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer le formulaire au lieu du bouton
  var form = document.querySelector('form');
  var otpVerified = false;
  var otpSent = false;

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Toujours empêcher la soumission par défaut

    if (otpVerified) {
      // Si l'OTP est vérifié, soumettre le formulaire
      form.submit();
      return;
    }

    // Récupérer le numéro de téléphone
    var phoneInput = form.querySelector('input[name="phone"]');
    var phoneNumber = phoneInput ? phoneInput.value.trim() : '';

    if (!phoneNumber) {
      alert('Veuillez entrer votre numéro de téléphone.');
      return;
    }

    if (!otpSent) {
      // Envoyer la requête pour générer et envoyer l'OTP
      fetch('https://votre-backend.com/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          otpSent = true;
          showOtpPrompt();
        } else {
          alert('Erreur lors de l'envoi du code OTP. Veuillez réessayer.');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      });
    } else {
      showOtpPrompt();
    }
  });

  function showOtpPrompt() {
    // Créer la superposition de la modale
      var modalOverlay = document.createElement('div');
      modalOverlay.style.position = 'fixed';
      modalOverlay.style.top = '0';
      modalOverlay.style.left = '0';
      modalOverlay.style.width = '100%';
      modalOverlay.style.height = '100%';
      modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modalOverlay.style.display = 'flex';
      modalOverlay.style.alignItems = 'center';
      modalOverlay.style.justifyContent = 'center';
      modalOverlay.style.zIndex = '1000';

      // Créer le contenu de la modale
      var modalContent = document.createElement('div');
      modalContent.style.backgroundColor = '#fff';
      modalContent.style.padding = '20px';
      modalContent.style.borderRadius = '8px';
      modalContent.style.textAlign = 'center';
      modalContent.style.maxWidth = '90%';
      modalContent.style.boxSizing = 'border-box';

      // Créer le message
      var message = document.createElement('p');
      message.textContent = 'Veuillez entrer le code OTP envoyé à votre téléphone :';
      modalContent.appendChild(message);

      // Créer le champ de saisie
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

      // Créer le bouton de validation
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

      // Ajouter le contenu à la superposition
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);

      // Mettre le focus sur le champ OTP
      otpInput.focus();

    // Modification de la gestion de la soumission de l'OTP
    submitOtpButton.addEventListener('click', function() {
      var enteredOtp = otpInput.value.trim();

        // Nettoyer la modale
        document.body.removeChild(modalOverlay);
        resolve(enteredOtp);
      
      // Vérifier l'OTP avec le backend
      // fetch('https://votre-backend.com/verify-otp', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     phoneNumber: phoneNumber,
      //     otp: enteredOtp 
      //   }),
     //  })
      // .then(response => response.json())
     //  .then(data => {
     //    if (data.success) {
     //      otpVerified = true;
     //      document.body.removeChild(modalOverlay);
     //      form.submit(); // Soumettre le formulaire si l'OTP est correct
    //     } else {
     //      alert('Code OTP incorrect, veuillez réessayer.');
     //    }
     //  })
      // .catch(error => {
      //   console.error('Erreur:', error);
      //   alert('Une erreur est survenue. Veuillez réessayer.');
     //  });
    });

      // Permettre la soumission en appuyant sur "Entrée"
      otpInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          submitOtpButton.click();
        }
      });

    // ... (reste du code pour la modale)
  }
});
</script>
