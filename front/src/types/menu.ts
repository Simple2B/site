export interface IMenu {
  id: number;
  title: string;
  url: string;
}


export interface IMenuInclude {
  menuLinks: IMenu[];
  contactUs: string;
}
