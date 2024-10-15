document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner le bouton "S'inscrire"
    var submitButton = document.querySelector('a[href="#submit-form"]');
    if (!submitButton) {
        console.error("Bouton 'S'inscrire' non trouvé.");
        return;
    }

    // Intercepter l'événement de clic sur le bouton "S'inscrire"
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du bouton (la redirection)

        var phoneNumber = document.querySelector('input[name="phone"]').value; // Sélectionner le champ de téléphone
        console.log(phoneNumber);

        // Afficher un message de chargement ou désactiver le bouton
        submitButton.classList.add('disabled');
        submitButton.textContent = "Vérification en cours...";

        // Simuler un appel API avec un délai de 5 secondes
        simulateApiCall(phoneNumber)
            .then(function (isValid) {
                if (isValid) {
                    // Si le numéro est valide, poursuivre la soumission de la page
                    window.location.href = submitButton.getAttribute('href');
                } else {
                    // Si le numéro est invalide, afficher un message d'erreur et débloquer le bouton
                    alert("Le numéro de téléphone est invalide. Veuillez réessayer.");
                    submitButton.classList.remove('disabled');
                    submitButton.textContent = "S'INSCRIRE";
                }
            })
            .catch(function (error) {
                // En cas d'erreur lors de la requête, afficher un message d'erreur
                console.error("Erreur lors de la validation du numéro : ", error);
                alert("Une erreur est survenue. Veuillez réessayer.");
                submitButton.classList.remove('disabled');
                submitButton.textContent = "S'INSCRIRE";
            });
    });

    // Fonction pour simuler un appel API avec un délai de 5 secondes
    function simulateApiCall(phoneNumber) {
        return new Promise(function (resolve, reject) {
            // Simuler un délai de 5 secondes
            setTimeout(function () {
                // Simuler une réponse aléatoire pour la validation
                var isValid = Math.random() > 0.5; // 50% de chances que le numéro soit valide
                resolve(isValid);
            }, 5000);
        });
    }
});
