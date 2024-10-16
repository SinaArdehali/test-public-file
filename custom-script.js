document.addEventListener('DOMContentLoaded', function() {
  // Récupérer le bouton de soumission
  var submitButton = document.querySelector('#tmp_button-48759 a');

  // Stocker l'attribut href original
  var originalHref = submitButton.getAttribute('href');

  // Indicateur pour vérifier si l'OTP a été vérifié
  var otpVerified = false;

  // Variable pour stocker l'OTP généré
  var generatedOtp = '';

  // Fonction de gestion du clic
  function handleSubmit(event) {
    if (!otpVerified) {
      event.preventDefault(); // Empêcher l'action par défaut

      // Récupérer le numéro de téléphone
      var phoneInput = document.querySelector('input[name="phone"]');
      var phoneNumber = phoneInput ? phoneInput.value.trim() : '';

      if (!phoneNumber) {
        alert('Veuillez entrer votre numéro de téléphone.');
        return;
      }

      // Générer un OTP simulé s'il n'a pas déjà été généré
      if (!generatedOtp) {
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Code OTP généré (pour test) : ' + generatedOtp);
      }

      // Afficher la modale OTP
      showOtpPrompt().then(function(enteredOtp) {
        if (enteredOtp === generatedOtp) {
          // L'OTP est correct, mettre à jour l'indicateur
          otpVerified = true;

          // Supprimer l'écouteur d'événement pour éviter une boucle
          submitButton.removeEventListener('click', handleSubmit);

          // Lancer l'action par défaut
          submitButton.click();
        } else {
          alert('Code OTP incorrect, veuillez réessayer.');
        }
      });
    } else {
      // L'OTP a été vérifié, laisser l'action par défaut se produire
      // Aucune action nécessaire ici
    }
  }

  // Ajouter l'écouteur d'événement au bouton de soumission
  submitButton.addEventListener('click', handleSubmit);

  function showOtpPrompt() {
    return new Promise(function(resolve) {
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

      // Gérer la soumission de l'OTP
      submitOtpButton.addEventListener('click', function() {
        var enteredOtp = otpInput.value.trim();
        // Nettoyer la modale
        document.body.removeChild(modalOverlay);
        resolve(enteredOtp);
      });

      // Permettre la soumission en appuyant sur "Entrée"
      otpInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          submitOtpButton.click();
        }
      });
    });
  }
});
