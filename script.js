const bar = document.getElementById("bar");
const winnerText = document.getElementById("winner");
const flash = document.getElementById("flash");
const bgMusic = document.getElementById("bg-music");
const resetBtn = document.getElementById("reset-btn");
const muteBtn = document.getElementById("mute-btn");


let topPosition = 25; // start middle
const step = 3;
const minTop = 0;
const maxTop = 50;
let musicStarted = false;
let isMuted = false;

// Start music on first click anywhere
function startMusic() {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}
document.addEventListener("click", startMusic, { once: true });

// Mute / Unmute toggle
muteBtn.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
  
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  
  // Optional: change button icon
  muteBtn.querySelector("img").src = isMuted ? "media/unmute.png" : "media/mute.png";
});


// Show winner with flash and rotation
function showWinner(text, color, rotate = 0) {
  flash.style.display = "block";
  flash.classList.add("show");

  winnerText.innerText = text;
  winnerText.style.color = color;
  winnerText.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
  winnerText.style.display = "block";

  setTimeout(() => {
    flash.classList.remove("show");
    winnerText.style.display = "none";
    topPosition = 25;
    bar.style.top = topPosition + "vh";
  }, 2000);
}

// Move bar based on player click
function moveBar(winner) {
  if (winner === "P1") {
    topPosition += step;
    if (topPosition >= maxTop) {
      topPosition = maxTop;
      showWinner("PLAYER 1 WINS!", "#44aaff", 0);
    }
  } else {
    topPosition -= step;
    if (topPosition <= minTop) {
      topPosition = minTop;
      showWinner("PLAYER 2 WINS!", "#44aaff", 180);
    }
  }
  bar.style.top = topPosition + "vh";
}

// Create floating bubble
function createBubble(x, y) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const size = Math.random() * 60 + 20;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = x - size / 2 + "px";
  bubble.style.top = y - size / 2 + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 700);
}

// Handle tap
function handleTap(y, x) {
  createBubble(x, y);
  const screenHeight = window.innerHeight;
  if (y < screenHeight / 2) moveBar("P1");
  else moveBar("P2");
}

// Event listeners
document.addEventListener("click", (e) => handleTap(e.clientY, e.clientX));
document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  handleTap(touch.clientY, touch.clientX);
});

// Reset button
resetBtn.addEventListener("click", () => {
  topPosition = 25;
  bar.style.top = topPosition + "vh";
  winnerText.style.display = "none";
  flash.style.display = "none";
});
