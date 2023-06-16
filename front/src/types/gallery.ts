export const GALLERY = [
  { id: 1, photo: 'photo (1)' },
  { id: 2, photo: 'photo (2)' },
  { id: 3, photo: 'photo (3)' },
  { id: 4, photo: 'photo (4)' },
  { id: 5, photo: 'photo (5)' },
  { id: 6, photo: 'photo (6)' },
  { id: 7, photo: 'photo (7)' },
];

export interface IUserDataProfile {
  id: number;
  fullName: string;
  position: string;
  image: string;
  description: string;
}

export const PROFILES: IUserDataProfile[] = [
  {
    id: 1,
    fullName: 'Vasyl Khmura',
    position: 'CEO',
    description:
      "Sales & Human Relations enthusiast. Entrepreneur & Strategist. Innovation developer. I have 17 years of working experience in IT, Telecommunications & Financial industries in top global companies in managerial positions. With all my experience, I'm helping businesses of different sizes & spheres to solve pain points, embrace strong sides, and discover opportunities to grow.",
    image: 'V_Khmura',
  },
  {
    id: 2,
    fullName: 'Nikolay Chernov',
    position: 'CTO',
    description:
      'Senior Software Engineer and Technical Lead with more than 25 years experience. Object-Oriented Analysis and Design, Design Patterns, Best Programming Practices in C++ and C#, TDD (Test Driven Development), Qt, Cloud Application(Azure), Agile development with Scrum, client/server programming, TCP/IP and web protocols, Windows system programming, Multi-threading & IPC, Web Services, Git, SVN, TFS, Perforce, DDK/WIN PE build environment (NT Build), CMake. Last years focused on Web Application development on Python and TypeScript for implementing solution for small and middle businesses.',
    image: 'N_Chernov',
  },
];

export const TEAM_PROFILES: IUserDataProfile[] = [
  {
    id: 1,
    fullName: 'Taras',
    position: 'Full-stack developer',
    image: 'taras_l',
    description: '',
  },
  {
    id: 2,
    fullName: 'Dana',
    position: 'Full-stack developer',
    image: 'dana_r',
    description: '',
  },
  {
    id: 3,
    fullName: 'Gleb',
    position: 'Full-stack developer',
    image: 'gleb_sh',
    description: '',
  },
  {
    id: 4,
    fullName: 'Yuliya',
    position: 'Full-stack developer',
    image: 'yuliya_m',
    description: '',
  },
  {
    id: 5,
    fullName: 'Dmitriy',
    position: 'Full-stack developer',
    image: 'dmitriy_m',
    description: '',
  },
  {
    id: 6,
    fullName: 'Alik (Oleh)',
    position: 'Full-stack developer',
    image: 'alik_sh',
    description: '',
  },
  {
    id: 7,
    fullName: 'Varvara',
    position: 'Full-stack developer',
    image: 'varvara_sh',
    description: '',
  },
  {
    id: 8,
    fullName: 'Andrii',
    position: 'Full-stack developer',
    image: 'andriy_y',
    description: '',
  },
  {
    id: 9,
    fullName: 'Petro',
    position: 'Full-stack developer',
    image: 'petro_m',
    description: '',
  },
  {
    id: 10,
    fullName: 'Ivanna',
    position: 'Sales manager',
    image: 'ivanna_r',
    description: '',
  },
  {
    id: 11,
    fullName: 'Svyatoslav',
    position: 'Full-stack developer',
    image: 'svyatoslav_a',
    description: '',
  },
  {
    id: 12,
    fullName: 'Alexander',
    position: 'Full-stack developer',
    image: 'alexander_v',
    description: '',
  },
  {
    id: 13,
    fullName: 'Kristina',
    position: 'UX/UI Designer',
    image: 'kristina_f',
    description: '',
  },
  {
    id: 14,
    fullName: 'Natalia',
    position: 'Sales manager',
    image: 'natalia_kh',
    description: '',
  },
];
