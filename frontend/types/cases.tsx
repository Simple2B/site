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
export const ourCases: ICaseCard[] = [
  {
    id: 1,
    title: "Brunswick",
    subtitle: "A question-answering application (frontend part)",
    role: "Web Development, UX/UI Design",
    description:
      "We have built a single-page react user interface application, which enables users to ask questions and receive fully formed prose responses to arbitrary questions relating to Amazon products. These questions and answers can be collated into a mailing list, which is sent to recipients on a monthly basis.",
    illustration: "brunswick_img",
    tags: [
      "Typescript",
      "React",
      "Redux",
      "AWS-Amplify",
      "GraphQL",
      "Material-UI",
    ],
    isMain: true,
    imagePath: "brunswick/",
    gallery: [
      { fileName: "0101", legend: "Question bar view" },
      { fileName: "0102", legend: "Answer page view" },
      { fileName: "0103", legend: "Add to list view" },
      { fileName: "0104", legend: "Edit list view" },
    ],
  },
  {
    id: 2,
    title: "Waldup",
    subtitle: "Hiking & Trail running application for enthusiasts",
    role: "Web Development",
    description:
      "This application helps you to prepare and plan your hiking and trail running activities. Smart waypoints and race sheets. Customized timings. Includes features like creating, managing, viewing, and sharing GPS/map data, Stripe payment, Social Networks & Industry-specific 3rd party API integrations.",
    illustration: "waldup_img",
    tags: [
      "JavaScript",
      "Flask",
      "React",
      "Stripe",
      "PostgreSQL",
      "Python",
      "XML",
      "Leaflet",
      "PDF",
      "Docker",
      "NGINX",
      "Bootstrap",
    ],
    isMain: true,
    imagePath: "waldup/",
    gallery: [
      { fileName: "0201", legend: "Activity planning" },
      { fileName: "0202", legend: "Smart waypoints" },
      { fileName: "0203", legend: "Cheat sheets" },
      { fileName: "0204", legend: "PDF generation" },
    ],
    projectLink: "https://www.waldup.com",
  },
  {
    id: 3,
    title: "Mockmate",
    subtitle: "Recruiting Simulator",
    role: "Web Development",
    description:
      "Application for HR experts and candidates that utilize AI & ML algorithms to automate hiring processes as a part of the team.",
    illustration: "mockmate_img",
    tags: [
      "Code Refactoring",
      "Bootstrap",
      "Docker",
      "Heroku",
      "jQuery",
      "Flask",
      "Python",
    ],
    isMain: true,
    imagePath: "mockmate/",
    gallery: [
      { fileName: "0301", legend: "Dashboard screen" },
      { fileName: "0302", legend: "Create position screen" },
      { fileName: "0303", legend: "Recruiting simulator screen" },
    ],
    projectLink: "https://mockmate-hiring.herokuapp.com/",
  },
  {
    id: 4,
    title: "Chat Application",
    subtitle: "built with Sendbird",
    role: "Web Development",
    description:
      "We have built a Chat Application using Sendbird.com messaging API with a User Interface built with Python/Flask/JS that runs on AWS Lambda powered up with DynamoDB. Our work was appreciated by the client and we got 5-stars and positive feedback for it here on Upwork.",
    illustration: "chat_app_img",
    tags: [
      "API",
      "jQuery",
      "CSS",
      "HTML",
      "JavaScript",
      "Flask",
      "Python",
      "Amazon",
      "DynamoDB",
      "AWS",
      "Lambda",
    ],
    isMain: false,
    imagePath: "chat_app/",
    gallery: [
      { fileName: "0401", legend: "Admin Dashboard" },
      { fileName: "0402", legend: "Agent view" },
      { fileName: "0403", legend: "Chat details view" },
      { fileName: "0404", legend: "Chat list view" },
    ],
  },
  {
    id: 5,
    title: "Contracting",
    subtitle: "Quotations management applications",
    role: "Web Development",
    description:
      "Enable users to prepare custom quotations for clients. Include 3rd party application integration user & documents management. Documents can be converted to PDF and DOCX.",
    illustration: "contracting_img",
    tags: [
      "NGINX",
      "Docker",
      "Bootstrap",
      "API",
      "CSS",
      "HTML",
      "JavaScript",
      "Flask",
      "Python",
    ],
    isMain: false,
    imagePath: "contracting/",
    gallery: [
      { fileName: "0501", legend: "Account information screen" },
      { fileName: "0502", legend: "Bidding information screen" },
      { fileName: "0503", legend: "General project information screen" },
    ],
  },
];

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
