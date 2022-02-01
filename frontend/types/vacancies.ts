export type VacancyElement = {
  id: number;
  title: string;
  location: string;
  schedule: string;
  office: string;
  overview: string;
  skills: string[];
  offer: string[];
  about: string;
};
export const vacancies: VacancyElement[] = [
  {
    id: 1,
    title: "Junior Full-stack Developer",
    location: "Kyiv",
    schedule: "Full-time",
    office: "Office/remote",
    overview:
      "Hi candidate!<br />We are an outsourcing startup company concentrated on web/mobile application development. We are looking for a React or React Native Junior developer (Full-Stack) to reinforce our team. Our main stack is Python (Django/Flask) on the back-end and TypeScript (React.js) on the front-end.",
    skills: [
      "Knowledge of JavaScript, React or React Native, CSS & HTML frameworks. TypeScript is a plus",
      "Understanding of Redux",
      "Fundamentals in data structures and complex algorithms",
      "Understanding of React Hooks",
    ],
    offer: [
      "Competitive salary",
      "Startup atmosphere (in a good sense) with the plain organization structure",
      "Knowledge sharing with experienced engineers, easily accessible CTO with vast experience ready to help",
      "Work remotely or in the office in Kyiv with flexible working hours",
    ],
    about:
      "Simple2B is an IT company. Team of enthusiasts of Web/Mobile Application Development. Not only we are professionals in many ways. We love our work and deliver high-quality solutions. We aim to grow and achieve mutual success with our customers. ",
  },
];
