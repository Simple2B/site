export type TLocalUserData = {
  email: string;
  session: number;
  questions: number[];
  current: number;
};

export const localStorageApi = {
  createUserData: () => {
    const data: TLocalUserData = {
      email: "",
      session: 0,
      questions: [],
      current: 0,
    };
    localStorage.setItem("s2b_user", JSON.stringify(data));
  },
  setUserData: (key: string, value: string | number | number[]) => {
    const lsData = localStorage.getItem("s2b_user");
    const parsedData = lsData && JSON.parse(lsData);
    parsedData[key] = value;
    localStorage.setItem("s2b_user", JSON.stringify(parsedData));
  },
  clearUserData: () => {
    localStorage.removeItem("s2b_user");
  },
  getUserData: () => {
    const lsData = localStorage.getItem("s2b_user");
    const parsedData: null | TLocalUserData = lsData && JSON.parse(lsData);
    return parsedData;
  },
};
