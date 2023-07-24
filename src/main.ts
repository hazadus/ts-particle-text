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
  const textInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#textInput");

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "black";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const fontSize = 60;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0.25, "red");
      gradient.addColorStop(0.5, "fuchsia");
      gradient.addColorStop(0.75, "purple");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `Normal ${fontSize}px Impact`;

      textInput?.addEventListener("keyup", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wrapTextCentered(canvas, ctx, (event.target as HTMLInputElement).value, fontSize, canvas.width * 0.8);
      });
    }
  }
});
