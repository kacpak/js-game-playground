import Dot from './Dot';
import { getRandomColor } from './utils';

const gameCanvas: HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
const { width, height } = gameCanvas.getBoundingClientRect();
gameCanvas.width = width;
gameCanvas.height = height;

function random(max: number, min: number = 0): number {
  return Math.random() * (max - min) + min;
}

function generateDots(n: number): Dot[] {
  const dots = [];
  const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);
  for (let i = 0; i < n; i++) {
    dots.push(
      new Dot(
        random(width),
        random(height),
        getRandomDirection(),
        getRandomDirection(),
        getRandomColor()
      )
    );
  }
  return dots;
}

const dots = generateDots(70);

const collisionalElements: ICollisional[] = [...dots];

function doCollisionCheck(elements: ICollisional[]) {
  elements.forEach(element => {
    const rect1 = element.getCollisionArea();
    const onCollisionWith = collisionalElements.filter(checkElement => {
      if (element === checkElement) {
        return false;
      }
      const rect2 = checkElement.getCollisionArea();
      return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      );
    });
    if (onCollisionWith.length > 0) {
      element.onCollision(onCollisionWith);
    }
  });
}

function update() {
  doCollisionCheck(collisionalElements);

  dots.forEach(dot => {
    dot.stepX(1, width);
    dot.stepY(1, height);
  });
}

function render() {
  const ctx = gameCanvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  dots.forEach(dot => dot.render(ctx));
}

function gameLoopFrame() {
  update();
  render();
  requestAnimationFrame(gameLoopFrame);
}

requestAnimationFrame(gameLoopFrame);
