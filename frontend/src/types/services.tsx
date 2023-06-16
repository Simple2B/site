export interface IServiceCard {
  id: number;
  illustration: string;
  title: string;
  description: string[];
}
export const ourServices: IServiceCard[] = [
  {
    id: 1,
    illustration: 'solution_architecture.svg',
    title: 'Solution architecture',
    description: [
      'Project estimation to evaluate the duration of the project from initiation to the commercial launch',
      'We will create an architecture of your new web application or transform the architecture of your existing one to meet the latest needs & requirements of your business',
    ],
  },
  {
    id: 2,
    illustration: 'development.svg',
    title: 'Development',
    description: [
      'Coding phase',
      'Testing phase',
      'Regular basis reporting for you to track the project progress',
    ],
  },
  {
    id: 3,
    illustration: 'support_service.svg',
    title: 'Support service',
    description: [
      'We want our partnership to last. To ensure the continuity of your business we will be there to help you with new ideas implementation & other post-development services',
    ],
  },
];

export const WHAT_WE_DO: string[] = [
  'Architecture design, UX and development of modern web & mobile applications',
  'Full-stack end-to-end development with cutting-edge technologies',
  'Frontend expertise in React & Redux',
  'Backend expertise in Python apps on Django, Flask, AsyncIO, SQLAlchemy',
  'Deployment and CI expertise in Docker, Nginx',
  'Mobile & Desktop: React Native, Electron',
];

export const OUR_MISSION: string[] = [
  'Deliver optimal solutions with top quality',
  'Customer satisfaction is given top priority',
  'Improve the quality of our products by exploring innovate ideas and new technologies',
  'Enhance efficiency, productivity and capability of businesses by delivering the services',
  'Visualize our organization to be the first and the last stop for the businesses across the globe seeking out for long-term success and prosperity with the help of our team',
];
