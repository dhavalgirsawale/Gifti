document.addEventListener("DOMContentLoaded", function () {

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

let yesScale = 1;
let noCount = 0;
const maxNo = 10;

/* ================= PAGE DETECTION ================= */

const currentPage = window.location.pathname.includes("yes");

/* ================= MUSIC SYSTEM ================= */

if (music) {

    const savedTime = localStorage.getItem("musicTime");
    const wasPlaying = localStorage.getItem("musicPlaying");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    } else {
        music.currentTime = 70; // start from 1:10 first time
    }

    // 🎵 Index Page Volume (soft)
    if (!currentPage) {
        music.volume = 0.25;
    }

    // 💖 Yes Page Romantic Volume
    if (currentPage) {
        music.volume = 0;
    }

    if (wasPlaying !== "false") {
        music.play().then(() => {

            // Romantic volume increase on YES page
            if (currentPage) {
                fadeInToRomantic();
            }

        }).catch(()=>{});
        localStorage.setItem("musicPlaying", "true");
        if(toggleBtn) toggleBtn.innerText = "🔊";
    }

    // Save time continuously
    setInterval(() => {
        localStorage.setItem("musicTime", music.currentTime);
    }, 1000);

    // Speaker Toggle
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navigator.vibrate?.(80);

            if (music.paused) {
                music.play();
                toggleBtn.innerText = "🔊";
                localStorage.setItem("musicPlaying", "true");
            } else {
                music.pause();
                toggleBtn.innerText = "🔇";
                localStorage.setItem("musicPlaying", "false");
            }
        });
    }

    // First tap start (mobile safe)
    document.body.addEventListener("click", function initMusic() {
        if (music.paused && localStorage.getItem("musicPlaying") !== "false") {
            music.play().catch(()=>{});
            localStorage.setItem("musicPlaying", "true");
            if(toggleBtn) toggleBtn.innerText = "🔊";
        }
        document.body.removeEventListener("click", initMusic);
    });
}

/* ================= FADE FUNCTIONS ================= */

function fadeOutBeforeYes(callback) {
    let fade = setInterval(() => {
        if (music.volume > 0.05) {
            music.volume -= 0.05;
        } else {
            clearInterval(fade);
            callback();
        }
    }, 120);
}

function fadeInToRomantic() {
    let fade = setInterval(() => {
        if (music.volume < 0.6) {   // romantic louder volume
            music.volume += 0.05;
        } else {
            clearInterval(fade);
        }
    }, 200);
}

/* ================= BUTTON LOGIC ================= */

window.nextPage = function () {

    navigator.vibrate?.([200,100,200]);

    localStorage.setItem("musicPlaying", "true");

    if (music) {
        fadeOutBeforeYes(() => {
            window.location.href = "yes.html";
        });
    } else {
        window.location.href = "yes.html";
    }
};

window.moveButton = function () {

    navigator.vibrate?.(120);

    if (!noButton) return;

    if (noCount >= maxNo) {
        noButton.innerText = "NO is disabled 😌";
        noButton.disabled = true;
        return;
    }

    noCount++;

    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);

    const padding = 40;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const x = Math.random() * (vw - noButton.offsetWidth - padding);
    const y = Math.random() * (vh - noButton.offsetHeight - padding);

    noButton.style.position = "fixed";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    if (yesButton) {
        yesScale += 0.15;
        yesButton.style.transform = `scale(${yesScale})`;
    }
};

});
