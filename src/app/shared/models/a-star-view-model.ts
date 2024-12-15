export class ASNode {
  parent: ASNode | null = null;
  
  distance: number | null = null;

  isPath: boolean = true;
  isVisited: boolean = false;

  targetCost: number;
  originCost: number;
}