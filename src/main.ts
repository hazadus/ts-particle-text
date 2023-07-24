import { Effect } from "./Effect";

// App entry point
window.addEventListener("load", function () {
  const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>("#canvas1")!;
  const textInput: HTMLInputElement = document.querySelector<HTMLInputElement>("#textInput")!;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas);
  effect.setText("hazadus");

  textInput.addEventListener("keyup", function (event) {
    // Update text only when non-space character entered
    if (event.key !== " ") effect.setText((event.target as HTMLInputElement).value);
  });

  function animate() {
    effect.renderFrame();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
