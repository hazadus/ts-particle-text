/**
 * `Effect` class represents the canvas where we render our effects.
 */
export class Effect {
  private canvas: HTMLCanvasElement;
  private fontSize: number;
  private lineHeight: number;
  private maxTextWidth: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.fontSize = 60;
    this.lineHeight = 60;
    this.maxTextWidth = this.width * 0.8;

    this.canvas.style.background = "black";
    const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0.25, "red");
    gradient.addColorStop(0.5, "fuchsia");
    gradient.addColorStop(0.75, "purple");

    this.context.fillStyle = gradient;
    this.context.strokeStyle = "white";
    this.context.lineWidth = 1;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = `Normal ${this.fontSize}px Impact`;
  }

  /**
   * Return associated 2D context.
   */
  get context() {
    return this.canvas.getContext("2d")!;
  }

  /**
   * Canvas width.
   */
  get width() {
    return this.canvas.width;
  }

  /**
   * Canvas height.
   */
  get height() {
    return this.canvas.height;
  }

  /**
   * Draw text at the center of canvas wrapping it line by line according to `this.maxTextWidth`.
   * @param text text to draw
   */
  wrapTextCentered(text: string) {
    let lines = [];
    let lineCounter = 0;
    let currentLine = "";
    let words = text.split(" ");

    for (let word of words) {
      let testLine = currentLine + word + " ";
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        currentLine = word + " ";
        lineCounter++;
      } else {
        currentLine = testLine;
      }
      lines[lineCounter] = currentLine.trim();
    }

    const startY = this.height / 2 - (lineCounter * this.lineHeight) / 2;

    lines.forEach((line, index) => {
      this.context.fillText(line, this.width / 2, startY + index * this.lineHeight);
      this.context.strokeText(line, this.width / 2, startY + index * this.lineHeight);
    });
  }

  convertToParticles() {}

  /**
   * Clear the canvas.
   */
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  render() {}
}
