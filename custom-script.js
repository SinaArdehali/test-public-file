document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the submit button
  var submitButton = document.querySelector('#tmp_button-48759 a');

  // Store the original href in case we need to use it later
  var originalHref = submitButton.getAttribute('href');

  submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action

    // Retrieve the phone number
    var phoneInput = document.querySelector('input[name="phone"]');
    var phoneNumber = phoneInput ? phoneInput.value.trim() : '';

    if (!phoneNumber) {
      alert('Veuillez entrer votre numéro de téléphone.');
      return;
    }

    // Mock sending OTP
    var generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP (for testing purposes): ' + generatedOtp);

    // Display OTP modal
    showOtpPrompt().then(function(enteredOtp) {
      if (enteredOtp === generatedOtp) {
        // OTP is correct, proceed with submission
        // Remove the event listener to avoid infinite loop
        submitButton.removeEventListener('click', arguments.callee);

        // Option 1: Trigger the default action
        window.location.href = originalHref;

        // Option 2: Programmatically submit data if necessary
        // collectAndSubmitData();

      } else {
        alert('Code OTP incorrect, veuillez réessayer.');
      }
    });
  });

  function showOtpPrompt() {
    return new Promise(function(resolve) {
      // Create the modal overlay
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

      // Create the modal content
      var modalContent = document.createElement('div');
      modalContent.style.backgroundColor = '#fff';
      modalContent.style.padding = '20px';
      modalContent.style.borderRadius = '8px';
      modalContent.style.textAlign = 'center';
      modalContent.style.maxWidth = '90%';
      modalContent.style.boxSizing = 'border-box';

      // Create the message
      var message = document.createElement('p');
      message.textContent = 'Veuillez entrer le code OTP envoyé à votre téléphone:';
      modalContent.appendChild(message);

      // Create the input field
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

      // Create the submit button
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

      // Add content to overlay
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);

      // Focus on the OTP input
      otpInput.focus();

      // Handle OTP submission
      submitOtpButton.addEventListener('click', function() {
        var enteredOtp = otpInput.value.trim();
        // Clean up the modal
        document.body.removeChild(modalOverlay);
        resolve(enteredOtp);
      });

      // Allow pressing "Enter" to submit
      otpInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          submitOtpButton.click();
        }
      });
    });
  }

  // Optional: Function to programmatically submit data via AJAX if needed
  function collectAndSubmitData() {
    var firstNameInput = document.querySelector('input[name="first_name"]');
    var firstName = firstNameInput ? firstNameInput.value.trim() : '';

    var phoneInput = document.querySelector('input[name="phone"]');
    var phoneNumber = phoneInput ? phoneInput.value.trim() : '';

    // Prepare data to submit
    var formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('phone', phoneNumber);

    // Submit data via AJAX
    fetch('https://your-backend.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Handle response
      console.log('Form submitted successfully:', data);
      // Optionally redirect the user
      window.location.href = '/thank-you-page';
    })
    .catch(function(error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue lors de la soumission du formulaire.');
    });
  }
});
