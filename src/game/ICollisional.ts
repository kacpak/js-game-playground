interface ICollisionArea {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface ICollisional {
  getCollisionArea(): ICollisionArea;
  onCollision(withCollisional: ICollisional[]): void;
}
