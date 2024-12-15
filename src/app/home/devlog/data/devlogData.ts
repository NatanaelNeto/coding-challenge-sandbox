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
  {
    id: 3,
    title: "Snake Game",
    date: new Date('14/12/2024'),
    paragraphs: [
      "Hello, devs!",
      "I completed my tasks at work, but I stayed in the office to help with any issues that might arise. Because of this, I decided to create another classic project: The Snake Game.",
      "In this project, I didn’t encounter any difficulties. I built the game logic step by step and finished on time! First, I set up the game grid using the same inputs as the Conway's Game of Life project.",
      "Next, I worked on the snake's movements, creating directional controls and implementing collision avoidance. I also added a toggle for walls and a collision detection system.",
      "Finally, I created the apple. I did wonder whether real snakes eat apples, but I placed it randomly on the grid and implemented a collision detection system with the snake. Each apple the snake eats awards a point to the player. The score is saved in the browser's local storage, allowing the player to see their highest score on the page.",
      "I hope you enjoy the game!",
    ]
  },
];