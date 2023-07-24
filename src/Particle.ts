import { IMouse } from "./types";

export class Particle {
  private x: number;
  private y: number;
  private size: number;
  private color: string;
  private originX: number;
  private originY: number;
  private vx: number;
  private vy: number;
  private force: number;
  private distanceFromMouse: number;
  private friction: number;
  private ease: number;

  constructor(x: number, y: number, size: number, color: string, canvasWidth: number) {
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.size = size;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.distanceFromMouse = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.01;
  }

  /**
   * Draw this `Particle` on the provided context as rectangle.
   * @param context context where the particle should draw itself.
   */
  drawAsRect(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
    context.restore();
  }

  /**
   * Draw this `Particle` on the provided context as circle.
   * @param context context where the particle should draw itself.
   */
  drawAsCircle(context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = this.color;
    context.lineWidth = 1;
    context.stroke();
    context.restore();
  }

  /**
   * Update particle position based on its speed, direction, mouse pointer location, etc.
   */
  update(mouse: IMouse) {
    // Calculate particle's distance from mouse pointer
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    this.distanceFromMouse = Math.hypot(dy, dx);

    // "Force" that pushes away from mouse pointer:
    this.force = -mouse.radius / this.distanceFromMouse;

    if (mouse.isPressed && this.distanceFromMouse < mouse.radius) {
      // Calculate particle direction depending on mouse pointer location
      const angle = Math.atan2(dy, dx);
      this.vx = this.force * Math.cos(angle);
      this.vy = this.force * Math.sin(angle);
    }

    // Note that `friction` gradually reduces `vx` and `vy`
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}
