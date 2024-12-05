import { instance } from "../base.api";
import {
    dataTableSolicitud,
} from "./../dataSimulado";

const endpoint = "";

export const dataSolicitud = {
  getDataAll: () => {
    return dataTableSolicitud;
  },

  getDataByfiltersHeader: async (filtros: string) => {
    const endpoint_header_data = `requirements${filtros}`;

    try {
      // console.log(endpoint_header_data);
      const data = await instance.get(endpoint_header_data);
      const nroTotalRows = data.data.data.total;
      // const dataTable = data.data.data.items.map((item, index) => ({
      //   numero: index + 1,
      //   ...item,
      // }));

      const dataTable = data.data.data.items;

      return { dataTable : dataTable || [], nroTotalRows };
    } catch (error) {
      console.log(error);
    }
  },

  postValidarRequeriment : async ( listreq : string[]) => {
    const endpoint_req_data = `requirements/validate`;
    const parametros = {
        "requirements": listreq, 
        "approved": "1"
    }
    try {
      const postData = await instance.post(endpoint_req_data,parametros);
      return postData;
    } catch (error) {
      console.log(error);
    }
  },

  postRechazarRequeriment : async ( listreq : string[]) => {
    const endpoint_req_data = `requirements/validate`;
    const parametros = {
        "requirements": listreq, 
        "approved": "0"
    }
    try {
      const postData = await instance.post(endpoint_req_data,parametros);
      return postData;
    } catch (error) {
      console.log(error);
    }
  },

  getDataByfiltersHeaderVerificados: async (filtros: string) => {
    const endpoint_header_data = `requirements/list-validated${filtros}`;

    try {
      // console.log(endpoint_header_data);
      const data = await instance.get(endpoint_header_data);
      const nroTotalRows = data.data.data.total;
      // const dataTable = data.data.data.items.map((item, index) => ({
      //   numero: index + 1,
      //   ...item,
      // }));

      const dataTable = data.data.data.items;

      return { dataTable : dataTable || [], nroTotalRows };
    } catch (error) {
      console.log(error);
    }
  },

  deleteRequeriment : async ( id : string) => {
    const endpoint_del_req = `requirements/${id}`;
    try {
      const postData = await instance.delete(endpoint_del_req);
      return postData;
    } catch (error) {
      console.log(error);
    }
  },

  getReporteVerificados : async ( filtros : string) => {
    const endpoint_del_req = `requirements/export-validated${filtros}`;
    try {
      const getreport = await instance.get(endpoint_del_req, {
        responseType: 'blob'
      });
      return getreport;
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      throw error;
    }
  },




};
