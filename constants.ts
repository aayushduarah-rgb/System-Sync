import type { Software } from './types';

export const SOFTWARE: Software[] = [
  {
    id: 'cyberpunk2077',
    name: 'Cyberpunk 2077',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    minReqs: { cpu: 'Intel Core i7-6700 or AMD Ryzen 5 1600', gpu: 'Nvidia GeForce GTX 1060 6GB or AMD Radeon RX 580 8GB', ram: '12 GB', os: 'Windows 10 64-bit' },
    recReqs: { cpu: 'Intel Core i7-12700 or AMD Ryzen 7 7800X3D', gpu: 'Nvidia GeForce RTX 3080 or AMD Radeon RX 6800 XT', ram: '16 GB', os: 'Windows 11 64-bit' }
  },
  {
    id: 'adobe-photoshop-2024',
    name: 'Adobe Photoshop 2024',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1200px-Adobe_Photoshop_CC_icon.svg.png',
    minReqs: { cpu: 'Intel or AMD processor with 64-bit support; 2 GHz or faster processor with SSE 4.2 or later', gpu: 'GPU with DirectX 12 support, 1.5 GB of GPU memory', ram: '8 GB', os: 'Windows 10 64-bit (version 22H2) or later' },
    recReqs: { cpu: 'Intel or AMD processor with 64-bit support; 2 GHz or faster processor with SSE 4.2 or later', gpu: 'GPU with DirectX 12 support, 4 GB of GPU memory for 4K displays and greater', ram: '16 GB or more', os: 'Windows 11' }
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