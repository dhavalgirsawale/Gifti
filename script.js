let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");

let yesScale = 1;
let noCount = 0;
let maxNo = 10;

let noMessages = [
    "Are you sure? 🥺",
    "Think again 😏",
    "Nope 😈",
    "You can't escape 😜",
    "Still no? 😭",
    "Last chance 💖",
    "Wrong choice 😬",
    "Just say yes 😌",
    "Why fighting it? 😏",
    "Okay this is getting awkward 😵"
];

function nextPage() {
    // 💥 Explosion vibration on YES
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 300]);
    }

    // 💖 Heart explosion
    for (let i = 0; i < 25; i++) {
        createHeart();
    }

    // Delay page change so animation is visible
    setTimeout(() => {
        window.location.href = "yes.html";
    }, 800);
}

function moveButton() {
    if (noCount >= maxNo) {
        noButton.innerText = "Okay fine… YES 😳";
        noButton.style.display = "none";
        return;
    }

    noCount++;

    // 📳 Vibration on NO
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    // 😵 Shake screen
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 400);

    // 🏃 Move NO button
    let x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    let y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    // 🟢 Grow YES button
    yesScale += 0.12;
    yesButton.style.transform = `scale(${yesScale})`;

    // 🔴 Change NO text
    noButton.innerText = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
}

// 💖 Create floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "20px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1500);
}
