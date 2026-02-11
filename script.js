const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");
const yesBtn = document.getElementById("yesButton");
const noBtn = document.getElementById("noButton");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let yesScale = 1;
let noCount = 0;

/* ================= MUSIC SYSTEM ================= */

toggle.addEventListener("click", () => {

    if (music.paused) {

        // Start from 1:10 only first time
        if (!music.dataset.started) {
            music.currentTime = 70; // 1 minute 10 seconds
            music.dataset.started = "true";
        }

        music.volume = 0.3;
        music.play();
        toggle.classList.remove("glow");

    } else {
        music.pause();
    }
});


/* ================= HEART RAIN ================= */

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

setInterval(createHeart, 800);


/* ================= CONFETTI ================= */

function launchConfetti() {
    for (let i = 0; i < 120; i++) {

        const conf = document.createElement("div");
        conf.className = "confetti";

        conf.style.left = Math.random() * 100 + "vw";
        conf.style.background = `hsl(${Math.random() * 360},100%,50%)`;

        document.body.appendChild(conf);

        setTimeout(() => conf.remove(), 3000);
    }
}


/* ================= YES BUTTON ================= */

yesBtn.addEventListener("click", () => {

    navigator.vibrate?.([200, 100, 200]);

    // Page transition
    page1.classList.remove("active");
    page2.classList.add("active");
    page2.classList.add("zoom");

    // Confetti blast
    launchConfetti();

    // Romantic volume increase
    let fade = setInterval(() => {
        if (music.volume < 0.7) {
            music.volume += 0.03;
        } else {
            clearInterval(fade);
        }
    }, 200);

});


/* ================= NO BUTTON ================= */

noBtn.addEventListener("click", () => {

    navigator.vibrate?.(100);

    noCount++;

    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
});
