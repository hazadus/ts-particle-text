import { Effect } from "./Effect";

// App entry point
window.addEventListener("load", function () {
  const canvas: HTMLCanvasElement | null = document.querySelector<HTMLCanvasElement>("#canvas1")!;
  const textInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#textInput")!;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas);

  textInput.addEventListener("keyup", function (event) {
    effect.clear();
    effect.wrapTextCentered((event.target as HTMLInputElement).value);
  });
});
