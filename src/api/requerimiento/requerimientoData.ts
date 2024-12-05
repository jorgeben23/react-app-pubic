import { CustomSweetAlert } from "../../config/Theme.config";
import { instance } from "../base.api";
import {
  registrosRequerimiento,
  registrosRequerimientoEpp,
  ramdomReq,
  reqeCostosArray,
  dataGeografico,
  dataEmployee,
  dataReqEpp,
  dataReqAlmacen,
} from "./../dataSimulado";

interface DetailReq {
  emergency: string;
  idEpp: string;
  quantity: number;
  idStore: string;
}

interface PostNewRequerimiento {
  idEmployee: string;
  idCostCenter: string;
  idGeographicCenter: string;
  comment: string;
  details: DetailReq[];
}





const endpoint = "";

const showAlert = (
  titulo: string,
  mssg: string,
  tipo: "success" | "error" | "warning" | "info"
) => {
  CustomSweetAlert.fire({
    title: titulo,
    html: mssg,
    icon: tipo,
    showConfirmButton: true,
    confirmButtonText: "Entendido",
  });
};

export const dataRequerimiento = {
  getOptionsCostos: async (searchValue: string) => {
    const endpoint_get_centroCostos = `/cost-centers?search=${searchValue}`;
    try {
      const data = await instance.get(endpoint_get_centroCostos);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getOptionsGeographics: async (
    searchValue: string,
    idCentroCostos?: number
  ) => {
    const endpoint_get_centrogeografico = `/geographic-centers/cost-center/${idCentroCostos}?search=${searchValue}`;

    if (idCentroCostos) {
      try {
        const data = await instance.get(endpoint_get_centrogeografico);
        const dataSend = data.data.data;
        return dataSend;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      return null;
    }
  },

  getDataEmployeeByDocument: async (documento: string) => {

    const endpoint_get_data_employee = `/employees/${documento}`;
    try {
      const data = await instance.get(endpoint_get_data_employee);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getOptionsEpp: async (searchValue: string) => {
    const endpoint_epp = `epps/list?name=${searchValue}`;

    try {
      const data = await instance.get(endpoint_epp);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },

  getOptionsAlmacen: async (searchValue: string, identifiador?: string) => {
    
    const endpoint_epp = `stores/list/${identifiador}?search=${searchValue}`;
    if (identifiador) {
      try {
        const data = await instance.get(endpoint_epp);
        const dataSend = data.data.data;
        return dataSend;
      } catch (error) {
        console.log(error);
      }
    } else {
     return null;
    }
  },

  getDataByfiltersHeader: async (filtros: string) => {
    const endpoint_header_data = `requirements${filtros}`;

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

  getEppByIdUser: async (searchValue: string, identifiador?: string) => {
    
    const endpoint_epp = `epp-matrixs/list/${identifiador}?search=${searchValue}`;
    if (identifiador) {
      try {
        const data = await instance.get(endpoint_epp);
        const dataSend = data.data.data;
        return dataSend;
      } catch (error) {
        console.log(error);
      }
    } else {
     return null;
    }
  },

  postNewRequerimiento : async ( dataParametro :PostNewRequerimiento) => {
    try {

      const endpoint_requerimiento = `requirements`;
      const insdata = await instance.post(endpoint_requerimiento,dataParametro); 
      return insdata;

    } catch (error) {
      throw {
        details: error.response ? error.response.data : error.message,
      }
    }
  }

  // --- Estos van a ser pasados a hechos poco a poco



};
