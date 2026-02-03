let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");

let yesScale = 1;

let noMessages = [
    "Are you sure? 🥺",
    "Think again 😏",
    "Nope 😈",
    "You can't escape 😜",
    "Last chance 💖",
    "Wrong choice 😭"
];

function nextPage() {
    window.location.href = "yes.html";
}

function moveButton() {
    // Shake the screen
    document.body.classList.add("shake");

    // Remove shake class after animation
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 400);

    // Move NO button randomly
    let x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    let y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

    // Grow YES button
    yesScale += 0.15;
    yesButton.style.transform = `scale(${yesScale})`;

    // Change NO button text
    let randomIndex = Math.floor(Math.random() * noMessages.length);
    noButton.innerText = noMessages[randomIndex];
}
