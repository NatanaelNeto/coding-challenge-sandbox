export class Snake {
  size: number = 4;
  body: BodyPosition[] = [];
  dir: Direction = Direction.Right;
}

export class BodyPosition {
  row: number;
  col: number;
}

export enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}