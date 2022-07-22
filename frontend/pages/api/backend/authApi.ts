import { authInstance } from "./axiosInstance";

const formatRequestBody = (email: string, password: string) => {
    const formData = new FormData();
    formData.append("grant_type", "");
    formData.append("username", email);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", ""); 
    formData.append("client_secret", ""); 
    return formData;
};

const formatRequestBodyApiKey = (password: string, api_key: string) => {
    const params = {
        password: password,
        api_key: api_key,
    };
    return params;
};

export const authApi = {
    login: async (
        email: string,
        password: string
    ): Promise<any> => {
      try {
        const response = await authInstance.post(
          "/user/sign_in",
          {email, password}
        );
        console.log("POST [/sign_in] response received successfully");
        return response.data;
      } catch (error: any) {
        console.log(`POST [/auth/sign_in] error message: ${error.message}`);
        throw error;
      }
},

  setPassword: async (password: string, api_key: string): Promise<void> => {
    try {
      const response = await authInstance.post(
        "/auth/sign_up",
        formatRequestBodyApiKey(password, api_key)
      );
      console.log(
        `POST [/sing_up/${api_key}] response received successfully`
      );
      return response.data;
    } catch (error: any) {
      console.log(
        `POST [/sing_up/${api_key}] error message: ${error.message}`
      );
      throw error;
    }
  },
};
