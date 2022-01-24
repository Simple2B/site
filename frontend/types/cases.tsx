import BrunswickImg from "../assets/svg/cases/brunswick_img.svg";
import WaldupImg from "../assets/svg/cases/waldup_img.svg";
import MockmateImg from "../assets/svg/cases/mockmate_img.svg";

export interface ICaseCard {
  id: number;
  illustration: string;
  title: string;
  description: string;
  tags: string[];
  isMain: boolean;
}

export const ourCases: ICaseCard[] = [
  {
    id: 1,
    illustration: BrunswickImg,
    title: "Brunswick",
    description:
      "We have built a single-page react user interface application, which enables users to ask questions and receive fully formed prose responses to arbitrary questions relating to Amazon products. These questions and answers can be collated into a mailing list, which is sent to recipients on a monthly basis.",
    tags: [],
    isMain: true,
  },
  {
    id: 2,
    illustration: WaldupImg,
    title: "Waldup",
    description:
      "This application helps you to prepare and plan your hiking and trail running activities. Smart waypoints and race sheets. Customized timings. Includes features like creating, managing, viewing, and sharing GPS/map data, Stripe payment, Social Networks & Industry-specific 3rd party API integrations.",
    tags: [],
    isMain: true,
  },
  {
    id: 3,
    illustration: MockmateImg,
    title: "Mockmate",
    description:
      "Application for HR experts and candidates that utilize AI & ML algorithms to automate hiring processes as a part of the team.",
    tags: [],
    isMain: true,
  },
  {
    id: 4,
    illustration: MockmateImg,
    title: "Chat Application",
    description:
      "We have built a Chat Application using Sendbird.com messaging API with a User Interface built with Python/Flask/JS that runs on AWS Lambda powered up with DynamoDB. Our work was appreciated by the client and we got 5-stars and positive feedback for it here on Upwork.",
    tags: [],
    isMain: false,
  },
  {
    id: 5,
    illustration: MockmateImg,
    title: "Contracting",
    description:
      "Enable users to prepare custom quotations for clients. Include 3rd party application integration user & documents management. Documents can be converted to PDF and DOCX.",
    tags: [],
    isMain: false,
  },
];
