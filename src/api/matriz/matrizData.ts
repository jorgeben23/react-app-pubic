import { instance } from "../base.api";

interface Epp {
  idEpp: string;
  lifeTime: number;
}

interface MatrizData {
  idOrganicStructure: string;
  idPosition: string;
  listEpp: Epp[];
}

interface PutMatrizdata {
  idEppMatrix: string;
  idOrganicStructure: string;
  idPosition: string;
  idEpp: string;
  lifeTime: number;
}

export const matrizData = {
  getOptionsPuesto: async (position: string) => {
    const endpoint_position = `positions/list?name=${position}`;

    try {
      const data = await instance.get(endpoint_position);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },
  getOptionsEpps: async (eppname: string) => {
    const endpoint_epp = `epps/list?name=${eppname}`;

    try {
      const data = await instance.get(endpoint_epp);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getOptionsGerencia: async (gerencianame: string) => {
    const endpoint_os_gerencia = `organic-structures/list?search=${gerencianame}&level=1`;

    try {
      const data = await instance.get(endpoint_os_gerencia);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getOptionsArea: async (areaname: string) => {
    const endpoint_os_area = `organic-structures/list?search=${areaname}&level=2`;

    try {
      const data = await instance.get(endpoint_os_area);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getOptionsDepartamento: async (departamentoname: string) => {
    const endpoint_os_departamento = `organic-structures/list?search=${departamentoname}&level=3`;

    try {
      const data = await instance.get(endpoint_os_departamento);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getOptionsCategoria: async (categorianame: string) => {
    const endpoint_os_categorianame = `epp-categories/list?search=${categorianame}&level=3`;

    try {
      const data = await instance.get(endpoint_os_categorianame);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getDataByfiltersHeader: async (filtros: string) => {
    const endpoint_header_data = `epp-matrixs${filtros}`;

    try {
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

  postRegisterNewMatriz: async (dataParametro: MatrizData) => {
    const endpoint_newMatriz = `epp-matrixs`;
    try {
      const insdata = await instance.post(endpoint_newMatriz, dataParametro);
      return insdata;
    } catch (error) {
      console.log(error);
    }
  },
  getDataMatrizById: async (idMatriz: string) => {
    const endpoint_get_matriz = `/epp-matrixs/${idMatriz}`;

    try {
      if (idMatriz) {
        const data = await instance.get(endpoint_get_matriz);
        const dataSend = data.data.data;
        return dataSend;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  putMatrizById: async (dataMatriz: PutMatrizdata) => {
    const endpoint_put_matriz = `/epp-matrixs`;

    try {

        const data = await instance.put(endpoint_put_matriz,dataMatriz);
        return data;

    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteMatrizById: async (idEppMatrix: string) => {
    const endpoint_delete_matriz = `/epp-matrixs/${idEppMatrix}`;
    try {
        const data = await instance.delete(endpoint_delete_matriz);
        return data;

    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getOrganicByPositionId: async (idPosition: string) => {
    const endpoint_get_position = `/employees/organic-structure/position/${idPosition}`;

    try {
      if (idPosition) {
        const data = await instance.get(endpoint_get_position);
        const dataSend = data.data.data;
        return dataSend;
      }
      return null;
    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }
  },

  getEppsByIdCategoria: async (inputValue: string, categoriaId : string) => {
    const endpoint_get_eppsCategoria = `/epps/list?name=${inputValue}&idEppCategory=${categoriaId}`;

    try {
      const data = await instance.get(endpoint_get_eppsCategoria);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
