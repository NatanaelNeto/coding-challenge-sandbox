import { Component, ElementRef, ViewChild, type OnInit } from '@angular/core';
import { BodyPosition, Direction, Snake } from 'src/app/shared/models/snake-view-model';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
})
export class SnakeComponent implements OnInit {
  cellSize = 15;
  squareSize = 20;
  arraySpacing = 2;

  frameUpdate = 200;

  allowMove: boolean = true;

  public snake: Snake = new Snake();

  onGame = false;
  haveWalls = false;
  interval: number | undefined;

  black = "#3a3c3f";
  white = "#e0e3e6";

  currGrid: boolean[][] = [];
  nextGrid: boolean[][] = [];

  @ViewChild('myCanvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;


  ngOnInit(): void {
    this.snake.size = 4;
    this.snake.body.push({ row: 0, col: 3 }, { row: 0, col: 2 }, { row: 0, col: 1 }, { row: 0, col: 0 },);

    console.log(this.snake)
  }

  ngAfterViewInit(): void {
    this.resetArray();
    this.drawGrid();

    // const canvasEl = this.canvas.nativeElement;
    window.addEventListener('keydown', this.onKeyboardDown.bind(this));
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

        // Desenhar o snake
        const isSnakePart = this.snake.body.some(part => part.row === row && part.col === col);

        this.ctx.fillStyle = isSnakePart ? this.black : this.white;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
      }
    }

    this.allowMove = true;
  }

  onKeyboardDown(event: any) {
    if (this.allowMove) {
      this.allowMove = false;
      switch (event.key) {
        case 'ArrowUp':
          if (this.snake.dir != Direction.Down) this.snake.dir = Direction.Up;
          break;
        case 'ArrowDown':
          if (this.snake.dir != Direction.Up) this.snake.dir = Direction.Down;
          break;
        case 'ArrowLeft':
          if (this.snake.dir != Direction.Right) this.snake.dir = Direction.Left;
          break;
        case 'ArrowRight':
          if (this.snake.dir != Direction.Left) this.snake.dir = Direction.Right;
          break;
      }
    }
  }

  toggleWalls() {
    this.haveWalls = !this.haveWalls;
  }

  toggleIteration() {
    this.onGame = !this.onGame;

    if (this.onGame) {
      this.interval = window.setInterval(this.getNextGen.bind(this), this.frameUpdate);
    }

    else if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  getNextGen() {
    const dir: BodyPosition = this.getBodyPosition();

    if ((this.haveWalls && (dir.col >= this.squareSize || dir.col < 0 || dir.row >= this.squareSize || dir.row < 0)) || this.snake.body.some(part => part.row === dir.row && part.col === dir.col)) {
      this.toggleIteration();
    }

    else if (dir.col >= this.squareSize) {
      this.snake.body.pop();
      dir.col = 0;
      this.snake.body.unshift(dir);
    }
    else if (dir.col < 0) {
      this.snake.body.pop();
      dir.col = this.squareSize - 1;
      this.snake.body.unshift(dir);
    }
    else if (dir.row >= this.squareSize) {
      this.snake.body.pop();
      dir.row = 0;
      this.snake.body.unshift(dir);
    }
    else if (dir.row < 0) {
      this.snake.body.pop();
      dir.row = this.squareSize - 1;
      this.snake.body.unshift(dir);
    }
    else {
      this.snake.body.pop();
      this.snake.body.unshift(dir);
    }
    // for (let row = 0; row < this.squareSize; row += 1) {
    //   for (let col = 0; col < this.squareSize; col += 1) {
    //     this.nextGrid[row][col] = this.checkIsAlive(row, col, this.currGrid[row][col]);
    //   }
    // }

    // this.currGrid = this.nextGrid.map(row => [...row]);
    this.drawGrid();
  }

  getBodyPosition(): BodyPosition {
    switch (this.snake.dir) {
      case Direction.Down:
        return { row: this.snake.body[0].row + 1, col: this.snake.body[0].col }
      case Direction.Up:
        return { row: this.snake.body[0].row - 1, col: this.snake.body[0].col }
      case Direction.Left:
        return { row: this.snake.body[0].row, col: this.snake.body[0].col - 1 }
      case Direction.Right:
        return { row: this.snake.body[0].row, col: this.snake.body[0].col + 1 }
    }
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
