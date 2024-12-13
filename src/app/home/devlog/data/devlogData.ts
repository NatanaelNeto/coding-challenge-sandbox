import { devlogViewModel } from "../../../shared/models/devlog-view-model";

export const devlogData: devlogViewModel[] = [
  {
    id: 1,
    title: 'Hello World!',
    date: new Date('13/12/2024'),
    paragraphs: [
      "Hello, devs!",
      "Today, I'm starting a project to showcase my coding skills visually. I'll update this devlog every time I program something new. This will include coding challenges, front-end designs, and case studies on game development.",
      "To start, I'll work on Conway's Game of Life. It's a fascinating cellular automaton, and I'll be programming it in TypeScript. I hope to write about this challenge soon.",
      "I hope you enjoy everything you find here. Thanks!",
    ]
  }
];