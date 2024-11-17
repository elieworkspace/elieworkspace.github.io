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
    8,  // maison
    15, // profil
    //0,  // alternance
    8,  // parcours
    50, // formation
    50, // personel
    50, // certification
    10, // entreprise
    140,   // entreprisepptx
    70, // missions
    100,// projets
    25  // contact (conclusion)
];
let currentSectionIndex = 0;

// Timers
let totalTime = sectionTimes.reduce((a, b) => a + b, 0);
let currentTime = sectionTimes[currentSectionIndex];

// Éléments DOM
const sectionTimer = document.getElementById("section-timer");
const totalTimer = document.getElementById("total-timer");
const progressBar = document.getElementById("progress-bar");

// Fonctions
function goToSection(index) {
    if (index < sections.length) {
        document.getElementById(sections[index]).scrollIntoView({ behavior: "smooth" });
        currentTime = sectionTimes[index];
        currentSectionIndex = index;
    } else {
        console.log("Fin des sections.");
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
    const interval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(interval);
            console.log("Temps écoulé.");
            return;
        }

        if (currentTime <= 0) {
            currentSectionIndex++;
            if (currentSectionIndex < sections.length) {
                goToSection(currentSectionIndex);
            } else {
                clearInterval(interval);
                console.log("Toutes les sections ont été parcourues.");
                return;
            }
        }

        currentTime -= 0.5;
        totalTime -= 0.5;

        updateTimers();
    }, 500); // Interval de 0,5 seconde
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    goToSection(0);
    updateTimers();
    startTimers();
});
