// Configurations
const sections = ["profil", "alternance", "parcours", "entreprise"];
const sectionTimes = [10, 10, 10, 10]; // Temps en secondes pour chaque section
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
