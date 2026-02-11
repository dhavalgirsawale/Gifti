const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

let yesScale = 1;
let noCount = 0;
const maxNo = 10;

const isYesPage = window.location.pathname.includes("yes.html");

/* ================= MUSIC SYSTEM ================= */

if (music) {

    // Restore time
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    } else {
        music.currentTime = 70; // start from 1:10 first time
    }

    // Volume settings
    music.volume = isYesPage ? 0 : 0.25;

    // Start on first user interaction
    function startMusic() {
        music.play().then(() => {

            // Romantic increase on YES page
            if (isYesPage) {
                fadeInRomantic();
            }

            localStorage.setItem("musicPlaying", "true");
            if (toggleBtn) toggleBtn.innerText = "🔊";

        }).catch(()=>{});

        document.removeEventListener("click", startMusic);
    }

    document.addEventListener("click", startMusic);

    // Save current time every second
    setInterval(() => {
        localStorage.setItem("musicTime", music.currentTime);
    }, 1000);

    // Toggle sound
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            navigator.vibrate?.(80);

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

/* ================= FADE EFFECTS ================= */

function fadeOut(callback) {
    let fade = setInterval(() => {
        if (music.volume > 0.05) {
            music.volume -= 0.05;
        } else {
            clearInterval(fade);
            callback();
        }
    }, 100);
}

function fadeInRomantic() {
    let fade = setInterval(() => {
        if (music.volume < 0.6) {
            music.volume += 0.05;
        } else {
            clearInterval(fade);
        }
    }, 200);
}

/* ================= BUTTON LOGIC ================= */

function nextPage() {
    navigator.vibrate?.([200,100,200]);

    if (music) {
        fadeOut(() => {
            window.location.href = "yes.html";
        });
    } else {
        window.location.href = "yes.html";
    }
}

function moveButton() {

    navigator.vibrate?.(120);

    if (!noButton) return;

    if (noCount >= maxNo) {
        noButton.innerText = "NO is disabled 😌";
        noButton.disabled = true;
        return;
    }

    noCount++;

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
}
