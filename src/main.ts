/**
 * Draw text at the center of canvas wrapping it line by line according to `maxTextWidth`.
 * @param canvas
 * @param context
 * @param text text to draw
 * @param lineHeight height of each line (it can be font height or anything else)
 * @param maxTextWidth max width of the line
 */
function wrapTextCentered(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  text: string,
  lineHeight: number,
  maxTextWidth: number,
) {
  let lines = [];
  let lineCounter = 0;
  let currentLine = "";
  let words = text.split(" ");

  for (let word of words) {
    let testLine = currentLine + word + " ";
    if (context.measureText(testLine).width > maxTextWidth) {
      currentLine = word + " ";
      lineCounter++;
    } else {
      currentLine = testLine;
    }
    lines[lineCounter] = currentLine.trim();
  }

  const startY = canvas.height / 2 - (lineCounter * lineHeight) / 2;

  lines.forEach((line, index) => {
    context.fillText(line, canvas.width / 2, startY + index * lineHeight);
    context.strokeText(line, canvas.width / 2, startY + index * lineHeight);
  });
}

// App entry point
window.addEventListener("load", function () {
  const canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#canvas1");

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "black";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const text = "TypeScript Particle Text Project, using Vite as build tool";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "Normal 50px Impact";
      wrapTextCentered(canvas, ctx, text, 50, canvas.width / 2);
    }
  }
});
