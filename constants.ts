import type { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'cyberpunk2077',
    name: 'Cyberpunk 2077',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    minReqs: { cpu: 'Intel Core i7-6700 or AMD Ryzen 5 1600', gpu: 'Nvidia GeForce GTX 1060 6GB or AMD Radeon RX 580 8GB', ram: '12 GB', os: 'Windows 10 64-bit' },
    recReqs: { cpu: 'Intel Core i7-12700 or AMD Ryzen 7 7800X3D', gpu: 'Nvidia GeForce RTX 3080 or AMD Radeon RX 6800 XT', ram: '16 GB', os: 'Windows 11 64-bit' }
  },
  {
    id: 'stardew_valley',
    name: 'Stardew Valley',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Stardew_Valley_box_art.png',
    minReqs: { cpu: '2 Ghz', gpu: '256 mb video memory, shader model 3.0+', ram: '2 GB', os: 'Windows Vista or greater' },
    recReqs: { cpu: '2.4 Ghz or better', gpu: '512 mb video memory, shader model 3.0+', ram: '4 GB', os: 'Windows 10/11' }
  },
  {
    id: 'elden_ring',
    name: 'Elden Ring',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_Art.jpg',
    minReqs: { cpu: 'Intel Core i5-8400 or AMD Ryzen 3 3300X', gpu: 'Nvidia GeForce GTX 1060 3GB or AMD Radeon RX 580 4GB', ram: '12 GB', os: 'Windows 10' },
    recReqs: { cpu: 'Intel Core i7-8700K or AMD Ryzen 5 3600X', gpu: 'Nvidia GeForce GTX 1070 8GB or AMD Radeon RX VEGA 56 8GB', ram: '16 GB', os: 'Windows 11' }
  },
  {
    id: 'valorant',
    name: 'Valorant',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Valorant_box_art.jpg',
    minReqs: { cpu: 'Intel Core 2 Duo E8400 or AMD Athlon 200GE', gpu: 'Intel HD 4000 or Radeon R5 200', ram: '4 GB', os: 'Windows 7/8/10 64-Bit' },
    recReqs: { cpu: 'Intel i5-9400F 2.90GHz or AMD Ryzen 5 2600X', gpu: 'Nvidia GeForce GTX 1050 Ti or Radeon R7 370', ram: '8 GB', os: 'Windows 10/11 64-Bit' }
  },
];