import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})
export class CodingComponent implements OnInit {

  links = [
    { path: 'game-of-life', title: "Conway's Game of Life", brief: "A case study of the famous Conway's Game of Life, featuring interactive elements" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
