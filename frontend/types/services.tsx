import ArchitectureBee from "../assets/svg/services/solution_architecture.svg";
import DevelopmentBee from "../assets/svg/services/development.svg";
import SupportBee from "../assets/svg/services/support_service.svg";

export interface IServiceCard {
  id: number;
  illustration: string;
  title: string;
  description: string[];
}
export const ourServices: IServiceCard[] = [
  {
    id: 1,
    illustration: "solution_architecture.svg",
    title: "Solution architecture",
    description: [
      "Project estimation to evaluate the duration of the project from initiation to the commercial launch",
      "We will create an architecture of your new web application or transform the architecture of your existing one to meet the latest needs & requirements of your business",
    ],
  },
  {
    id: 2,
    illustration: "development.svg",
    title: "Development",
    description: [
      "Coding phase",
      "Testing phase",
      "Regular basis reporting for you to track the project progress",
    ],
  },
  {
    id: 3,
    illustration: "support_service.svg",
    title: "Support service",
    description: [
      "We want our partnership to last. To ensure the continuity of your business we will be there to help you with new ideas implementation & other post-development services",
    ],
  },
];
