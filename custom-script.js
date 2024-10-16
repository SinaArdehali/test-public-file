document.addEventListener('DOMContentLoaded', function () {
            var submitButton = document.querySelector('#tmp_button-48759 a');
            var otpVerified = false;

            // Ajouter un attribut personnalisé au bouton
            submitButton.setAttribute('data-action', 'inscrire');

            // Intercepter le clic sur le bouton
            document.body.addEventListener('click', function(event) {
                var target = event.target.closest('#tmp_button-48759 a');
                if (target) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (!otpVerified) {
                        alert("Veuillez vérifier votre OTP avant de soumettre.");
                        alert("Processus stoppé.");
                    } else {
                        // Si l'OTP est vérifié, exécuter la fonction inscrire
                        var action = target.getAttribute('data-action');
                        if (action && window[action]) {
                            window[action]();
                        }
                    }
                }
            });
        });
