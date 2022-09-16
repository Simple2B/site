export type VacancyElement = {
  id: number;
  title: string;
  properties: IVacancyProperty[];
  overview: string;
  skills: string[];
  offer: string[];
  about: string;
  applyPath: string;
  isDeveloper: boolean;
};
interface IVacancyProperty {
  title: string;
  value: string;
}
export const vacancies: VacancyElement[] = [
  {
    id: 1,
    title: "Junior Full-stack Developer",
    properties: [
      {
        title: "location",
        value: "Kyiv",
      },
      {
        title: "schedule",
        value: "Full-time",
      },
      {
        title: "office",
        value: "Office/remote",
      },
    ],
    overview: `Hi candidate! We are an outsourcing startup company concentrated on web/mobile application development. We are looking for a React or React Native Junior developer (Full-Stack) to reinforce our team. Our main stack is Python (Django/Flask) on the back-end and TypeScript (React.js) on the front-end.`,
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
    applyPath: "/careers/apply/quiz/1",
    isDeveloper: true,
  },
  {
    id: 2,
    title: "Sales Manager",
    properties: [
      {
        title: "location",
        value: "Kyiv",
      },
      {
        title: "schedule",
        value: "Full-time",
      },
      {
        title: "office",
        value: "Office/remote",
      },
    ],
    overview: `Sales manager overview`,
    skills: ["first", "second", "third"],
    offer: ["first", "second", "third"],
    about:
      "Simple2B is an IT company. Team of enthusiasts of Web/Mobile Application Development. Not only we are professionals in many ways. We love our work and deliver high-quality solutions. We aim to grow and achieve mutual success with our customers. ",
    applyPath: "/careers/apply/contacts/2",
    isDeveloper: false,
  },
];
