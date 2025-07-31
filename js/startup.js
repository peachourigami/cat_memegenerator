document.addEventListener("DOMContentLoaded", () => {
    const blackScreen = document.getElementById("black-screen");
    const splash = document.getElementById("splash-screen");
    const main = document.getElementById("main-content");
    const startButton = document.getElementById("start-button");
    const logoSection = document.getElementById("logo-section");
    const startupSound = document.getElementById("startup-sound");
    const logo = document.getElementById("logo");
    const text = document.getElementById("text");

    blackScreen.style.display = "block";
    splash.style.display = "flex";
    main.style.display = "none";

    let systemStarted = false;

    startButton.addEventListener("click", () => {
        if (systemStarted) return;
        systemStarted = true;

        console.log("🚀 Avvio del sistema iniziato!");

        startButton.style.display = "none";
        logoSection.style.display = "block";

        logo.classList.remove("fade-out");
        text.classList.remove("fade-out");
        logo.classList.add("fade-in");
        text.classList.add("fade-in");

        startupSound.volume = 0.5;
        startupSound.play().then(() => {
            const durationMs = startupSound.duration * 1000;
            console.log(`🕒 Durata audio: ${durationMs}ms`);

            setTimeout(() => {
                logo.classList.replace("fade-in", "fade-out");
                text.classList.replace("fade-in", "fade-out");
                splash.classList.add("fade-out");
                blackScreen.classList.add("fade-out");

                setTimeout(() => {
                    splash.style.display = "none";
                    blackScreen.style.display = "none";
                    main.style.display = "block";
                    main.style.opacity = "1";
                    main.style.visibility = "visible";
                    document.body.style.overflow = "auto";

                    const scriptElement = document.createElement("script");
                    scriptElement.src = "js/script.js";
                    document.body.appendChild(scriptElement);
                }, 1000);
            }, durationMs - 1500);
        }).catch((e) => console.log("❌ Errore riproduzione audio:", e));
    });

    console.log("🎮 Sistema inizializzato. Aspettando il click...");
});