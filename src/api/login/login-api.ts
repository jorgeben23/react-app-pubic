import { instance } from "../base.api";

const endpoint = "session/login";

interface credentialsProps {
  username: string;
  password: string;
}

export const loginApi = {
  getSessionByCredentials: async (credentials: credentialsProps) => {
    try {
      const parametros = {
        userName: credentials.username,
        password: credentials.password,
      };

      const response = await instance.post(endpoint, parametros);

      const userData = {
        idUser: response.data.idUser,
        userName: response.data.userName,
        fullName: `${response.data.firstName} ${response.data.lastName}`,
        roleName: response.data.roleName,
        roleId: response.data.roleId,
        token: response.data.token,
        expirationToken: response.data.expirationToken,
      };

      return userData;
    } catch (error) {
        throw {
          details: error.response ? error.response.data : error.message,
        }
        
    }
  },
  logout: () => {
    const endpoint_logout = "session/logout";

    try {
      return instance.post(endpoint_logout);
    } catch (error) {
      console.log(error);
    }
  },

  getEmailByUsername :  (userName : string) => {
    const endpoint = `session/email/${userName}`;

    try {
      return  instance.get(endpoint);
    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }

  },

  getSendRecoverEmail : async (userName : string) => {
    const endpoint = `session/send-recover-url/${userName}`;

    try {
      return await instance.get(endpoint);
    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }
  },

  getRulesForPassword :  ( ) => {
    const endpoint = `session/parameters-password`;

    try {
      return  instance.get(endpoint);
    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }

  },

  postUpdatePassword :  ( pass:string, confpass:string, token:string ) => {
    const endpoint = `session/change-password`;

    const body = {
      newPassword:pass,
      confirmPassword:confpass,
      token:token
    }

    try {
      return  instance.post(endpoint,body);
    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }

  },



};
