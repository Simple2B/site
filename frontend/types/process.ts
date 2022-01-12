export interface IProcessCard {
  id: number;
  title: string;
  description: string;
}

export const processCard: IProcessCard[] = [
  {
    id: 1,
    title: "01",
    description: "Initial requirements analysis",
  },
  {
    id: 2,
    title: "02",
    description: "Estimation of time & cost of the project",
  },
  {
    id: 3,
    title: "03",
    description: "Project start",
  },
  {
    id: 4,
    title: "04",
    description: "Project delivered",
  },
];
