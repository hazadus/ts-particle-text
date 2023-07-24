export class Particle {
  private x: number;
  private y: number;
  private size: number;
  private color: string;
  private originX: number;
  private originY: number;
  // Speed
  // private dx: number;
  // private dy: number;
  // Velocity
  // private vx: number;
  // private vy: number;
  // private force: number;
  // private angle: number;
  // private distance: number;
  // private friction: number;
  private ease: number;

  constructor(x: number, y: number, size: number, color: string, canvasWidth: number) {
    this.x = Math.random() * canvasWidth;
    this.y = 0;
    this.size = size;
    this.color = color;
    this.originX = x;
    this.originY = y;
    // this.dx = 0;
    // this.dy = 0;
    // this.vx = 0;
    // this.vy = 0;
    // this.force = 0;
    // this.angle = 0;
    // this.distance = 0;
    // this.friction = Math.random() * 0.6 + 0.15;
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
   * Update particle position based on its speed, direction, etc.
   */
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}
