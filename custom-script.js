document.addEventListener("DOMContentLoaded", function () {
    // Variables de configuration
    var otpSent = false; // Pour suivre si l'OTP a déjà été envoyé
    var phoneNumber = ""; // Pour stocker le numéro de téléphone
    var otpInput = null; // Référence pour le champ de saisie OTP

    // Sélectionner le bouton "S'inscrire"
    var submitButton = document.querySelector('a[href="#submit-form"]');
    if (!submitButton) {
        console.error("Bouton 'S'inscrire' non trouvé.");
        return;
    }

    // Intercepter l'événement de clic sur le bouton "S'inscrire"
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du bouton

        // Si l'OTP a déjà été envoyé, vérifier le code OTP
        if (otpSent) {
            verifyOtpCode();
        } else {
            // Sinon, envoyer le numéro de téléphone pour générer un OTP
            phoneNumber = document.querySelector('input[name="phone"]').value; // Sélectionner le champ de téléphone
            if (!phoneNumber) {
                alert("Veuillez entrer votre numéro de téléphone.");
                return;
            }
            sendPhoneNumber(phoneNumber);
        }
    });

    // Fonction pour envoyer le numéro de téléphone à l'API
    function sendPhoneNumber(phone) {
        submitButton.classList.add('disabled');
        submitButton.textContent = "Envoi du code SMS...";

        // Simuler l'appel API avec un délai (vous devrez remplacer cela par une requête réelle)
        simulateApiSendOtp(phone)
            .then(function () {
                // Activer la vérification OTP
                otpSent = true;
                displayOtpInputField();
                submitButton.classList.remove('disabled');
                submitButton.textContent = "Vérifier le code";
            })
            .catch(function (error) {
                console.error("Erreur lors de l'envoi du code OTP : ", error);
                alert("Une erreur est survenue lors de l'envoi du code SMS. Veuillez réessayer.");
                submitButton.classList.remove('disabled');
                submitButton.textContent = "S'inscrire";
            });
    }

    // Fonction pour afficher le champ de saisie OTP
    function displayOtpInputField() {
        if (!otpInput) {
            otpInput = document.createElement("input");
            otpInput.type = "text";
            otpInput.placeholder = "Entrez le code OTP reçu";
            otpInput.className = "elInput elInput100 elAlign_left elInputMid elInputStyl0 elInputBG1 elInputI0 elInputIBlack elInputBR1";
            otpInput.style.marginTop = "10px";
            submitButton.parentNode.insertBefore(otpInput, submitButton);
        }
    }

    // Fonction pour vérifier le code OTP
    function verifyOtpCode() {
        var otpCode = otpInput.value;
        if (!otpCode) {
            alert("Veuillez entrer le code OTP.");
            return;
        }

        submitButton.classList.add('disabled');
        submitButton.textContent = "Vérification du code...";

        // Simuler la vérification de l'OTP (remplacer par une requête API réelle)
        simulateApiVerifyOtp(phoneNumber, otpCode)
            .then(function (isValid) {
                if (isValid) {
                    // Si le code est valide, poursuivre la soumission du formulaire
                    submitButton.classList.remove('disabled');
                    submitButton.textContent = "S'inscrire";
                    submitButton.click(); // Déclencher la soumission
                } else {
                    // Si le code est invalide, afficher un message d'erreur
                    alert("Code OTP invalide. Veuillez réessayer.");
                    submitButton.classList.remove('disabled');
                    submitButton.textContent = "Vérifier le code";
                }
            })
            .catch(function (error) {
                console.error("Erreur lors de la vérification du code OTP : ", error);
                alert("Une erreur est survenue lors de la vérification. Veuillez réessayer.");
                submitButton.classList.remove('disabled');
                submitButton.textContent = "Vérifier le code";
            });
    }

    // Simuler l'envoi de l'OTP (remplacer cette fonction par une requête API réelle)
    function simulateApiSendOtp(phone) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Code OTP envoyé au numéro : " + phone);
                resolve(); // Simuler le succès
            }, 2000);
        });
    }

    // Simuler la vérification de l'OTP (remplacer cette fonction par une requête API réelle)
    function simulateApiVerifyOtp(phone, otp) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var isValid = otp === "1234"; // Simuler que le code correct est "1234"
                resolve(isValid);
            }, 2000);
        });
    }
});
