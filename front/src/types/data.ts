export interface CaseData {
  lang: 'en' | 'de';
  is_main: boolean;
  title: string;
  description: string;
  slugName: string;
  subTitle: string;
  projectLink: string | null;
  role: string;
  stacksNames: string[];
  screenshotsUrls: string[];
  mainImageUrl: string;
  previewImageUrl: string;
}

export interface FeedBackData {
  uuid: string;
  imgUrl: string;
  clientName: string;
  projectName: string | null;
  comment: string;
  link: string | null;
}

export interface StackData {
  name: string;
}
