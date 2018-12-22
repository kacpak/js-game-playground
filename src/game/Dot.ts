export default class Dot implements ICollisional {
  private _x: number;
  private _y: number;
  private _radius = 5;

  private _directionX: number;
  private _directionY: number;
  private _color: string;

  constructor(
    initialX: number,
    initialY: number,
    initialDirectionX = 1,
    initialDirectionY = 1,
    color = '#000000'
  ) {
    this._x = initialX;
    this._y = initialY;
    this._directionX = initialDirectionX;
    this._directionY = initialDirectionY;
    this._color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this._color;
    ctx.beginPath();
    ctx.ellipse(this._x, this._y, this._radius, this._radius, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
  }

  stepX(step: number, boundaryX: number) {
    const left = this._x - this._radius;
    const right = this._x + this._radius;
    if (right + step > boundaryX || left + step < 0) {
      this._directionX *= -1;
    }

    this._x += this._directionX * step;
  }

  stepY(step: number, boundaryY: number) {
    const top = this._y - this._radius;
    const bottom = this._y + this._radius;
    if (bottom + step > boundaryY || top + step < 0) {
      this._directionY *= -1;
    }

    this._y += this._directionY * step;
  }

  getCollisionArea(): ICollisionArea {
    return {
      left: this._x - this._radius,
      right: this._x + this._radius,
      bottom: this._y + this._radius,
      top: this._y - this._radius
    };
  }

  onCollision(withCollisional: ICollisional[]): void {
    this._directionX *= -1;
    this._directionY *= -1;
  }
}
