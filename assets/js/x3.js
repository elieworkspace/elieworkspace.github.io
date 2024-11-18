// Configurations
const sections = [
    "maison",
    "profil",
    //"alternance",
    "parcours",
    "formation",
    "personel",
    "certification",
    "entreprise",
    "entreprisepptx",
    "missions",
    "projets",
    "contact",
];
const sectionTimes = [
    10,  // maison
    15, // profil
    //0,  // alternance
    8,  // parcours
    50, // formation
    50, // personel
    50, // certification
    10, // entreprise
    250, // entreprisepptx
    70,  // missions
    100, // projets
    25   // contact (conclusion)
];
let currentSectionIndex = 0;

// Timers
let totalTime = sectionTimes.reduce((a, b) => a + b, 0);
let currentTime = sectionTimes[currentSectionIndex];
let isPaused = false; // État de pause
let timerInterval; // Interval principal

// Éléments DOM
const sectionTimer = document.getElementById("section-timer");
const totalTimer = document.getElementById("total-timer");
const progressBar = document.getElementById("progress-bar");

// Boutons
const playPauseBtn = document.getElementById("play-pause-btn");
const skipBtn = document.getElementById("skip-btn");
const backBtn = document.getElementById("back-btn");

// Fonctions principales
function goToSection(index) {
    if (index >= 0 && index < sections.length) {
        document.getElementById(sections[index]).scrollIntoView({ behavior: "smooth" });
        currentTime = sectionTimes[index];
        currentSectionIndex = index;
    } else {
        console.log("Aucune section disponible.");
    }
}

function updateTimers() {
    sectionTimer.textContent = `Section: ${currentTime.toFixed(1)}s`;
    totalTimer.textContent = `Total: ${totalTime.toFixed(1)}s`;

    const progress =
        ((sectionTimes.reduce((a, b) => a + b, 0) - totalTime) /
            sectionTimes.reduce((a, b) => a + b, 0)) *
        100;

    progressBar.style.width = `${progress}%`;
}

function startTimers() {
    clearInterval(timerInterval); // Nettoie tout interval existant
    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                console.log("Temps écoulé.");
                return;
            }

            if (currentTime <= 0) {
                currentSectionIndex++;
                if (currentSectionIndex < sections.length) {
                    goToSection(currentSectionIndex);
                } else {
                    clearInterval(timerInterval);
                    console.log("Toutes les sections ont été parcourues.");
                    return;
                }
            }

            currentTime -= 0.5;
            totalTime -= 0.5;

            updateTimers();
        }
    }, 500); // Interval de 0,5 seconde
}

// Gestion des boutons
function updatePlayPauseIcon() {
    playPauseBtn.innerHTML = `<i class="${isPaused ? 'ti-control-play' : 'ti-control-pause'}"></i>`;
}

function togglePlayPause() {
    isPaused = !isPaused;
    updatePlayPauseIcon();

    if (isPaused) {
        clearInterval(timerInterval);
    } else {
        startTimers();
    }
}

function skipSection() {
    currentSectionIndex++;
    if (currentSectionIndex < sections.length) {
        goToSection(currentSectionIndex);
        updateTimers();
    } else {
        console.log("Aucune section suivante.");
        clearInterval(timerInterval);
    }
}

function backSection() {
    currentSectionIndex--;
    if (currentSectionIndex >= 0) {
        goToSection(currentSectionIndex);
        updateTimers();
    } else {
        console.log("Aucune section précédente.");
        currentSectionIndex = 0; // Empêche de sortir des limites
    }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    goToSection(0);
    updateTimers();
    startTimers();

    // Écouteurs d'événements pour les boutons
    playPauseBtn.addEventListener("click", togglePlayPause);
    skipBtn.addEventListener("click", skipSection);
    backBtn.addEventListener("click", backSection);

    playPauseBtn.click();
});
