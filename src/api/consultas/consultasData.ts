import { CustomSweetAlert } from "../../config/Theme.config";
import { instance } from "../base.api";

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

export const consultaData = {
  getGeographicsCenter: async (name: string) => {
    const endpoint_gc = `geographic-centers?name=${name}`;

    try {
      const data = await instance.get(endpoint_gc);
      const dataSend = data.data.data;
      return dataSend;
    } catch (error) {
      console.log(error);
    }
  },
  getWharehouseByGeographicsCenterId: async ( search:string ,idGeographicCenterIn: string) => {
    const endpoint_whare = `stores/list/${idGeographicCenterIn}?search=${search}`;
  
    try {
      const data = await instance.get(endpoint_whare);
      const dataAlmacen = data.data.data;
      return dataAlmacen;
    } catch (error) {
      console.log(error);
    }
  },
  getDataByfiltersHeader: async (filtros: string) => {
    const endpoint_header_data = `epps${filtros}`;

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
};
