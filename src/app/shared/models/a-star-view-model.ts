export class ASNode {
  parent: ASNode | null = null;
  
  distance: number | null = null;

  nodeType: ASNodeType = ASNodeType.path;

  targetCost: number = -1;
  originCost: number = -1;

  row: number;
  col: number;
}

export enum ASNodeType {
  path = 0,
  wall = 1,
  origin = 2,
  target = 3,
  visited = 4,
  pathline = 5,
}

export const ASNodeTypeMap = new Map<ASNodeType, string>([
  [ASNodeType.path, '#e0e3e6'],
  [ASNodeType.wall, '#3a3c3f'],
  [ASNodeType.origin, '#83f436'],
  [ASNodeType.target, '#f44336'],
  [ASNodeType.visited, '#a5a7aa'],
  [ASNodeType.pathline, '#c2dcb1'],
]);