import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Box, Typography, Select, MenuItem, Button, TextField } from '@mui/material';
import CabeceraPage from '../../../../components/CabeceraPage';
import { themePalette, CustomSweetAlert } from '../../../../config/Theme.config';
import Grid from '@mui/material/Grid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import DownloadIcon from '@mui/icons-material/Download';
import DataTable from '../../../../components/TableComponent';
import { useHeaders } from './TableStructure/headers';
import { useHeadersSecondTable } from './TableStructure/headersTable2';
import { dataSolicitud } from './../../../../api/solicitudes/SolicitudData';
import { dataRequerimiento } from './../../../../api/requerimiento/requerimientoData';

const objData = {
  firstData: "EPP",
  secondData: "Solicitudes"
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export const Solicitudes: React.FC = () => {



  const [dataPendientes, setDataPendientes] = useState<any[]>([]);
  const [dataVerificados, setDataVerificados] = useState<any[]>([]);

  const isFirstRender = useRef(true); // para verificar que es la primera vez que se monta el componente
  const isFirstRenderVerificado = useRef(true);




  const [dataToTablePendientes, setDataToTablePendientes] = useState([]);
  const [totalDataToTablePendientes, setTotalDataToTablePendientes] = useState(0);
  const [isLoadingPendientes, setIsLoadingPendientes] = useState(false);
  const [filtrosCabeceraPendiente, setFiltrosCabeceraPendiente] = useState({});
  const [idsRowsSelected, serIdsRowsSelected] = useState<string[]>([]);
  const [bandLimpiarPendientes, setBandLimpiarPendientes] = useState<boolean>(false);
  const [executeLoadDataPend, setExecuteLoadDataPend] = useState<boolean>(true);
  const [filtrosFormMainPend, setFiltroFormMainPend] = useState<string>('');
  const [filtrosToReportPend, setFiltrosToReportPend] = useState([]);
  const [backPageOne, setBackPageOne] = useState<number>(0);

 
  const [filtrosToPaginate, setFiltrosToPaginate] = useState<string>('');
  const [filtroOnlyOneFunction, setFiltroOnlyOneFunction] = useState<string>(''); // solo para el caso de acepar y rechazar



  const [dataToTableVerificados, setDataToTableVerificados] = useState([]);
  const [totalDataToTableVerificados, setTotalDataToTableVerificados] = useState(0);
  const [isLoadingVerificados, setIsLoadingVerificados] = useState(false);
  const [idsRowsSelectedVeri, serIdsRowsSelectedVeri] = useState<string[]>([]);
  const [filtrosCabeceraVerificado, setFiltrosCabeceraVerificado] = useState({});
  const [bandLimpiarVerificado, setBandLimpiarVerificado] = useState<boolean>(false);
  const [executeLoadData, setExecuteLoadData] = useState<boolean>(true);
  const [filtrosFormMain, setFiltroFormMain] = useState<string>('');
  const [filtrosToReport, setFiltrosToReport] = useState([]);
  const [filtrosToPaginateVeri, setFiltrosToPaginateVeri] = useState<string>('');
  const [backPageOneVeri, setBackPageOneVeri] = useState<number>(0);



  // -- Variables para filtros totales
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [nroFilasPagina, setNroFilasPagina] = useState<number>(5);

  const [nroPaginaVerificados, setNroPaginaVerificados] = useState<number>(1);
  const [nroFilasPaginaVerificados, setNroFilasPaginaVerificados] = useState<number>(5);

  const [filtroTextosIni, setFiltroTextosIni] = useState('');
  const [value, setValue] = useState(0);
  const [formValuesPendientes, setFormValuesPendientes] = useState({
    fechaInicio: '',
    fechaFin: '',
    tipo: 'normal',
  });
  const [formValuesVerificados, setFormValuesVerificados] = useState({
    fechaInicio: '',
    fechaFin: '',
    estado: 1,
  });


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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChangeVerificados = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormValuesVerificados({
      ...formValuesVerificados,
      [name]: value,
    });
  };





  // =================================================================
  // ----------- Para la paginacion de la tabla 

  // --- Para la paginacion table 2 Verificados
  const handlePaginationChangeVerificado = async (pageInfo: { currentPage: number; rowsPerPage: number }) => {

    let filterAll = '';
    const { currentPage, rowsPerPage } = pageInfo;
    // setNroPaginaVerificados(currentPage);
    // setNroFilasPaginaVerificados(rowsPerPage);
    setNroPagina(currentPage);
    setNroFilasPagina(rowsPerPage);

    if (Object.keys(filtrosCabeceraVerificado).length > 0) {

      const filtrosHeaders = JSON.parse(filtrosCabeceraVerificado);
      const concatfilter = filtrosHeaders.map(item => `${item.field}=${item.value}`).join('&');
      filterAll = `?${concatfilter}&page=${currentPage}&pageSize=${rowsPerPage}`;

    } else {
      filterAll = `?page=${currentPage}&pageSize=${rowsPerPage}`;

    }

    // -- si hay filtros de arriba
    if (filtroTextosIni.length > 0) {
      filterAll = `${filtroTextosIni}&${filterAll.slice(1)}`;
    }

    setIsLoadingVerificados(true);
    setBandLimpiarVerificado(false);
    const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeaderVerificados(filterAll);

    setTotalDataToTableVerificados(nroTotalRows);
    setDataToTableVerificados(dataTable);
    setIsLoadingVerificados(false);
  }


  // =================================================================

  // -- Para los filtros de los pendientes  ==========================

  const convertirNewTextFiltros = (paramsArray, newPage, newPageSize) => {
    paramsArray = paramsArray.map(param => {
      if (param.startsWith("page=")) {
        return `page=${newPage}`;
      } else if (param.startsWith("pageSize=")) {
        return `pageSize=${newPageSize}`;
      }
      return param; // Dejar intactos los demás parámetros
    });

    // 3. Reconstruir la cadena
    let updatedQueryString = paramsArray.join("&");
        updatedQueryString = `?${updatedQueryString}`

    return updatedQueryString;
  }

  // --- Para la paginacion table 1 Pendientes
  const handlePaginationChangePendiente = async (pageInfo: { currentPage: number; rowsPerPage: number }) => {

    let filterAll = '';
    const { currentPage, rowsPerPage } = pageInfo;
    setNroPagina(currentPage);
    setNroFilasPagina(rowsPerPage);

    const cleanString = filtrosToPaginate.replace("?", "");
    const paramsArray = cleanString.split("&");

    const filtrosPaginateDo = convertirNewTextFiltros(paramsArray,currentPage,rowsPerPage);

    setFiltroOnlyOneFunction(filtrosPaginateDo); // solo para funciones de aceptar y rechazar

    setIsLoadingPendientes(true);
    setBandLimpiarPendientes(false);
    const { dataTable, nroTotalRows } = await dataRequerimiento.getDataByfiltersHeader(filtrosPaginateDo);
    setTotalDataToTablePendientes(nroTotalRows);
    setDataToTablePendientes(dataTable);
    setIsLoadingPendientes(false);
  }

  const handleInputChangePendientes = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormValuesPendientes({
      ...formValuesPendientes,
      [name]: value,
    });
  };

  // -- Para los checkbox

  const onChangeCheckSelected = (selectedRows: string[]) => {
    serIdsRowsSelected(selectedRows)
  }
  // ---- Para las funciones que vienen desde la cabecera Pendiente Aceptar / Rechazar
  const onAceptarRequirementPend = (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de aprobar este requerimiento?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const dataId = [id];
        try {
          const aceptarData = await dataSolicitud.postValidarRequeriment(dataId);
          if (aceptarData?.status == 200) {
            await showAlert("¡Éxito!", `<b>${aceptarData.data.message}</b>`, "success");
            await reloadTable();
          }
        } catch (error) {
          console.log(error);
        }

      }
    });

  }

  const onRechazarRequirementPend = (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de rechazar este requerimiento?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const dataId = [id];
        try {
          const rechazarData = await dataSolicitud.postRechazarRequeriment(dataId);
          if (rechazarData?.status == 200) {
            await showAlert("¡Éxito!", `<b>${rechazarData.data.message}</b>`, "success");
            await reloadTable();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  const { headers, dataReturn, filtersHeaders, limpiezaFiltrosPendientes } = useHeaders(onAceptarRequirementPend, onRechazarRequirementPend);


  const lstPendienteAprobar = async () => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de aprobar los requerimientos seleccionados?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {

          if (idsRowsSelected.length > 0) {

            const aceptarData = await dataSolicitud.postValidarRequeriment(idsRowsSelected);
            if (aceptarData?.status == 200) {
              await showAlert("¡Éxito!", `<b>${aceptarData.data.message}</b>`, "success");
              await handleLimpiarPendientesBtn();

            }
          } else {
            const mssg = `<b>Para realizar la acción se nesecita al menos una fila seleccionada.</b>`;
            showAlert("¡Atención!", mssg, "error");
          }
        } catch (error) {
          console.log(error);
        }

      }
    });
  }

  const lstPendienteRechazar = () => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de rechazar los requerimientos seleccionados?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {

          if (idsRowsSelected.length > 0) {
            const rechazarData = await dataSolicitud.postRechazarRequeriment(idsRowsSelected);
            if (rechazarData?.status == 200) {
              await showAlert("¡Éxito!", `<b>${rechazarData.data.message}</b>`, "success");
              await handleLimpiarPendientesBtn();
            }

          } else {
            const mssg = `<b>Para realizar la acción se nesecita al menos una fila seleccionada.</b>`;
            showAlert("¡Atención!", mssg, "error");
          }

        } catch (error) {
          console.log(error);
        }

      }
    });
  }

  const handleFiltrarPendientesBusqueda = async () => {


    if (!formValuesPendientes.tipo && !formValuesPendientes.fechaInicio && !formValuesPendientes.fechaFin) {
      const mssg = `<b>Para realizar la búsqueda, se necesita seleccionar al menos un filtro de búsqueda (Tipo o Fechas).</b>`;
      showAlert("¡Atención!", mssg, "error");
      return false;
    }

    // Si alguna de las dos fechas está llena, la otra también debe estarlo
    if (formValuesPendientes.fechaInicio || formValuesPendientes.fechaFin) {
      if (!formValuesPendientes.fechaInicio || !formValuesPendientes.fechaFin) {
        const mssg = `<b>Es necesario seleccionar tanto la Fecha de Inicio como la Fecha Final.</b>`;
        showAlert("¡Atención!", mssg, "error");
        return false;
      }

      // Validar que la Fecha de Inicio no sea mayor que la Fecha Final
      if (formValuesPendientes.fechaInicio > formValuesPendientes.fechaFin) {
        const mssg = `<b>La Fecha Final debe ser mayor o igual a la Fecha de Inicio.</b>`;
        showAlert("¡Atención!", mssg, "error");
        return false;
      }
    }

    // -- filtros 
    let filtroTotal = `?type=${formValuesPendientes.tipo}&page=1&pageSize=5`;

    let filtroToExportar = {
      type: formValuesPendientes.tipo
    };

    if (formValuesPendientes.fechaInicio < formValuesPendientes.fechaFin) {

      filtroTotal = `?startDate=${formValuesPendientes.fechaInicio}&endDate=${formValuesPendientes.fechaFin}&type=${formValuesPendientes.tipo}&page=1&pageSize=5`

      filtroToExportar = {
        startDate: formValuesPendientes.fechaInicio,
        endDate: formValuesPendientes.fechaFin,
        type: formValuesPendientes.tipo,
      };
    }

    setFiltrosToReportPend(filtroToExportar);

    try {
      setIsLoadingPendientes(true);
      setBandLimpiarPendientes(false);

      setExecuteLoadDataPend(false);
      limpiezaFiltrosPendientes();

      // const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeader(filtroTotal);
      setFiltrosToPaginate(filtroTotal);
      setFiltroOnlyOneFunction(filtroTotal); // solo para aceptar y rechazar


      const { dataTable = [], nroTotalRows } = (await dataSolicitud.getDataByfiltersHeader(filtroTotal)) || {};
      setTotalDataToTablePendientes(nroTotalRows);
      setDataToTablePendientes(dataTable);
    } catch (error) {
      console.error('Error al filtrar pendientes:', error);
      setDataToTablePendientes([]);
    } finally {
      setIsLoadingPendientes(false);
    }
  };


  const handleLimpiarPendientes = async (filtrosMainPend: string) => {

    try {

      const filterAll = `?page=1&pageSize=5${filtrosMainPend}`;
      setIsLoadingPendientes(true);
      setBandLimpiarPendientes(true);
      setExecuteLoadDataPend(true);

      setFiltrosToPaginate(filterAll);
      setFiltroOnlyOneFunction(filterAll); // solo para los casos de aceptar y rechazar

      const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeader(filterAll);

      setTotalDataToTablePendientes(nroTotalRows);
      setDataToTablePendientes(dataTable);
      setIsLoadingPendientes(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleLimpiarPendientesBtn = () => {

    try {
      setFormValuesPendientes({
        fechaInicio: '',
        fechaFin: '',
        tipo: 'normal',
      });

      limpiezaFiltrosPendientes();
      setExecuteLoadDataPend(true);
      setFiltrosCabeceraPendiente({});
      setFiltrosToReportPend([])
      setFiltroFormMainPend('');
      setFiltrosToPaginate('');
      setFiltroOnlyOneFunction(''); // solo para los casos de aceptar y rechazar


    } catch (error) {
      console.log(error);
    }
  };

  const reloadTable = async () => {

    try {
      
      setIsLoadingPendientes(true);
      setBandLimpiarPendientes(true);
      setExecuteLoadDataPend(true);

      // setFiltrosToPaginate(filtroOnlyOneFunction);

      const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeader(filtroOnlyOneFunction);

      setTotalDataToTablePendientes(nroTotalRows);
      setDataToTablePendientes(dataTable);
      setIsLoadingPendientes(false);

    } catch (error) {
      console.log(error);
    }
  };


  // -----------------------------------

  // =================================================================

  // -- Para los filtros de los VERIFICADOOOOSSSS!!  ==========================

  const handleFiltrarVerificados = async () => {

    if (!formValuesVerificados.estado && !formValuesVerificados.fechaInicio && !formValuesVerificados.fechaFin) {
      const mssg = `<b>Para realizar la búsqueda, se necesita seleccionar al menos un filtro de búsqueda (Tipo o Fechas).</b>`;
      showAlert("¡Atención!", mssg, "error");
      return false;
    }

    // Si alguna de las dos fechas está llena, la otra también debe estarlo
    if (formValuesVerificados.fechaInicio || formValuesVerificados.fechaFin) {
      if (!formValuesVerificados.fechaInicio || !formValuesVerificados.fechaFin) {
        const mssg = `<b>Es necesario seleccionar tanto la Fecha de Inicio como la Fecha Final.</b>`;
        showAlert("¡Atención!", mssg, "error");
        return false;
      }

      // Validar que la Fecha de Inicio no sea mayor que la Fecha Final
      if (formValuesVerificados.fechaInicio > formValuesVerificados.fechaFin) {
        const mssg = `<b>La Fecha Final debe ser mayor o igual a la Fecha de Inicio.</b>`;
        showAlert("¡Atención!", mssg, "error");
        return false;
      }
    }

    // -- filtros 
    let filtroTotal = `?approved=${formValuesVerificados.estado}&page=1&pageSize=5`;

    let filtroToExportar = {
      approved: formValuesVerificados.estado
    };

    if (formValuesVerificados.fechaInicio < formValuesVerificados.fechaFin) {
      filtroTotal = `?startDate=${formValuesVerificados.fechaInicio}&endDate=${formValuesVerificados.fechaFin}&approved=${formValuesVerificados.estado}&page=1&pageSize=5`

      filtroToExportar = {
        startDate: formValuesVerificados.fechaInicio,
        endDate: formValuesVerificados.fechaFin,
        approved: formValuesVerificados.estado,
      };
    }
    setFiltrosToReport(filtroToExportar);

    try {

      setIsLoadingVerificados(true);
      setBandLimpiarVerificado(false);
      setExecuteLoadData(false);
      limpiezaFiltros();

      const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeaderVerificados(filtroTotal);

      setTotalDataToTableVerificados(nroTotalRows);
      setDataToTableVerificados(dataTable);
    } catch (error) {
      console.error('Error al filtrar pendientes:', error);
      setDataToTableVerificados([]);
    } finally {
      setIsLoadingVerificados(false);

    }

  };

  const handleLimpiarVerificados = async (filtrosMain: string) => {

    try {

      const filterAll = `?page=1&pageSize=5${filtrosMain}`;
      setIsLoadingVerificados(true);
      setBandLimpiarVerificado(true);
      setExecuteLoadData(true);

      const { dataTable, nroTotalRows } = await dataSolicitud.getDataByfiltersHeaderVerificados(filterAll);

      setTotalDataToTableVerificados(nroTotalRows);
      setDataToTableVerificados(dataTable);
      setIsLoadingVerificados(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleLimpiarVerificadosBtn = () => {

    try {
      setFormValuesVerificados({
        fechaInicio: '',
        fechaFin: '',
        estado: '1',
      });

      limpiezaFiltros();
      setExecuteLoadData(true);
      setFiltrosToReport([]);
      setFiltrosCabeceraVerificado({});
      setFiltroFormMain('');

    } catch (error) {
      console.log(error);
    }
  };

  const lstVerificadoAprobar = () => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de aprobar los requerimientos seleccionados?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {

          if (idsRowsSelected.length > 0) {

            const aceptarData = await dataSolicitud.postValidarRequeriment(idsRowsSelectedVeri);
            if (aceptarData?.status == 200) {
              await showAlert("¡Éxito!", `<b>${aceptarData.data.message}</b>`, "success");
              await handleLimpiarVerificados();

            }
          } else {
            const mssg = `<b>Para realizar la acción se nesecita al menos una fila seleccionada.</b>`;
            showAlert("¡Atención!", mssg, "error");
          }
        } catch (error) {
          console.log(error);
        }

      }
    });
  }

  const lstVerificadoRechazar = () => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de rechazar los requerimientos seleccionados?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {

          if (idsRowsSelected.length > 0) {
            const rechazarData = await dataSolicitud.postRechazarRequeriment(idsRowsSelectedVeri);
            if (rechazarData?.status == 200) {
              await showAlert("¡Éxito!", `<b>${rechazarData.data.message}</b>`, "success");
              await handleLimpiarVerificados();
            }

          } else {
            const mssg = `<b>Para realizar la acción se nesecita al menos una fila seleccionada.</b>`;
            showAlert("¡Atención!", mssg, "error");
          }

        } catch (error) {
          console.log(error);
        }

      }
    });

  }

  const onAceptarVericado = (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de aprobar este requerimiento?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const dataId = [id];
        try {
          const aceptarData = await dataSolicitud.postValidarRequeriment(dataId);
          if (aceptarData?.status == 200) {
            await showAlert("¡Éxito!", `<b>${aceptarData.data.message}</b>`, "success");
            await handleLimpiarVerificados();
          }
        } catch (error) {
          console.log(error);
        }

      }
    });
  }

  const onRechazarVerificado = (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de rechazar este requerimiento?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const dataId = [id];
        try {
          const rechazarData = await dataSolicitud.postRechazarRequeriment(dataId);
          if (rechazarData?.status == 200) {
            await showAlert("¡Éxito!", `<b>${rechazarData.data.message}</b>`, "success");
            await handleLimpiarVerificados();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });


  }

  const onEliminarVerificado = (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Está seguro de eliminar este requerimiento?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteReq = await dataSolicitud.deleteRequeriment(id);
          if (deleteReq?.status == 200) {
            await showAlert("¡Éxito!", `<b>${deleteReq.data.message}</b>`, "success");
            await handleLimpiarVerificados();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

  }


  const { headersSecond, dataReturnSecond, filtersHeadersSecond, limpiezaFiltros } = useHeadersSecondTable(onAceptarVericado, onRechazarVerificado, onEliminarVerificado);

  const onChangeCheckSelectedVerificados = (selectedRows: string[]) => {
    serIdsRowsSelectedVeri(selectedRows)
  }



  // ============================================================================

  // -- interaccion con las cabeceras

  useEffect(() => {

    setBackPageOne((index) => index + 1);
    const fetchDataPendiente = async () => {

      setIsLoadingPendientes(true);
      setFiltrosCabeceraPendiente(filtersHeaders);
      setBandLimpiarPendientes(false);
      let filtroTotal = '';

      if (filtersHeaders && typeof filtersHeaders === 'string') {
        try {
          // console.log(JSON.parse(headers));
          const filtros = JSON.parse(filtersHeaders);
          const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');

          // -- agregamos los filtros superiores
          let queryStringFiltro = '';
          if (Object.keys(filtrosToReportPend).length > 0) {
            queryStringFiltro = Object.entries(filtrosToReportPend)
              .map(([key, value]) => `${key}=${value}`)
              .join('&');
            queryStringFiltro = `&${queryStringFiltro}`;
            setFiltroFormMainPend(queryStringFiltro);
            setExecuteLoadDataPend(true);
          }


          filtroTotal = `?${concatHeaderFiltros}${queryStringFiltro}&page=1&pageSize=5`;
        } catch (error) {
          console.log('Error al parsear:', error);
        }
      } else if (filtersHeaders) {
        // -- no hay filtro de cabecera seleccionado
        filtroTotal = `?page=1&pageSize=5`;
      }

      // -- si hay filtros de arriba
      if (filtroTextosIni.length > 0) {
        filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
      }

      setFiltrosToPaginate(filtroTotal);
      setFiltroOnlyOneFunction(filtroTotal); // solo para los casos de aceptar y rechazar
      const { dataTable = [], nroTotalRows = 0 } = (await dataRequerimiento.getDataByfiltersHeader(filtroTotal)) || {};
      setTotalDataToTablePendientes(nroTotalRows);
      setDataToTablePendientes(dataTable);
      setIsLoadingPendientes(false);
    }

    // -- validamos envio de solicitud a la api
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (Object.keys(filtersHeaders).length > 0) {
        fetchDataPendiente();
      } else {

        if (executeLoadDataPend) {
          handleLimpiarPendientes(filtrosFormMainPend);
        }
      }
    }
  }, [filtersHeaders]);

  useEffect(() => {
    console.log(filtersHeadersSecond)
    const fetchDataVerificado = async () => {
      setIsLoadingVerificados(true);
      setFiltrosCabeceraVerificado(filtersHeadersSecond);
      setBandLimpiarVerificado(false);
      let filtroTotal = '';
      if (filtersHeadersSecond && typeof filtersHeadersSecond === 'string') {
        try {
          // console.log(JSON.parse(headers));
          const filtros = JSON.parse(filtersHeadersSecond);
          const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');

          // -- agregamos los filtros superiores
          let queryStringFiltro = '';
          if (Object.keys(filtrosToReport).length > 0) {
            queryStringFiltro = Object.entries(filtrosToReport)
              .map(([key, value]) => `${key}=${value}`)
              .join('&');
            queryStringFiltro = `&${queryStringFiltro}`;
            setFiltroFormMain(queryStringFiltro);
            setExecuteLoadData(true);
          }

          filtroTotal = `?${concatHeaderFiltros}${queryStringFiltro}&page=1&pageSize=5`;
        } catch (error) {
          console.log('Error al parsear:', error);
        }
      } else if (filtersHeadersSecond) {
        // -- no hay filtro de cabecera seleccionado
        filtroTotal = `?page=1&pageSize=5`;
      }

      // -- si hay filtros de arriba
      if (filtroTextosIni.length > 0) {
        filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
      }

      // const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);
      console.log(filtroTotal)

      const { dataTable = [], nroTotalRows = 0 } = (await dataSolicitud.getDataByfiltersHeaderVerificados(filtroTotal)) || {};

      setTotalDataToTableVerificados(nroTotalRows);
      setDataToTableVerificados(dataTable);
      setIsLoadingVerificados(false);
    }

    // -- validamos envio de solicitud a la api
    if (isFirstRenderVerificado.current) {
      isFirstRenderVerificado.current = false;
    } else {
      if (Object.keys(filtersHeadersSecond).length > 0) {
        fetchDataVerificado();
      } else {
        if (executeLoadData) {
          console.log(filtrosFormMain)
          handleLimpiarVerificados(filtrosFormMain);
        }
      }
    }

  }, [filtersHeadersSecond]);

  // --- Para realizar la descarga del reporte 

  const downloadReporteReq = async () => {

    if (Object.keys(filtersHeadersSecond).length == 0 && Object.keys(filtrosToReport).length == 0) {
      const mssg = `<b>Debe tener al menos algun filtro seleccionado</b>`;
      showAlert("¡Atención!", mssg, "warning");
      return;
    }

    const filtros = typeof filtersHeadersSecond === 'string'
      ? JSON.parse(filtersHeadersSecond)
      : (Array.isArray(filtersHeadersSecond) ? filtersHeadersSecond : []);

    let combined;
    // Validar que filtros tenga datos antes de combinar
    if (!Array.isArray(filtros) || filtros.length === 0) {
      combined = { ...filtrosToReport };
    } else {
      combined = { ...filtrosToReport };
      filtros.forEach(item => {
        combined[item.field] = item.value;
      });

    }

    const queryString = Object.entries(combined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const devolverFiltrosReporte = `?${queryString}`;

    try {

      const getReporte = await dataSolicitud.getReporteVerificados(devolverFiltrosReporte);

      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([getReporte.data]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', 'reporte_verificados.xlsx');

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al descargar el reporte:', error);
      showAlert("Error", "No se pudo descargar el reporte", "error");
    }

    return devolverFiltrosReporte;
  }


  return (
    <>
      <Box sx={{ mt: 2 }}>
        <CabeceraPage isWithBackground={false} objData={objData} />
      </Box>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pestañas básicas"
          TabIndicatorProps={{
            style: {
              backgroundColor: themePalette.BG_COLOR_WEAK_ORANGE
            }
          }}
        >
          <Tab
            label="Pendientes"
            {...a11yProps(0)}
            sx={{
              color: value === 0 ? themePalette.BG_COLOR_WEAK_ORANGE : 'inherit',
              '&.Mui-selected': {
                color: themePalette.BG_COLOR_WEAK_ORANGE,
              },
            }}
          />
          <Tab
            label="Verificados"
            {...a11yProps(1)}
            sx={{
              color: value === 1 ? themePalette.BG_COLOR_WEAK_ORANGE : 'inherit',
              '&.Mui-selected': {
                color: themePalette.BG_COLOR_WEAK_ORANGE,
              },
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="fechaInicio" style={{ marginBottom: '4px' }}>Inicio</label>
              <TextField
                fullWidth
                size="small"
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={formValuesPendientes.fechaInicio}
                onChange={handleInputChangePendientes}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="fechaFin" style={{ marginBottom: '4px' }}>Fin</label>
              <TextField
                fullWidth
                size="small"
                id="fechaFin"
                name="fechaFin"
                type="date"
                value={formValuesPendientes.fechaFin}
                onChange={handleInputChangePendientes}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="tipo" style={{ marginBottom: '4px' }}>Tipo</label>
              <Select
                fullWidth
                id="tipo"
                name="tipo"
                value={formValuesPendientes.tipo}
                onChange={handleInputChangePendientes}
                size="small"
                sx={{ width: '100%' }}
              >
                <MenuItem value="emergencia">Emergencia</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={3} md={4} gap={2} display='flex' justifyContent='center' sx={{ mt: 3 }}>
              <Button variant="btnPrimeroCustomInvertNormal" fullWidth onClick={handleLimpiarPendientesBtn}>
                <ReplayIcon />
                Limpiar
              </Button>
              <Button variant="btnPrimeroCustomNormal" fullWidth onClick={handleFiltrarPendientesBusqueda}>
                <SearchIcon />
                Filtrar
              </Button>
            </Grid>
            <Grid container display="flex" gap={2} sx={{ mt: 3, ml: 3, justifyContent: { xs: 'center', md: 'start' } }}>
              <Button
                fullWidth
                variant="btnPrimeroCustomNormal"
                color="primary"
                onClick={lstPendienteAprobar}
              >
                <TaskAltIcon sx={{ mr: 1 }} /> APROBAR
              </Button>
              <Button
                fullWidth
                variant="btnPrimeroCustomInvertNormal"
                onClick={lstPendienteRechazar}
              >
                <HighlightOffIcon sx={{ mr: 1 }} /> RECHAZAR
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <DataTable
              headers={headers}
              dataRows={dataToTablePendientes}
              haveCheckbox={true}
              haveCollapse={true}
              isloading={isLoadingPendientes}
              totalRows={totalDataToTablePendientes}
              onPaginationChange={handlePaginationChangePendiente}
              onRowSelectionChange={onChangeCheckSelected}
              doClear={bandLimpiarPendientes}
              changePage={backPageOne}
            />
          </Grid>
        </Grid>


      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="fechaInicio" style={{ marginBottom: '4px' }}>Inicio</label>
              <TextField
                fullWidth
                size="small"
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={formValuesVerificados.fechaInicio}
                onChange={handleInputChangeVerificados}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="fechaFin" style={{ marginBottom: '4px' }}>Fin</label>
              <TextField
                fullWidth
                size="small"
                id="fechaFin"
                name="fechaFin"
                type="date"
                value={formValuesVerificados.fechaFin}
                onChange={handleInputChangeVerificados}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <label htmlFor="estado" style={{ marginBottom: '4px' }}>Estado</label>
              <Select
                fullWidth
                id="estado"
                name="estado"
                value={formValuesVerificados.estado}
                onChange={handleInputChangeVerificados}
                size="small"
                sx={{ width: '100%' }}
              >
                <MenuItem value="1">Aprobado</MenuItem>
                <MenuItem value="0">Rechazado</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={3} md={4} gap={2} display='flex' justifyContent='center'
              sx={{
                padding: { xs: 2 },
                overflowX: { xs: 'auto', md: 'unset' },
                whiteSpace: 'nowrap',
                maxWidth: { xs: '100vw', md: 'none' },
                mt: 3
              }}
            >
              <Button variant="btnPrimeroCustomInvertNormal" fullWidth onClick={handleLimpiarVerificadosBtn}>
                <ReplayIcon />
                Limpiar
              </Button>
              <Button variant="btnPrimeroCustomNormal" fullWidth onClick={handleFiltrarVerificados}>
                <SearchIcon />
                Filtrar
              </Button>
            </Grid>


            <Grid container display="flex" sx={{ mt: 3, ml: 3, justifyContent: { xs: 'center', md: 'start' } }}>

              <Grid item xs={6} >
                <Button
                  fullWidth
                  variant="btnPrimeroCustomNormal"
                  color="primary"
                  onClick={lstVerificadoAprobar}
                  sx={{ mr: 3 }}
                >
                  <TaskAltIcon sx={{ mr: 1 }} /> APROBAR
                </Button>
                <Button
                  fullWidth
                  variant="btnPrimeroCustomInvertNormal"
                  onClick={lstVerificadoRechazar}
                >
                  <HighlightOffIcon sx={{ mr: 1 }} /> RECHAZAR
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ justifyContent: 'end', textAlign: 'end' }}>
                <Button variant="btnPrimeroCustomNormal" fullWidth onClick={downloadReporteReq}>
                  <DownloadIcon />
                  Excel
                </Button>
              </Grid>

            </Grid>

          </Grid>
        </Box>

        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <DataTable
              headers={headersSecond}
              dataRows={dataToTableVerificados}
              haveCheckbox={true}
              haveCollapse={true}
              isloading={isLoadingVerificados}
              totalRows={totalDataToTableVerificados}
              onPaginationChange={handlePaginationChangeVerificado}
              onRowSelectionChange={onChangeCheckSelectedVerificados}
              doClear={bandLimpiarVerificado}
            />
          </Grid>
        </Grid>

      </TabPanel>
    </>
  );
}