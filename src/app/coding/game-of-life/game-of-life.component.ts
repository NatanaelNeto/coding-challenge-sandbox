import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss'],
})

export class GameOfLifeComponent implements OnInit {
  cellSize = 15;
  squareSize = 20;
  arraySpacing = 2;

  genDur = 100;

  onIteration = false;
  interval: number | undefined;

  black = "#3a3c3f";
  white = "#e0e3e6";

  currGrid: boolean[][] = [];
  nextGrid: boolean[][] = [];

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
    this.currGrid = Array.from({ length: this.squareSize }, () => Array(this.squareSize).fill(false));
    this.nextGrid = Array.from({ length: this.squareSize }, () => Array(this.squareSize).fill(false));
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
        this.ctx.fillStyle = this.currGrid[row][col] ? this.black : this.white;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  private onCanvasClick(event: MouseEvent): void {
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
      this.interval = window.setInterval(this.getNextGen.bind(this), this.genDur);
    }
    
    else if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
  
  getNextGen() {
    for (let row = 0; row < this.squareSize; row += 1) {
      for (let col = 0; col < this.squareSize; col += 1) {
        this.nextGrid[row][col] = this.checkIsAlive(row, col, this.currGrid[row][col]);
      }
    }
    
    this.currGrid = this.nextGrid.map(row => [...row]);
    this.drawGrid();
  }

  checkIsAlive(row: number, col: number, currState: boolean): boolean {
    const topRow = row - 1;
    const downRow = row + 1;
    const leftCol = col - 1;
    const rightCol = col + 1;

    const neighbors: boolean[] = []

    // VERIFY TOP NEIGHBORS
    if (topRow >= 0) {
      neighbors.push(this.currGrid[topRow][col]);

      if (leftCol >= 0) {
        neighbors.push(this.currGrid[topRow][leftCol]);
      }

      if (rightCol < this.squareSize) {
        neighbors.push(this.currGrid[topRow][rightCol]);
      }
    }


    // VERIFY LEFT NEIGHBOR
    if (leftCol >= 0) {
      neighbors.push(this.currGrid[row][leftCol]);
    }


    // VERIFY DOWN NEIGHBORS
    if (downRow < this.squareSize) {
      neighbors.push(this.currGrid[downRow][col]);

      if (leftCol >= 0) {
        neighbors.push(this.currGrid[downRow][leftCol]);
      }

      if (rightCol < this.squareSize) {
        neighbors.push(this.currGrid[downRow][rightCol]);
      }
    }

    // VERIFY RIGHT NEIGHBOR
    if (rightCol < this.squareSize) {
      neighbors.push(this.currGrid[row][rightCol]);
    }

    const count = neighbors.reduce((c, v) => c + (v ? 1 : 0), 0);

    return (count < 2 || count > 3) ? false : count == 3 ? true : currState;
  }
}
