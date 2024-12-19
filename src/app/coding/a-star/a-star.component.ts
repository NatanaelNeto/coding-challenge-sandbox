import { Component, ElementRef, ViewChild, type OnInit } from '@angular/core';
import { ASNode, ASNodeType, ASNodeTypeMap } from 'src/app/shared/models/a-star-view-model';

@Component({
  selector: 'app-a-star',
  templateUrl: './a-star.component.html',
  styleUrls: ['./a-star.component.scss'],
})
export class AStarComponent implements OnInit {
  cellSize = 15;
  squareSize = 20;
  arraySpacing = 2;

  genDur = 100;

  onIteration = false;
  interval: number | undefined;

  toAddOrigin: boolean = false;
  toAddTarget: boolean = false;
  toAddWalls:  boolean = false;

  map: ASNode[][] = [];

  visited: ASNode[] = [];
  toOpen: ASNode[] = [];

  currGrid: boolean[][] = [];
  nextGrid: boolean[][] = [];

  edit: number = -1;

  originLocation = { row: -1, col: -1 }
  targetLocation = { row: -1, col: -1 }

  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.resetArray();
    this.drawGrid();

    const canvasEl = this.canvas.nativeElement;
    canvasEl.addEventListener('click', this.onCanvasClick.bind(this));
  }

  resetArray() {
    this.map = Array.from({ length: this.squareSize }, () => Array(this.squareSize).fill({
      parent: null,
      distance: null,
      isPath: true,
      isVisited: false,
      isOrigin: false,
      isTarget: false,
      targetCost: -1,
      originCost: -1,
    }));

    for(let row = 0; row < this.squareSize; row += 1) {
      for (let col = 0; col < this.squareSize; col += 1) {
        this.map[row][col].row = row;
        this.map[row][col].col = col;
      }
    }
  }


  drawGrid(): void {
    const canvasEl = this.canvas.nativeElement;

    canvasEl.style.setProperty('--padding', `${this.arraySpacing}px`);
    const totalSize = this.squareSize * (this.cellSize + this.arraySpacing) - this.arraySpacing;
    canvasEl.width = totalSize;
    canvasEl.height = totalSize;

    this.ctx = canvasEl.getContext('2d')!;
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    for (let row = 0; row < this.squareSize; row += 1) {
      for (let col = 0; col < this.squareSize; col += 1) {
        const x = col * (this.cellSize + this.arraySpacing);
        const y = row * (this.cellSize + this.arraySpacing);

        // Desenhar cada quadrado
        this.ctx.fillStyle = ASNodeTypeMap.get(this.map[row][col].nodeType) || '#e0e3e6';
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  private onCanvasClick(event: MouseEvent): void {
    if(!this.isItOnEdit()) {
      return
    }

    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const totalSize = this.cellSize + this.arraySpacing;

    const padding = this.arraySpacing * 2;
    const col = Math.floor((clickX - padding) / totalSize);
    const row = Math.floor((clickY - padding) / totalSize);


    if (row >= 0 && row < this.squareSize && col >= 0 && col < this.squareSize) {

      this.currGrid[row][col] = !this.currGrid[row][col];
      this.drawGrid();
    }
  }

  toggleIteration() {
    this.onIteration = !this.onIteration;

    if (this.onIteration) {
      if (this.toOpen.length == 0) {
        let origin: ASNode = new ASNode();

        this.map.forEach(row => {
          row.forEach(node => {
            if (node.nodeType == ASNodeType.origin) {
              origin = node;
            }
          })
        });

        origin.parent = origin;
        origin.originCost = 0;
        origin.targetCost = this.getDist(origin.row, origin.col, this.targetLocation.row, this.targetLocation.col);

        this.toOpen.push(origin);
      }

      this.interval = window.setInterval(this.getNextGen.bind(this), this.genDur);
    }

    else if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  getNextGen() {
    if (this.toOpen.length > 0) {
      // DO A*
      const currentNode = this.toOpen.shift();
      const neighbors = [];

      if(currentNode) {
        if(currentNode.nodeType != ASNodeType.origin && currentNode.nodeType != ASNodeType.target) {
          currentNode.nodeType = ASNodeType.visited;
        }
        this.visited.push(currentNode);

        if(currentNode.nodeType == ASNodeType.target) {
          // END A*
          this.toOpen = [];
          clearInterval(this.interval);
          this.interval = undefined;
        }

        if(currentNode.col - 1 >= 0) {
          if(currentNode.row - 1 >= 0) {
            neighbors.push(this.map[currentNode.row - 1][currentNode.col - 1]);
          }
          if(currentNode.row + 1 < this.squareSize) {
            neighbors.push(this.map[currentNode.row + 1][currentNode.col - 1]);
          }
          neighbors.push(this.map[currentNode.row][currentNode.col - 1]);
        }

        if(currentNode.col + 1 < this.squareSize) {
          if(currentNode.row - 1 >= 0) {
            neighbors.push(this.map[currentNode.row - 1][currentNode.col + 1]);
          }
          if(currentNode.row + 1 < this.squareSize) {
            neighbors.push(this.map[currentNode.row + 1][currentNode.col + 1]);
          }
          neighbors.push(this.map[currentNode.row][currentNode.col + 1]);
        }

        if(currentNode.row + 1 < this.squareSize) {
          neighbors.push(this.map[currentNode.row + 1][currentNode.col]) 
        }
        if(currentNode.row - 1 >= 0) {
          neighbors.push(this.map[currentNode.row - 1][currentNode.col]) 
        }

        neighbors.forEach(n => {
          if(n.nodeType == ASNodeType.wall || n.nodeType == ASNodeType.visited || this.toOpen.some(toOpenNode => toOpenNode.col == n.col && toOpenNode.row == n.row)) return;
          n.parent = currentNode;
          n.originCost = n.parent.originCost + this.getDist(n.row, n.col, n.parent.row, n.parent.col);
          n.targetCost = this.getDist(n.row, n.col, this.targetLocation.row, this.targetLocation.col);
          n.distance = n.originCost + n.targetCost;
        });

        this.toOpen.sort((a, b) => a.distance! - b.distance!);
      }
    }

    else {
      // EXIT PROGRAM
      this.toOpen = [];
      clearInterval(this.interval);
      this.interval = undefined;
    }

    this.drawGrid();
  }

  getDist(sx: number, sy: number, tx: number, ty: number) {
    const dist = (tx - sx)^2 + (ty - sy)^2;
    return Math.sqrt(dist);
  }

  isItOnEdit() {
    return this.toAddOrigin || this.toAddTarget || this.toAddWalls;
  }
}
