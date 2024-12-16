import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})
export class CodingComponent implements OnInit {

  links = [
    { path: 'game-of-life', title: "Conway's Game of Life", brief: "A case study of the famous Conway's Game of Life, featuring interactive elements" },
    { path: 'snake', title: "Snake Game", brief: "The classic snake game" },
    { path: 'a-star', title: "A*", brief: "The A* Algorithm in an interactive version" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
