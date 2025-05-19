import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Battleship',
    description: 'Used components of Javascript to implement basic data structures through the game of Battleship. Used a terminal to display ships and tracked where ships are hit or missed.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    image: '',
    codePreview: `
hit?
Enter a location to strike i.e., 'A2' from A-J and 0-9. 
Missed!
Enter a location to strike i.e., 'A2' from A-J and 0-9. 
Missed!
Enter a location to strike i.e., 'A2' from A-J and 0-9. 
Missed!
Enter a location to strike i.e., 'A2' from A-J and 0-9. 
Missed!
hit!
You sunk a cruiser. There are 4 ships left!
    `,
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Movie Titles API',
    description: 'Uses a public movie API to build a collection movie list that sorts from A-Z by year. It also counts how many movies in each container and adds user\'s favorite movies into another container',
    tags: ['HTML', 'CSS', 'JavaScript', 'API', 'Version control'],
    image: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Javascript Calculator',
    description: 'Uses simple algorithm concepts in Javascript to produce an arithmetic result in a terminal.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    image: '',
    codePreview: `
console.log(\`The result is = \${8 + 2}\`);
console.log(\`The result is = \${8 / 2}\`);

// Format code
if (format === '+') { prompt = Number(prompt); }
if (format === '*') { prompt = Number(prompt); }
...
    `,
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 4,
    title: 'SaaS Landing Page',
    description: 'Made an HTML component that increased a form and a hero elevation. It also used components of both high-end and flexible components to produce a landing page.',
    tags: ['HTML', 'CSS'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    githubUrl: '#',
    liveUrl: '#',
  },
];