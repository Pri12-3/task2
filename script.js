const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Game state variables
let isGameOver = false;
let score = 0;
let highScore = 0;
let timeLeft = 60; // Start with 60 seconds
let gameMode = "normal"; // Default to normal mode

// Player variables
let playerX = gameWidth / 2;
let playerY = gameHeight - 50;
let playerSpeed = 5;
let playerHealth = 100;
let isJumping = false;
let jumpForce = 10;
let gravity = 0.5;

// Weapon variables
let bulletSpeed = 10;
let bulletSize = 5;
let bullets = [];

// Zombie variables
let zombieSpeed = 2;
let zombieHealth = 20;
let zombies = [];

// Power-up variables (for Hacker Mode)
let powerUps = [];

// Timer variables
let timerInterval;

// Event listeners for player controls
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Game loop
function gameLoop() {
  if (!isGameOver) {
    // Update game state
    updateGameState();

    // Clear canvas
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    // Draw game elements
    drawGameElements();

    // Request next frame
    requestAnimationFrame(gameLoop);
  } else {
    // Display game over message
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", gameWidth / 2 - 100, gameHeight / 2);

    // Display final score
    ctx.font = "20px Arial";
    ctx.fillText(FinalScore= $(score), gameWidth / 2 - 100, gameHeight / 2 + 30);
  }
}

// Update game state
function updateGameState() {
  // Update player position based on input
  if (playerX > 0 && playerX < gameWidth - 50) {
    if (leftPressed) {
      playerX -= playerSpeed;
    }
    if (rightPressed) {
      playerX += playerSpeed;
    }
  }

  // Handle jumping
  if (isJumping) {
    playerY -= jumpForce;
    jumpForce -= gravity;
    if (jumpForce < -10) {
      isJumping = false;
      jumpForce = 10;
    }
  } else {
    // Apply gravity to player
    playerY += gravity;
  }

  // Update bullet positions
  bullets.forEach((bullet, index) => {
    bullet.x += bulletSpeed;
    // Remove bullets that go off-screen
    if (bullet.x > gameWidth) {
      bullets.splice(index, 1);
    }
  });

  // Update zombie positions
  zombies.forEach((zombie, index) => {
    zombie.x -= zombieSpeed;
    // Remove zombies that go off-screen
    if (zombie.x < 0) {
      zombies.splice(index, 1);
    }
  });

  // Check for collisions between bullets and zombies
  bullets.forEach((bullet, bulletIndex) => {
    zombies.forEach((zombie, zombieIndex) => {
      if (
        bullet.x + bulletSize >= zombie.x &&
        bullet.x <= zombie.x + zombie.width &&
        bullet.y + bulletSize >= zombie.y &&
        bullet.y <= zombie.y + zombie.height
      ) {
        // Remove bullet and zombie
        bullets.splice(bulletIndex, 1);
        zombies.splice(zombieIndex, 1);
        score++;
      }
    });
  });

  // Check for collisions between zombies and player
  zombies.forEach((zombie) => {
    if (
      playerX + 50 >= zombie.x &&
      playerX <= zombie.x + zombie.width &&
      playerY + 50 >= zombie.y &&
      playerY <= zombie.y + zombie.height
    ) {
      playerHealth -= 10;
      if (playerHealth <= 0) {
        isGameOver = true;
      }
    }
  });

  // Update game timer
  timeLeft--;
  if (timeLeft <= 0) {
    isGameOver = true;
  }
}

// Draw game elements
function drawGameElements() {
  // Draw player
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, 50, 50);

  // Draw bullets
  bullets.forEach((bullet) => {
    ctx.fillStyle = "red";
    ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
  });

  // Draw zombies
  zombies.forEach((zombie) => {
    ctx.fillStyle = "green";
    ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
  });

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(Score= $(score), 10, 30);

  // Draw timer
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(Time=$(timeLeft), gameWidth - 100, 30);

  // Draw player health
  ctx.fillStyle = "red";
  ctx.fillRect(10, 60, playerHealth, 10);

  // Draw game over message
  if (isGameOver) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", gameWidth / 2 - 100, gameHeight / 2);

    // Display final score
    ctx.font = "20px Arial";
    ctx.fillText(FinalScore= (score), gameWidth / 2 - 100, gameHeight / 2 + 30);
  }
}

