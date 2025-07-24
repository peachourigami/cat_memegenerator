const memeSources = [
    'https://i.imgur.com/ceaqB4N.jpeg',
    'https://i.imgur.com/RUMJiz5.jpeg',
    'https://i.imgur.com/tvVI67W.jpeg',
    'https://i.imgur.com/Zwe4Src.jpeg',
    'https://i.imgur.com/j5KnYhg.mp4',
    'https://i.imgur.com/wXYyWj2.jpeg',
    'https://i.imgur.com/r4BJUNx.mp4',
    'https://i.imgur.com/SV4zD1u.gif',
    'https://i.imgur.com/PbmSlPj.jpeg',
    'https://pbs.twimg.com/profile_images/1159519350925201408/lgjd_Phv_400x400.jpg',
    'https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif',
    'https://media.tenor.com/adoVIoM4eo4AAAAM/keyboard-cat.gif',
    'https://i.pinimg.com/originals/45/77/85/4577853f98ae7f2320f091dc999c30ac.gif',
    'https://cdn.shopify.com/s/files/1/0344/6469/files/keyboard-cat-gif.gif?v=1521655608',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hpemlkZHVtbDd1Z2xza2k4NW9xN2VlZzN4dHc2OG15dmpiNnptNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JuFwy0zPzd6jC/giphy.gif',
    'https://m.media-amazon.com/images/I/51V+1wd2dFL.jpg',
    'https://en.meming.world/images/en/d/d0/Crying_Cat.jpg',
    'https://media.tenor.com/gm_mhpzK1wsAAAAM/gato-cat.gif',
    'https://media.tenor.com/pFz1Q12_hXEAAAAM/cat-holding-head-cat.gif',
    'https://media.tenor.com/TCwr0dAZ8UYAAAAM/cat-say-bleh.gif',
    'https://staticfanpage.akamaized.net/wp-content/uploads/sites/6/2021/07/coughing-cat-b-1200x675.jpg',
    'https://i.pinimg.com/originals/5a/f1/0f/5af10f4a6c3b115a65d094755075f2ee.gif',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLSDsTNlS9lLWpPhiRFxcHyo4QAS6KdtacxaQWLfQremI3Zs_yk4PqK0m4-FqtpaJWHrjyTSFm_3QXsvDi_2KXdgvwmID5M048dA9vbm3p3SRM9LDOHXUyGfS2zTaK4nDllisi/s1600/monorailcat.jpg',
    'https://media.tenor.com/DFfCL02_DCcAAAAM/cat-look.gif',
    'https://i.pinimg.com/564x/cf/ca/5b/cfca5b6f7cea1689e5ad970e265479ff.jpg',
    'https://a.pinatafarm.com/500x500/e2f31b48e9/business-cat.jpg'
];

const buttonTexts = [
    "Clicca qui!",
    "Non farlo!",
    "Premi se hai coraggio",
    "Gatto dentro?",
    "Apri il caos",
    "Non cliccare",
    "Più meme!"
];

const buttonStyles = [
    'btn-aqua-green',
    'btn-aqua-blue',
    'btn-blinkie-rainbow',
    'btn-win95-error',
    'btn-scene-checker',
    'btn-pixel-cute',
    'btn-terminal'
];

// Associazione suoni per ogni tipo di bottone
const buttonSounds = {
    'btn-aqua-green': {
        appear: 'sound/aqua-appear.mp3',
        click: 'sound/aqua-click.mp3'
    },
    'btn-aqua-blue': {
        appear: 'sound/blue-appear.mp3',
        click: 'sound/blue-click.mp3'
    },
    'btn-blinkie-rainbow': {
        appear: 'sound/rainbow-appear.mp3',
        click: 'sound/rainbow-click.mp3'
    },
    'btn-win95-error': {
        appear: 'sound/win95-appear.mp3',
        click: 'sound/win95-click.mp3'
    },
    'btn-scene-checker': {
        appear: 'sound/scene-appear.mp3',
        click: 'sound/scene-click.mp3'
    },
    'btn-pixel-cute': {
        appear: 'sound/pixel-appear.mp3',
        click: 'sound/pixel-click.mp3'
    },
    'btn-terminal': {
        appear: 'sound/terminal-appear.mp3',
        click: 'sound/terminal-click.mp3'
    }
};

let activeButtons = [];

// Funzione per riprodurre suono
function playSound(audioPath) {
    try {
        const audio = new Audio(audioPath);
        audio.volume = 0.3; // Volume al 30%
        audio.play().catch(e => console.log('Errore riproduzione audio:', e));
    } catch (error) {
        console.log('Errore creazione audio:', error);
    }
}

function createMeme() {
    const memeContainer = document.createElement('div');
    memeContainer.className = 'meme-container';

    const source = memeSources[Math.floor(Math.random() * memeSources.length)];
    let media;

    if (source.endsWith('.mp4')) {
        media = document.createElement('video');
        media.src = source;
        media.autoplay = true;
        media.loop = true;
        media.muted = true;
    } else {
        media = document.createElement('img');
        media.src = source;
    }

    media.style.maxWidth = '200px';
    media.style.maxHeight = '200px';

    const xpWindow = document.createElement('div');
    xpWindow.className = 'xp-window';

    const header = document.createElement('div');
    header.className = 'xp-window-header';

    const title = document.createElement('span');
    title.textContent = 'Meme';

    const close = document.createElement('div');
    close.className = 'xp-close-button';
    close.textContent = '×';

    header.appendChild(title);
    header.appendChild(close);

    const content = document.createElement('div');
    content.className = 'xp-window-content';
    content.appendChild(media);

    xpWindow.appendChild(header);
    xpWindow.appendChild(content);
    memeContainer.appendChild(xpWindow);

    memeContainer.style.left = `${Math.random() * (window.innerWidth - 220)}px`;
    memeContainer.style.top = `${Math.random() * (window.innerHeight - 220)}px`;

    document.body.appendChild(memeContainer);
}

function createButton() {
    if (activeButtons.length >= 10) return;

    const btn = document.createElement('button');
    btn.className = 'meme-button';
    const randomStyle = buttonStyles[Math.floor(Math.random() * buttonStyles.length)];
    btn.classList.add(randomStyle);

    btn.textContent = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 40);

    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    // Riproduci suono di apparizione
    if (buttonSounds[randomStyle] && buttonSounds[randomStyle].appear) {
        playSound(buttonSounds[randomStyle].appear);
    }

    const timeout = setTimeout(() => {
        if (document.body.contains(btn)) {
            btn.remove();
            activeButtons = activeButtons.filter(b => b !== btn);
        }
    }, 9000);

    btn.onclick = () => {
        // Riproduci suono di click
        if (buttonSounds[randomStyle] && buttonSounds[randomStyle].click) {
            playSound(buttonSounds[randomStyle].click);
        }

        clearTimeout(timeout);
        btn.remove();
        activeButtons = activeButtons.filter(b => b !== btn);
        createMeme();
    };

    document.body.appendChild(btn);
    activeButtons.push(btn);
}

// Primo bottone dopo 3 secondi
setTimeout(() => {
    createButton();
    const interval = setInterval(() => {
        if (activeButtons.length < 5) {
            createButton();
        } else if (activeButtons.length < 10 && Math.random() < 0.5) {
            createButton();
        }
    }, 3000);

    // Mostra Clippy dopo 9 secondi
    setTimeout(() => {
        const clippy = document.getElementById('clippy');
        if (clippy) clippy.style.display = 'block';
        clippy.onclick = () => {
            alert("Benvenuto nella sezione teorica!");
        };
    }, 9000);
}, 3000);