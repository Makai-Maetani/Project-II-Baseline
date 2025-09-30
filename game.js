// -------------------- CURRENT LEVEL -------------------- //
let currentDrift = "Drifts/Drift1.js";  
let driftObj = null;
let loadingDrift = true;

// -------------------- CANVAS -------------------- //
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// -------------------- PLAYER -------------------- //
const player = { x: 20, y: 0, width: 30, height: 50, color: "#FF5100", vx: 0, speed: 3 };

// -------------------- LOAD LEVEL -------------------- //
import(`./${currentDrift}`).then(module => {
  driftObj = module.driftData;
  player.y = canvas.height - 50 - player.height; // place on floor
  loadingDrift = false; // level is ready
});

// -------------------- INPUT -------------------- //
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// -------------------- FPS -------------------- //
let lastTime = performance.now();
let fps = 0;

function updateFPS() {
  const now = performance.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;
  fps = Math.round(1 / delta);
}

function drawFPS() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`FPS: ${fps}`, canvas.width - 80, 20);
}

// -------------------- UPDATE -------------------- //
function update() {
  player.vx = 0;
  if (keys["ArrowLeft"] || keys["a"]) player.vx = -player.speed;
  if (keys["ArrowRight"] || keys["d"]) player.vx = player.speed;

  player.x += player.vx;

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// -------------------- DRAW -------------------- //
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (loadingDrift || !driftObj) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Loading Level...", canvas.width/2 - 70, canvas.height/2);
    return;
  }

  // Draw level background & floor
  driftObj.drawBackground(ctx, canvas);
  driftObj.drawFloor(ctx, canvas);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw FPS on top
  drawFPS();
}

// -------------------- GAME LOOP -------------------- //
function gameLoop() {
  updateFPS();  // update FPS calculation
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
