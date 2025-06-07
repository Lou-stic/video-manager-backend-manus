let isAdminMode = false; // Toujours en mode public par défaut

// Éléments DOM
const adminButton = document.getElementById('adminButton');
const authModal = document.getElementById('authModal');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const cancelAuth = document.getElementById('cancelAuth');
const adminMessage = document.getElementById('adminMessage');

const PASSWORD = "admini";

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    loadVideosFromServer();

    for (let i = 1; i <= 4; i++) {
        const embedCodeField = document.getElementById(`embedCode${i}`);
        if (embedCodeField) {
            embedCodeField.addEventListener('input', function() {
                previewVideo(i, this.value);
            });
        }
    }
});

// Événements pour le modal d'authentification
adminButton.addEventListener('click', function() {
    authModal.style.display = 'flex';
    passwordInput.focus();
    passwordInput.value = '';
});
cancelAuth.addEventListener('click', function() {
    authModal.style.display = 'none';
    passwordInput.value = '';
});
loginButton.addEventListener('click', function() {
    authenticateAdmin();
});
passwordInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        authenticateAdmin();
    }
});
window.addEventListener('click', function(event) {
    if (event.target === authModal) {
        authModal.style.display = 'none';
        passwordInput.value = '';
    }
});

// Fonction d'authentification
function authenticateAdmin() {
    const password = passwordInput.value;
    if (password === PASSWORD) {
        enableAdminMode();
        authModal.style.display = 'none';
        passwordInput.value = '';
    } else {
        alert('Mot de passe incorrect');
    }
}
function enableAdminMode() {
    isAdminMode = true;
    for (let i = 1; i <= 4; i++) {
        const controls = document.getElementById(`videoControls${i}`);
        if (controls) controls.style.display = 'block';
    }
    adminMessage.style.display = 'block';
}
function disableAdminMode() {
    isAdminMode = false;
    for (let i = 1; i <= 4; i++) {
        const controls = document.getElementById(`videoControls${i}`);
        if (controls) controls.style.display = 'none';
    }
    adminMessage.style.display = 'none';
}

// Valider et sauvegarder une vidéo
function validateVideo(index) {
    const embedCode = document.getElementById(`embedCode${index}`).value;
    if (embedCode.trim() === '') {
        alert('Veuillez entrer un code d\'intégration valide');
        return;
    }
    // Sauvegarde via API
    fetch(`/api/videos/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embedCode })
    })
    .then(r => {
        if (!r.ok) throw new Error("Erreur lors de la sauvegarde");
        updateVideoDisplay(index, embedCode);
    })
    .catch(e => alert("Erreur de sauvegarde : " + e.message));
}

function editVideo(index) {
    const embedCodeField = document.getElementById(`embedCode${index}`);
    if (embedCodeField) embedCodeField.focus();
}

function previewVideo(index, embedCode) {
    if (embedCode.trim() !== '') {
        updateVideoDisplay(index, embedCode, true);
    }
}

function updateVideoDisplay(index, embedCode, isPreview = false) {
    const container = document.getElementById(`videoContainer${index}`);
    const placeholder = document.getElementById(`videoPlaceholder${index}`);
    if (!container || !placeholder) return;
    // Supprimer l'iframe existant s'il y en a un
    const existingIframe = container.querySelector('iframe');
    if (existingIframe) {
        container.removeChild(existingIframe);
    }
    // Créer un élément temporaire pour extraire l'iframe
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = embedCode;
    const iframe = tempDiv.querySelector('iframe');
    if (iframe) {
        placeholder.style.display = 'none';
        container.appendChild(iframe);
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
    } else {
        placeholder.style.display = 'flex';
    }
}

// Charger les vidéos depuis le serveur (API)
function loadVideosFromServer() {
    fetch('/api/videos')
        .then(res => res.json())
        .then(data => {
            for (let i = 1; i <= 4; i++) {
                const code = data[`video${i}`] || '';
                const embedCodeField = document.getElementById(`embedCode${i}`);
                if (embedCodeField) embedCodeField.value = code;
                updateVideoDisplay(i, code);
            }
        })
        .catch(() => alert("Impossible de charger les vidéos depuis le serveur"));
}

// Déconnexion admin avec Escape
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isAdminMode) {
        disableAdminMode();
    }
});
