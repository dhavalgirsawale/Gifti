document.addEventListener("DOMContentLoaded", function () {

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

let yesScale = 1;
let noCount = 0;
const maxNo = 10;
let isPlaying = false;

/* ================= MUSIC SYSTEM ================= */

if (music) {

    function fadeInAudio() {
        music.volume = 0;
        music.currentTime = 70; // start from 1:10
        music.play().catch(() => {});
        isPlaying = true;

        const fade = setInterval(() => {
            if (music.volume < 1) {
                music.volume += 0.05;
            } else {
                clearInterval(fade);
            }
        }, 200);
    }

    // Start music on first user interaction (mobile safe)
    document.body.addEventListener("click", function initMusic() {
        if (!isPlaying) {
            fadeInAudio();
            if (toggleBtn) toggleBtn.innerText = "🔊";
        }
        document.body.removeEventListener("click", initMusic);
    });

    // Toggle button
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navigator.vibrate?.(100);

            if (music.paused) {
                music.play();
                toggleBtn.innerText = "🔊";
            } else {
                music.pause();
                toggleBtn.innerText = "🔇";
            }
        });
    }
}

/* ================= BUTTON LOGIC ================= */

window.nextPage = function () {
    navigator.vibrate?.([200,100,200]);

    for (let i = 0; i < 25; i++) createHeart();

    setTimeout(() => {
        window.location.href = "yes.html";
    }, 800);
};

window.moveButton = function () {
    navigator.vibrate?.(150);

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

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "20px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

});
