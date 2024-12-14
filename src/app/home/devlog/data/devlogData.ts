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
  },
  {
    id: 2,
    title: "Conway's Game of Life",
    date: new Date('14/12/2024'),
    paragraphs: [
      "Hello, devs!",
      "I finished coding Conway's Game of Life! It's available on my coding page. Let me share some details about this project:",
      "I faced some challenges while programming this in TypeScript. I had to figure out how to integrate canvas with Angular in the same project, connecting TypeScript variables to canvas styling. The documentation was a great help in understanding these issues.",
      "But it wasn’t anything too serious! I successfully completed the project and added inputs to control the Game of Life's grid size and the generation duration.",
      "Although the project is almost complete, I plan to enhance it with some new features. I'll add a 'dying' state between the 'alive' and 'dead' states.",
      "I'll also improve this site by adding a mobile-friendly version and a dark mode design.",
    ]
  },
];