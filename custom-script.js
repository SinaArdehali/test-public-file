<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Sélectionner le bouton "S'inscrire"
        var submitButton = document.querySelector('a[href="#submit-form"]');
        var originalButtonText = submitButton.querySelector('.elButtonMain').textContent;

        // Intercepter l'événement de clic sur le bouton "S'inscrire"
        submitButton.addEventListener("click", function(event) {
            event.preventDefault(); // Empêcher le comportement par défaut du bouton (la redirection)

            var phoneNumber = document.querySelector('input[name="phone"]').value; // Sélectionner le champ de téléphone
            console.log(phoneNumber)

            // Afficher un message de chargement ou désactiver le bouton
            submitButton.classList.add('disabled'); // Ajoutez une classe pour indiquer le chargement si nécessaire
            submitButton.querySelector('.elButtonMain').textContent = "Vérification en cours...";

        });
    });
</script>
