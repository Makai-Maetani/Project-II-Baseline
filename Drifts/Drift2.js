import { DEFAULTS, drawStandardFloor } from "./globs.js";

export const driftData = {
  width: 3500,
  next: "สีฟ้าDrift3.js",
  drawBackground: (ctx, canvas) => {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, "green");
    grad.addColorStop(1, "white");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
  drawFloor: drawStandardFloor  // use the standard floor from globs.js
};
