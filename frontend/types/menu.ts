export interface IMenu {
  id: number;
  title: string;
  url: string;
}

export const menuList: IMenu[] = [
  {
    id: 1,
    title: "Services",
    url: "/services",
  },
  {
    id: 2,
    title: "Cases",
    url: "/cases",
  },
  {
    id: 3,
    title: "Process",
    url: "/process",
  },
  {
    id: 4,
    title: "About Us",
    url: "/about",
  },
  {
    id: 5,
    title: "Contacts",
    url: "#contacts",
  },
];
