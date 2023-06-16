export interface ITechnologyItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const OUR_TECHNOLOGIES: ITechnologyItem[] = [
  {
    id: 1,
    title: 'Flask',
    description:
      'Flask is a web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications & to keep the core of the application simple.',
    icon: 'flask',
  },
  {
    id: 2,
    title: 'React JS',
    description:
      'React JS is a library for building composable user interfaces or UI components. It encourages the creation of reusable UI components, which present data that changes over time.',
    icon: 'react',
  },
  {
    id: 3,
    title: 'FastAPI',
    description:
      'FastAPI is a modern, open-source, fast, and highly performant Python web framework used for building Web APIs and is based on Python 3.6+ standard type hints.',
    icon: 'fast_api',
  },
  {
    id: 4,
    title: 'Type Script',
    description:
      'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.',
    icon: 'typescript',
  },
  {
    id: 5,
    title: 'React Native',
    description:
      'React Native is a popular mobile app framework that allows you to build mobile apps for iOS and Android. The framework lets you create an application for various platforms by using the same codebase.',
    icon: 'react_native',
  },
  {
    id: 6,
    title: 'AWS',
    description:
      'Amazon Web Services is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis.',
    icon: 'aws',
  },
  {
    id: 7,
    title: 'Django',
    description:
      "Django is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. Django's primary goal is to ease the creation of complex, database-driven websites.",
    icon: 'django',
  },
];
