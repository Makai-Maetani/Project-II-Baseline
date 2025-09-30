export const DEFAULTS = {
  floorGradient: {
    top: "black",
    bottom: "white"
  },
  playerSpeed: 3,
  groundHeight: 50
};

// standard floor drawing function
export function drawStandardFloor(ctx, canvas) {
  const groundHeight = DEFAULTS.groundHeight;
  const grad = ctx.createLinearGradient(0, canvas.height - groundHeight, 0, canvas.height);
  grad.addColorStop(0, DEFAULTS.floorGradient.top);    // top
  grad.addColorStop(1, DEFAULTS.floorGradient.bottom); // bottom
  ctx.fillStyle = grad;
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}
