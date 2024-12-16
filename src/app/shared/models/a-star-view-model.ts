export class ASNode {
  parent: ASNode | null = null;
  
  distance: number | null = null;

  isPath: boolean = true;
  isVisited: boolean = false;
  isOrigin: boolean = false;
  isTarget: boolean = false;



  targetCost: number = -1;
  originCost: number = -1;
}

export enum ASNodeType {
  path = 0,
  wall = 1,
  origin = 2,
  target = 3,
}