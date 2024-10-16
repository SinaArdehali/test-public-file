(function() {
    // Fonction pour créer et afficher le modal
    function showModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
        `;

        modalContent.innerHTML = `
            <h3>Vérification du numéro de téléphone</h3>
            <p>Veuillez entrer le code reçu par SMS :</p>
            <input type="text" id="otpInput" style="margin: 10px 0; padding: 5px;">
            <br>
            <button id="verifyOtp" style="padding: 5px 10px;">Vérifier</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        return modal;
    }

    // Fonction pour simuler la vérification du code OTP
    function verifyOtp(otp) {
        // Simulation de la vérification
        return Math.random() < 0.8; // 80% de chance d'être valide
    }

    // Intercepter le clic sur le bouton de soumission
    const submitButton = document.querySelector('a[href="#submit-form"]');
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        const phoneInput = document.querySelector('input[name="phone"]');
        const phoneNumber = phoneInput.value;

        if (!phoneNumber) {
            alert("Veuillez entrer un numéro de téléphone.");
            return;
        }

        const modal = showModal();

        document.getElementById('verifyOtp').addEventListener('click', function() {
            const otpInput = document.getElementById('otpInput');
            const otp = otpInput.value;

            if (verifyOtp(otp)) {
                modal.remove();
                alert("Vérification réussie. Le formulaire va être soumis.");
                // Ici, vous pouvez ajouter le code pour soumettre le formulaire
            } else {
                alert("Code incorrect. Veuillez réessayer.");
            }
        });
    });
})();
