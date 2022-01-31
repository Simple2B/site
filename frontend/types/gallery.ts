export const GALLERY = [
  "photo (1)",
  "photo (2)",
  "photo (3)",
  "photo (4)",
  "photo (5)",
  "photo (6)",
];

export interface IUserDataProfile {
  id: number;
  fullName: string;
  position: string;
  description: string;
  image: string;
}

export const PROFILES: IUserDataProfile[] = [
  {
    id: 1,
    fullName: "Vasyl Khmura",
    position: "CEO",
    description:
      "Sales & Human Relations enthusiast. Entrepreneur & Strategist. Innovation developer. I have 17 years of working experience in IT, Telecommunications & Financial industries in top global companies in managerial positions. With all my experience, I'm helping businesses of different sizes & spheres to solve pain points, embrace strong sides, and discover opportunities to grow.",
    image: "V_Khmura",
  },
  {
    id: 2,
    fullName: "Nikolay Chernov",
    position: "CTO",
    description:
      "Senior Software Engineer and Technical Lead with more than 25 years experience. Object-Oriented Analysis and Design, Design Patterns, Best Programming Practices in C++ and C#, TDD (Test Driven Development), Qt, Cloud Application(Azure), Agile development with Scrum, client/server programming, TCP/IP and web protocols, Windows system programming, Multi-threading & IPC, Web Services, Git, SVN, TFS, Perforce, DDK/WIN PE build environment (NT Build), CMake. Last years focused on Web Application development on Python and TypeScript for implementing solution for small and middle businesses.",
    image: "N_Chernov",
  },
];
