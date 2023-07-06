export interface ICaseCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  illustration: string;
  tags: string[];
  isMain: boolean;
  imagePath: string;
  gallery: IGalleryImage[];
  projectLink?: string;
}
export interface IGalleryImage {
  fileName: string;
  legend: string;
}

export const caseFilters: string[] = [
  "Show All",
  "Python",
  "Flask",
  "JavaScript",
  "Typescript",
  "React",
  "Redux",
  "SQL",
  "Docker",
  "API",
  "REST",
  "GraphQL",
  "AWS",
  "AWS-Amplify",
  "NGINX",
  "HTML/CSS",
  "jQuery",
  "Material-UI",
];
