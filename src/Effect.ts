import { Particle } from "./Particle";

interface IMouse {
  x: number;
  y: number;
  radius: number;
}

/**
 * `Effect` class represents the canvas where we render our effects.
 */
export class Effect {
  private canvas: HTMLCanvasElement;
  private fontSize: number;
  private lineHeight: number;
  private maxTextWidth: number;
  private particles: Particle[];
  private gap: number; // distance between pixels used when scanning the image to create particles
  private mouse: IMouse;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.fontSize = this.height / 4;
    this.lineHeight = this.fontSize;
    this.maxTextWidth = this.width * 0.8;
    this.gap = 3;
    this.particles = [];
    this.mouse = {
      x: 0,
      y: 0,
      radius: 20000,
    };

    const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0.25, "red");
    gradient.addColorStop(0.5, "fuchsia");
    gradient.addColorStop(0.75, "purple");

    this.context.fillStyle = gradient;
    this.canvas.style.background = "black";
    this.context.strokeStyle = "white";
    this.context.lineWidth = 3;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = `Normal ${this.fontSize}px Impact`;

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
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

  /**
   * Scan each canvas pixels with `this.canvas` step, and fill particles array based on underlying
   * pixel color.
   */
  convertTextToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red}, ${green}, ${blue})`;
          this.particles.push(new Particle(x, y, this.gap, color, this.width));
        }
      }
    }
  }

  /**
   * Clear the canvas.
   */
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Rebuild particles array using `text`.
   * @param text text to use for the effect.
   */
  setText(text: string) {
    this.clear();
    this.wrapTextCentered(text);
    this.convertTextToParticles();
    this.clear();
  }

  /**
   * Clear canvas, update particle positions, and draw them.
   */
  renderFrame() {
    this.clear();
    this.particles.forEach((particle) => {
      particle.update();
      particle.drawAsRect(this.context);
    });
  }
}
