const player = document.getElementById("player");
const obstacle = document.querySelector(".obstacle");
const restartButton = document.getElementById("restart-button");

let isJumping = false;
let isGameOver = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isJumping && !isGameOver) {
    jump();
  }
});

document.addEventListener("touchstart", () => {
  if (!isJumping && !isGameOver) {
    jump();
  }
});

function jump() {
  isJumping = true;
  player.style.animation = "jump 0.5s";
  setTimeout(() => {
    player.style.animation = "none";
    isJumping = false;
  }, 500);
}

function moveObstacle() {
  if (!isGameOver) {
    const obstacleLeft = parseInt(getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft <= 0) {
      obstacle.style.left = "100vw";
    } else {
      obstacle.style.left = (obstacleLeft - 5) + "px";
    }

    if (obstacleLeft > 0 && obstacleLeft < 60 && !isJumping) {
      isGameOver = true;
      restartButton.style.display = "block";
    }
  }

  requestAnimationFrame(moveObstacle);
}

moveObstacle();

restartButton.addEventListener("click", () => {
  isGameOver = false;
  player.style.animation = "none";
  obstacle.style.left = "100vw";
  restartButton.style.display = "none";
});
