const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

let yesScale = 1;
let noCount = 0;
const maxNo = 10;

const noMessages = [
    "Are you sure? 🥺",
    "Think again 😏",
    "Nope 😈",
    "You can't escape 😜",
    "Still no? 😭",
    "Last chance 💖",
    "Wrong choice 😬",
    "Just say yes 😌",
    "Why fighting it? 😏",
    "Okay this is awkward 😵"
];

function nextPage() {
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 300]);
    }

    for (let i = 0; i < 25; i++) {
        createHeart();
    }

    setTimeout(() => {
        window.location.href = "yes.html";
    }, 800);
}

function moveButton() {
    if (noCount >= maxNo) {
        noButton.innerText = "NO is disabled 😌";
        noButton.disabled = true;
        noButton.style.cursor = "default";
        return;
    }

    noCount++;

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 400);

    // Keep NO button inside viewport
    const padding = 20;
    const maxX = window.innerWidth - noButton.offsetWidth - padding;
    const maxY = window.innerHeight - noButton.offsetHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    // YES grows every NO
    yesScale += 0.15;
    yesButton.style.transform = `scale(${yesScale})`;

    // Update NO text
    noButton.innerText =
        noMessages[Math.min(noCount - 1, noMessages.length - 1)];
}

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "20px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
}
