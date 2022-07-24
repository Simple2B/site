import { instance } from "./axiosInstance";

interface IUser {

}

export const clientApi = {
    createUser: async (data: IUser): Promise<IUser> => {
      try {
          const response = await instance().post(
            "/user/create_user",
            data
          );
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST createUser: error message => ${error.message}`);
          throw error;
      }
    },
    getUser: async (email: string): Promise<IUser> => {
      try {
          const response = await instance().get(`/user/email/${email}`);
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST getUser: error message => ${error.message}`);
          throw error;
      }
    },
    getUsers: async (): Promise<IUser[]> => {
      try {
          const response = await instance().get('/user/get_users');
          const res = response.data;
          return res;
      } catch (error: any) {
          console.log(`POST getUsers: error message => ${error.message}`);
          throw error;
      }
    },
}
