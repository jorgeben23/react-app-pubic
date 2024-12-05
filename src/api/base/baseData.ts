import { instance } from "../base.api";

interface ParamUpdateUser {
  idRole: string;
  mode: string;
  password?: string;
  confirmPassword?: string;
}

export const baseData = {
  getDataEmployees: (page: number, pageSize: number) => {
    const endpoint_base = `employees?page=${page}&pageSize=${pageSize}`;

    try {
      const data = instance.get(endpoint_base);
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getDataByfiltersHeader: async (filtros: string) => {
    const endpoint_header_data = `employees${filtros}`;

    try {
      // console.log(endpoint_header_data);
      const data = await instance.get(endpoint_header_data);
      const nroTotalRows = data.data.data.total;
      const dataTable = data.data.data.items.map((item, index) => ({
        numero: index + 1,
        ...item,
      }));

      return { dataTable, nroTotalRows };
    } catch (error) {
      console.log(error);
    }
  },
  patchInactivarUser: async (id: number) => {
    const endpoint_inactivar = `users/active/${id}`;
    const param = {
      active: "0",
    };

    try {
      const update = await instance.patch(endpoint_inactivar, param);
      return update;
    } catch (error) {
      console.log(error);
    }
  },
  patchActivarUser: async (id: number) => {
    const endpoint_inactivar = `users/active/${id}`;
    const param = {
      active: "1",
    };

    try {
      const update = await instance.patch(endpoint_inactivar, param);
      return update;
    } catch (error) {
      console.log(error);
    }
  },
  getRolesAll: async () => {
    const endpoint_get_roles = `roles/list`;
    try {
      const data = await instance.get(endpoint_get_roles);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  putDataUsuario: async (param : ParamUpdateUser, idusuario: string) => {
    const endpoint_put_user = `users/${idusuario}`;
    try {
      const data = await instance.put(endpoint_put_user,param);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
