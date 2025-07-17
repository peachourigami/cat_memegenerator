// ================================
// CONFIGURAZIONE GLOBALE
// ================================

// Array dei meme disponibili
const memeSources = [
    'https://i.imgur.com/tCatLXt.jpg',
    'https://i.imgur.com/VHbzBmd.jpg',
    'https://i.imgur.com/lJSkfbC.mp4',
    'https://i.imgur.com/3Jr2Z64.jpg',
    'https://i.imgur.com/kq1zGpj.jpg'
];

// Variabili di controllo
let startTime = Date.now();
let memeInterval = 4000; // Intervallo di creazione pulsanti (4 secondi)
let clippyShown = false;
let activeButtons = [];
let memeDisplayed = false;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let isTouch = 'ontouchstart' in window;

// Configurazione responsive
const config = {
    mobile: {
        buttonInterval: 5000, // Più lento su mobile
        maxButtons: 3,
        buttonTimeout: 12000
    },
    desktop: {
        buttonInterval: 4000,
        maxButtons: 5,
        buttonTimeout: 10000
    }
};

// Ottieni configurazione corrente
const currentConfig = isMobile ? config.mobile : config.desktop;

// ================================
// FUNZIONI PRINCIPALI
// ================================

/**
 * Crea un nuovo pulsante in posizione casuale
 */
function createButton() {
    // Limita il numero di pulsanti su mobile
    if (activeButtons.length >= currentConfig.maxButtons) {
        return;
    }

    const btn = document.createElement('button');
    btn.className = 'meme-button';
    btn.textContent = 'Clicca qui!';

    // Calcola posizione sicura per mobile
    const buttonWidth = isMobile ? 120 : 100;
    const buttonHeight = isMobile ? 48 : 40;
    const padding = 20;

    const maxX = Math.max(window.innerWidth - buttonWidth - padding, padding);
    const maxY = Math.max(window.innerHeight - buttonHeight - padding, padding);

    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;

    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    // Eventi touch-friendly
    if (isTouch) {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.style.transform = 'scale(0.95)';
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.style.transform = '';
            showMeme();
            removeButton(btn);
        });

        btn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            btn.style.transform = '';
        });
    } else {
        btn.onclick = () => {
            showMeme();
            removeButton(btn);
        };
    }

    // Aggiungi alla pagina e all'array
    document.body.appendChild(btn);
    activeButtons.push(btn);

    // Rimuovi automaticamente
    setTimeout(() => {
        removeButton(btn);
    }, currentConfig.buttonTimeout);
}

/**
 * Rimuove un pulsante specifico
 */
function removeButton(button) {
    if (button && button.parentNode) {
        button.parentNode.removeChild(button);
        activeButtons = activeButtons.filter(btn => btn !== button);
    }
}

/**
 * Mostra un meme casuale
 */
function showMeme() {
    // Rimuovi meme precedente se presente
    const existingMeme = document.querySelector('.meme-container');
    if (existingMeme) {
        existingMeme.remove();
    }

    // Crea contenitore meme
    const memeContainer = document.createElement('div');
    memeContainer.className = 'meme-container';

    // Seleziona fonte casuale
    const source = memeSources[Math.floor(Math.random() * memeSources.length)];

    // Crea elemento appropriato
    let element;
    if (source.endsWith('.mp4')) {
        element = document.createElement('video');
        element.src = source;
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
        element.controls = false;
    } else {
        element = document.createElement('img');
        element.src = source;
        element.alt = 'Meme divertente';
    }

    // Stili elemento
    element.style.maxWidth = '100%';
    element.style.maxHeight = '100%';
    element.style.objectFit = 'contain';

    // Gestione errori di caricamento
    element.onerror = () => {
        console.warn('Errore nel caricamento del meme:', source);
        memeContainer.innerHTML = '<p style="color: #333; padding: 20px; text-align: center;">Errore nel caricamento del meme 😿</p>';
    };

    // Aggiungi alla pagina
    memeContainer.appendChild(element);
    document.body.appendChild(memeContainer);

    // Rimuovi dopo 8 secondi
    setTimeout(() => {
        if (memeContainer.parentNode) {
            memeContainer.remove();
        }
    }, 8000);

    memeDisplayed = true;
}

/**
 * Mostra Clippy dopo 9 secondi
 */
function showClippy() {
    if (!clippyShown) {
        const clippy = document.getElementById('clippy');
        if (clippy) {
            clippy.style.display = 'block';
            clippy.style.animation = 'bounce 2s infinite';
            clippyShown = true;

            // Evento click su Clippy
            clippy.onclick = () => {
                alert('Benvenuto nella sezione teorica. Qui andrai alla tesi.');
                // Puoi aggiungere qui la logica per reindirizzare alla tesi
                // window.location.href = 'tesi.html';
            };
        }
    }
}

/**
 * Pulisce tutti i pulsanti attivi
 */
function clearAllButtons() {
    activeButtons.forEach(btn => {
        if (btn.parentNode) {
            btn.parentNode.removeChild(btn);
        }
    });
    activeButtons = [];
}

/**
 * Gestisce il ridimensionamento della finestra
 */
function handleResize() {
    // Aggiorna detection mobile
    const newWidth = window.innerWidth;
    const wasMobile = isMobile;
    isMobile = newWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Se è cambiato il tipo di dispositivo, aggiorna configurazione
    if (wasMobile !== isMobile) {
        Object.assign(currentConfig, isMobile ? config.mobile : config.desktop);
        memeInterval = currentConfig.buttonInterval;
    }

    // Riposiziona i pulsanti che potrebbero essere fuori schermo
    const buttonWidth = isMobile ? 120 : 100;
    const buttonHeight = isMobile ? 48 : 40;
    const padding = 20;

    activeButtons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.right > window.innerWidth || rect.bottom > window.innerHeight ||
            rect.left < 0 || rect.top < 0) {

            const maxX = Math.max(window.innerWidth - buttonWidth - padding, padding);
            const maxY = Math.max(window.innerHeight - buttonHeight - padding, padding);

            const newX = Math.random() * (maxX - padding) + padding;
            const newY = Math.random() * (maxY - padding) + padding;

            btn.style.left = `${newX}px`;
            btn.style.top = `${newY}px`;
        }
    });

    // Aggiusta dimensioni meme container
    const memeContainer = document.querySelector('.meme-container');
    if (memeContainer) {
        if (isMobile) {
            memeContainer.style.maxWidth = '95vw';
            memeContainer.style.maxHeight = '65vh';
        } else {
            memeContainer.style.maxWidth = '80vw';
            memeContainer.style.maxHeight = '80vh';
        }
    }
}

// ================================
// INIZIALIZZAZIONE
// ================================

/**
 * Inizializza il sito web
 */
function initializeSite() {
    console.log('Cat Meme Site inizializzato!');
    console.log('Dispositivo mobile:', isMobile);
    console.log('Touch supportato:', isTouch);

    // Imposta intervallo basato su dispositivo
    memeInterval = currentConfig.buttonInterval;

    // Primo pulsante dopo 3 secondi
    setTimeout(() => {
        createButton();

        // Interval per creare pulsanti regolarmente
        setInterval(() => {
            createButton();

            // Controlla se mostrare Clippy
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed >= 9) {
                showClippy();
            }
        }, memeInterval);

    }, 3000);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100); // Delay per orientationchange
    });

    // Gestione scroll su mobile
    if (isMobile) {
        document.body.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });

        // Previeni zoom doppio tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    } else {
        // Previeni scroll accidentale su desktop
        document.body.addEventListener('wheel', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    // Gestione tasti (solo desktop)
    if (!isMobile) {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    const currentMeme = document.querySelector('.meme-container');
                    if (currentMeme) {
                        currentMeme.remove();
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    showMeme();
                    break;
            }
        });
    }

    // Gestione visibilità pagina (pausa quando nascosta)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pausa creazione pulsanti quando la pagina non è visibile
            console.log('Pagina nascosta - pausa attività');
        } else {
            console.log('Pagina visibile - riprendi attività');
        }
    });
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Genera colore casuale
 */
function getRandomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Aggiunge nuovo meme alla lista
 */
function addMemeSource(url) {
    if (url && !memeSources.includes(url)) {
        memeSources.push(url);
        console.log('Nuovo meme aggiunto:', url);
    }
}

/**
 * Cambia intervallo di creazione pulsanti
 */
function setButtonInterval(newInterval) {
    if (newInterval > 1000) {
        memeInterval = newInterval;
        currentConfig.buttonInterval = newInterval;
        console.log('Intervallo pulsanti cambiato a:', newInterval);
    }
}

/**
 * Rileva se il dispositivo è mobile
 */
function detectMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Ottieni dimensioni sicure per il posizionamento
 */
function getSafeArea() {
    const padding = 20;
    const buttonWidth = isMobile ? 120 : 100;
    const buttonHeight = isMobile ? 48 : 40;

    return {
        minX: padding,
        minY: padding,
        maxX: Math.max(window.innerWidth - buttonWidth - padding, padding),
        maxY: Math.max(window.innerHeight - buttonHeight - padding, padding)
    };
}

/**
 * Vibrazione su dispositivi mobili (se supportata)
 */
function vibrate(pattern = 50) {
    if ('vibrate' in navigator && isMobile) {
        navigator.vibrate(pattern);
    }
}

/**
 * Gestione performance per dispositivi più lenti
 */
function optimizeForDevice() {
    if (isMobile) {
        // Riduci animazioni su mobile
        document.documentElement.style.setProperty('--animation-duration', '0.2s');

        // Disabilita animazioni complesse se performance bassa
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--disable-complex-animations', 'true');
        }
    }
}

// ================================
// AVVIO AUTOMATICO
// ================================

// Avvia il sito quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    optimizeForDevice();
    initializeSite();
});

// Fallback per browser più vecchi
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        optimizeForDevice();
        initializeSite();
    });
} else {
    optimizeForDevice();
    initializeSite();
}

// Gestione connessione lenta
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.log('Connessione lenta rilevata - ottimizzazione attiva');
        memeInterval = Math.max(memeInterval * 1.5, 6000); // Rallenta su connessione lenta
    }
}