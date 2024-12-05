import { instance } from "../base.api";
import {
  dataGerenciaRepo,
  dataEstadoRepo,
  dataEstadisticas,
  dataTableReporte
} from "./../dataSimulado";

export const dataReportes = {
  getOptionsGerencia: (searchValue: string, identifiador?: number) => {
    if (identifiador) {
      return dataGerenciaRepo.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.id_padre == identifiador
      );
    } else {
      return dataGerenciaRepo.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  },
  getOptionsEstado: (searchValue: string, identifiador?: number) => {
    if (identifiador) {
      return dataEstadoRepo.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          item.id_padre == identifiador
      );
    } else {
      return dataEstadoRepo.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  },
  getDataEstadisticoInit: () => {
    return dataEstadisticas;
  },
  getDataAll: () => {
    return dataTableReporte;
  },
  getDataByfiltersHeader: (
    filters: { field: string; value: string } | null
  ) => {
    console.log(filters)
    return dataTableReporte;
  },

};
