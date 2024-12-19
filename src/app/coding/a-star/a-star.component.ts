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
  toAddWalls: boolean = false;

  map: ASNode[][] = [];

  visited: ASNode[] = [];
  toOpen: ASNode[] = [];

  track: ASNode[] = [];

  edit: number = -1;

  onEdit: boolean = false;

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
    this.map = Array.from({ length: this.squareSize }, () => Array.from({ length: this.squareSize}, () => new ASNode()));

    for (let row = 0; row < this.squareSize; row += 1) {
      for (let col = 0; col < this.squareSize; col += 1) {
        this.map[row][col].parent = null;
        this.map[row][col].distance = null;
        this.map[row][col].nodeType = ASNodeType.path;

        this.map[row][col].targetCost = -1;
        this.map[row][col].originCost = -1;
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
        this.ctx.fillStyle = ASNodeTypeMap.get(this.map[row][col].nodeType)!;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  private onCanvasClick(event: MouseEvent): void {
    if (!this.onEdit) {
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
      if(this.edit == 0) {

        if(this.targetLocation.row >= 0 && this.targetLocation.col >= 0) {
          this.map[this.targetLocation.row][this.targetLocation.col].nodeType = ASNodeType.path;
        }
        this.targetLocation.row = row;
        this.targetLocation.col = col;
        this.map[row][col].nodeType = ASNodeType.target;
      }
      else if(this.edit == 1) {
        if(this.originLocation.row >= 0 && this.originLocation.col >= 0) {
          this.map[this.originLocation.row][this.originLocation.col].nodeType = ASNodeType.path;
        }
        this.originLocation.row = row;
        this.originLocation.col = col;
        this.map[row][col].nodeType = ASNodeType.origin;
      }
      else if (this.edit == 2 && this.map[row][col].nodeType != ASNodeType.origin && this.map[row][col].nodeType != ASNodeType.target) {
        this.map[row][col].nodeType = this.map[row][col].nodeType == ASNodeType.wall ? ASNodeType.path : ASNodeType.wall;
      }
    }
    this.drawGrid();
  }

  toggleEdit() {
    this.onEdit = !this.onEdit;
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
        this.track = [];
        this.visited = [];
      }
      this.interval = window.setInterval(this.getNextGen.bind(this), this.genDur);
    }
    
    else if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
  iteration = 1;
  getNextGen() {
    if (this.toOpen.length > 0 && this.onIteration) {
      // DO A*
      const currentNode = this.toOpen.shift();
      const neighbors = [];
      
      if (currentNode) {

        if (currentNode.nodeType != ASNodeType.origin && currentNode.nodeType != ASNodeType.target) {
          currentNode.nodeType = ASNodeType.visited;
          this.map[currentNode.row][currentNode.col].nodeType = ASNodeType.visited;
        }
        this.visited.push(currentNode);

        this.iteration += 1;
        
        if (currentNode.nodeType == ASNodeType.target) {
          this.toOpen = [];
          clearInterval(this.interval);
          this.interval = undefined;

          let currNode = currentNode;

          this.interval = window.setInterval(() => {
            if (currNode.nodeType == ASNodeType.origin) {
              clearInterval(this.interval);
              this.interval = undefined;
              this.onIteration = false;
              return;
            }
            if(currNode.nodeType != ASNodeType.target) {
              this.map[currNode.row][currNode.col].nodeType = ASNodeType.pathline;
              currNode.nodeType = ASNodeType.pathline;
            }
            this.track.push(currNode);
            currNode = currNode.parent!;
            this.drawGrid();
          }, this.genDur);
        }

        if (currentNode.col - 1 >= 0) {
          if (currentNode.row - 1 >= 0) {
            neighbors.push(this.map[currentNode.row - 1][currentNode.col - 1]);
          }
          if (currentNode.row + 1 < this.squareSize) {
            neighbors.push(this.map[currentNode.row + 1][currentNode.col - 1]);
          }
          neighbors.push(this.map[currentNode.row][currentNode.col - 1]);
        }

        if (currentNode.col + 1 < this.squareSize) {
          if (currentNode.row - 1 >= 0) {
            neighbors.push(this.map[currentNode.row - 1][currentNode.col + 1]);
          }
          if (currentNode.row + 1 < this.squareSize) {
            neighbors.push(this.map[currentNode.row + 1][currentNode.col + 1]);
          }
          neighbors.push(this.map[currentNode.row][currentNode.col + 1]);
        }

        if (currentNode.row + 1 < this.squareSize) {
          neighbors.push(this.map[currentNode.row + 1][currentNode.col])
        }
        if (currentNode.row - 1 >= 0) {
          neighbors.push(this.map[currentNode.row - 1][currentNode.col])
        }

        neighbors.forEach(n => {
          if (n.nodeType == ASNodeType.wall || this.toOpen.some(toOpenNode => toOpenNode.col == n.col && toOpenNode.row == n.row)) {
            return;
          } else if (n.nodeType == ASNodeType.visited) {
            currentNode.parent = currentNode.parent?.distance! > n.distance! ? currentNode.parent : n;
            return;
          }
          n.parent = currentNode;
          n.originCost = n.parent.originCost + this.getDist(n.row, n.col, n.parent.row, n.parent.col);
          n.targetCost = this.getDist(n.row, n.col, this.targetLocation.row, this.targetLocation.col);
          n.distance = n.originCost + n.targetCost;
          this.toOpen.push(n);
        });

        this.toOpen.sort((a, b) => a.targetCost! - b.targetCost!);
      }
    }

    else {
      // EXIT PROGRAM
      this.toOpen = [];
      clearInterval(this.interval);
      this.interval = undefined;
      this.onIteration = false;
    }

    this.drawGrid();
  }

  getDist(sx: number, sy: number, tx: number, ty: number) {
    const a = (tx - sx);
    const b = (ty - sy);
    return Math.sqrt(a*a + b*b);
  }
}
