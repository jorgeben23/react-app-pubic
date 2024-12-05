import React, { useEffect, useState } from 'react';
import CabeceraPage from '../../../../components/CabeceraPage';
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import DataTable from '../../../../components/TableComponent';
import { useHeaders } from './TableStructure/headers';
import { baseData } from './../../../../api/base/baseData';
import SettingModalUser from './Components/ModalUser';
import { CustomSweetAlert } from '../../../../config/Theme.config';


export const Gestion: React.FC = () => {

  const [dataToTable, setDataToTable] = useState([]);
  const [totalDataToTable, setTotalDataToTable] = useState(0);
  const [idUserToModal, setidUserToModal] = useState('');
  const [documentUserToModal, setDocumentUserToModal] = useState('');
  const [openModalUser, setOpenModalUser] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);

  // -- Variables para filtros totales
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [nroFilasPagina, setNroFilasPagina] = useState<number>(5);
  const [filtrosCabecera, setFiltrosCabecera] = useState({});
  const [filtroTextosIni, setFiltroTextosIni] = useState('');

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


  const handleEdit = async (idEmployee: string, document: string) => {
    try {
      setidUserToModal(idEmployee);
      setDocumentUserToModal(document);
      setOpenModalUser(true);
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setOpenModalUser(false);
  }

  const onInactivar = async (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Desea Inactivar a este usuario?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Entendido",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const actualizar = await baseData.patchInactivarUser(id);
        if (actualizar?.status == 200) {
          await showAlert("¡Éxito!", `<b>${actualizar.data.message}</b>`, "success");
          await refreshTableData();
        } else {
          showAlert("¡Error!", "<b>No se realizo la acción solicitada</b>", "error");
        }
      }
    });

  }

  const onActivar = async (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Desea Activar a este usuario?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Entendido",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const actualizar = await baseData.patchActivarUser(id);
        if (actualizar?.status == 200) {
          await showAlert("¡Éxito!", `<b>${actualizar.data.message}</b>`, "success");
          await refreshTableData();
        } else {
          showAlert("¡Error!", "<b>No se realizo la acción solicitada</b>", "error");
        }
      }
    });

  }



  const { headers, dataReturn, filtersHeaders } = useHeaders(handleEdit, onActivar, onInactivar);


  const [formValues, setFormValues] = useState({
    ident: '',
    costos: ''
  });

  const handleChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const refreshTableData = async () => {
    try {
      setIsloading(true);
      let filtroTotal = '';

      // Construir el filtro basado en los filtros de cabecera
      if (filtersHeaders && typeof filtersHeaders === 'string') {
        const filtros = JSON.parse(filtersHeaders);
        const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');
        filtroTotal = `?${concatHeaderFiltros}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
      } else {
        filtroTotal = `?page=${nroPagina}&pageSize=${nroFilasPagina}`;
      }

      // Agregar filtros de texto si existen
      if (filtroTextosIni.length > 0) {
        filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
      }

      const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };



  const handleFilter = async () => {

    let filtrosTotales = '';
    let filtrosToInteractPagination = '';
    if (formValues.ident == '' && formValues.costos == '') {
      showAlert(`¡Atención!`, `<b>Debe seleccionar al menos uno de los filtros para realizar la busqueda.<b>`, "warning");
      return false;
    }

    try {

      if (formValues.ident.length > 0 && formValues.costos.length == 0) {
        filtrosTotales = `?searchText=${formValues.ident}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
        filtrosToInteractPagination = `?searchText=${formValues.ident}`;
      }

      if (formValues.ident.length == 0 && formValues.costos.length > 0) {
        filtrosTotales = `?costCenterName=${formValues.costos}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
        filtrosToInteractPagination = `?costCenterName=${formValues.costos}`;
      }

      if (formValues.ident.length > 0 && formValues.costos.length > 0) {
        filtrosTotales = `?searchText=${formValues.ident}&costCenterName=${formValues.costos}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
        filtrosToInteractPagination = `?searchText=${formValues.ident}&costCenterName=${formValues.costos}`;
      }

      setFiltroTextosIni(filtrosToInteractPagination);

      setIsloading(true);
      const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtrosTotales);

      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);

    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false);
    }

  };

  const handleClear = async () => {
    setFormValues({
      ident: '',
      costos: ''
    });

    try {

      setFiltroTextosIni('');
      const filtroTotal = `?page=${nroPagina}&pageSize=${nroFilasPagina}`;

      setIsloading(true);
      const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);

    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }

  };

  const objData = {
    firstData: "Gestión Base",
    secondData: "Configura tu empresa"
  };





  // --- Para la paginacion 
  const handlePaginationChange = async (pageInfo: { currentPage: number; rowsPerPage: number }) => {

    let filterAll = '';
    const { currentPage, rowsPerPage } = pageInfo;
    setNroPagina(currentPage);
    setNroFilasPagina(rowsPerPage);

    if (Object.keys(filtrosCabecera).length > 0) {

      const filtrosHeaders = JSON.parse(filtrosCabecera);
      const concatfilter = filtrosHeaders.map(item => `${item.field}=${item.value}`).join('&');
      filterAll = `?${concatfilter}&page=${currentPage}&pageSize=${rowsPerPage}`;

    } else {
      filterAll = `?page=${currentPage}&pageSize=${rowsPerPage}`;

    }

    // -- si hay filtros de arriba
    if (filtroTextosIni.length > 0) {
      filterAll = `${filtroTextosIni}&${filterAll.slice(1)}`;
    }

    setIsloading(true);
    const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filterAll);

    setTotalDataToTable(nroTotalRows);
    setDataToTable(dataTable);
    setIsloading(false);
  }


  // -- interaccion con las cabeceras

  useEffect(() => {

    const fetchData = async () => {

      setIsloading(true);
      setFiltrosCabecera(filtersHeaders);
      let filtroTotal = '';

      if (filtersHeaders && typeof filtersHeaders === 'string') {
        try {
          // console.log(JSON.parse(filtersHeaders));
          const filtros = JSON.parse(filtersHeaders);
          const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');
          filtroTotal = `?${concatHeaderFiltros}&page=1&pageSize=5`;
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

      // const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);

      const { dataTable = [], nroTotalRows = 0 } = (await baseData.getDataByfiltersHeader(filtroTotal)) || {};

      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
      setIsloading(false);
    }

    fetchData();

  }, [filtersHeaders]);


  return (
    <>
      <Box sx={{ mt: 2 }}>
        <CabeceraPage isWithBackground={false} objData={objData} />
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={3} md={3} sx={{ padding: 3 }}>
          <Box sx={{ ml: 3 }}>
            <label htmlFor="ident" >DNI, Nombre o código</label>
            <TextField
              id="ident"
              value={formValues.ident}
              onChange={(e) => handleChange('ident', e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} md={3} >
          <Box sx={{ justifyContent: 'center', pl: 3, pr: 3 }}>
            <label htmlFor="costos" >Centro de costos</label>
            <TextField
              id="costos"
              value={formValues.costos}
              onChange={(e) => handleChange('costos', e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} sx={{ textAlign: 'center', justifyContent: 'center' }} >
          <Box sx={{
            display: 'flex', gap: 2,
            justifyContent: { xs: 'center', md: 'start' },
            alignItems: 'center', mt: 3
          }}>
            <Button variant="btnPrimeroCustomNormal" onClick={handleFilter}>
              <SearchIcon />
              Filtrar
            </Button>
            <Button variant="btnPrimeroCustomInvertNormal" onClick={handleClear}>
              <ReplayIcon />
              Limpiar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <DataTable
            headers={headers}
            dataRows={dataToTable}
            haveCheckbox={false}
            haveCollapse={false}
            isloading={isloading}
            totalRows={totalDataToTable}
            onPaginationChange={handlePaginationChange}
          />
        </Grid>
      </Grid>

      <SettingModalUser openModal={openModalUser} IDuser={idUserToModal} document={documentUserToModal} refreshTableData={refreshTableData} onClose={closeModal} />


    </>
  );
};
