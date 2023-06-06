export interface IProcessCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export const processCard: IProcessCard[] = [
  {
    id: 1,
    title: '01',
    subtitle: 'Initial requirements analysis',
    description: 'Kick-off meeting with the client to discuss the project goals and requirements.',
  },
  {
    id: 2,
    title: '02',
    subtitle: `Estimation of time & cost \n of the project`,
    description: 'Definition of the technological stack and tools to be used.',
  },
  {
    id: 3,
    title: '03',
    subtitle: 'Project start',
    description:
      'Building of UI/UX design and development of the application. Intermediate demos of the product progress to the client. Testing and releasing of the product.',
  },
  {
    id: 4,
    title: '04',
    subtitle: 'Project delivered',
    description:
      'Further maintenance and support as well as project scaling and new features development services.',
  },
];
