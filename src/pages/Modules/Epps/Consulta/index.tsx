import React, { useEffect, useState } from 'react';
import CabeceraPage from '../../../../components/CabeceraPage';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import AsyncSelect from 'react-select/async';
import { reactSelectStyles } from './../../../../styles/Fields/reactSelectStyles';
import DataTable from '../../../../components/TableComponent';
import { useHeaders } from './TableStructure/headers';
import { consultaData } from './../../../../api/consultas/consultasData';
import { CustomSweetAlert } from '../../../../config/Theme.config';

const objData = {
  firstData: "EPP",
  secondData: "Saldo de EPP"
};

export interface dataOption {
  value: number;
  label: string;
}

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

const loadOptions = async (inputValue: string, type: 'centro' | 'almacen', centroId?: string) => {

  if (inputValue.length < 4) {
    return [];
  }

  try {
    if (type === 'centro') {
      const dataCentro = await consultaData.getGeographicsCenter(inputValue);
      return dataCentro
        .map(centro => ({
          value: centro.idGeographicCenter,
          label: centro.name,
        }));
    }

    if (type === 'almacen' && centroId) {

      const dataAlmacen = await consultaData.getWharehouseByGeographicsCenterId(inputValue, centroId);
  
      return dataAlmacen
      .map(almacen => ({
        value: almacen.idStore,
        label: almacen.name,
      }));

    }
  } catch (error) {
    console.error("Error al obtener opciones:", error);
    return [];
  }
};

export const Consulta: React.FC = () => {

  const { headers, dataReturn, filtersHeaders } = useHeaders();
  const [selectedCentro, setSelectedCentro] = useState<dataOption | null>(null);
  const [selectedAlmacen, setSelectedAlmacen] = useState<dataOption | null>(null);
  const [dataToTable, setDataToTable] = useState([]);
  const [totalDataToTable, setTotalDataToTable] = useState(0);
  const [isloading, setIsloading] = useState<boolean>(false);

  // -- Variables para filtros totales
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [nroFilasPagina, setNroFilasPagina] = useState<number>(5);
  const [filtrosCabecera, setFiltrosCabecera] = useState({});
  const [filtroTextosIni, setFiltroTextosIni] = useState('');


  const loadDataConsulta = async () => {
    if (selectedCentro || selectedAlmacen) {

      try {

        let filtrosTotales = '';
        let filtrosToInteractPagination = '';

        if (selectedCentro != null && selectedAlmacen == null) {
          filtrosTotales = `?idGeographicCenter=${selectedCentro.value}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
          filtrosToInteractPagination = `?idGeographicCenter=${selectedCentro.value}`;
        }

        if (selectedCentro != null && selectedAlmacen != null) {
          filtrosTotales = `?idGeographicCenter=${selectedCentro.value}&idStore=${selectedAlmacen.value}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
          filtrosToInteractPagination = `?idGeographicCenter=${selectedCentro.value}&idStore=${selectedAlmacen.value}`;
        }
        setFiltroTextosIni(filtrosToInteractPagination);
        setIsloading(true);
        const { dataTable, nroTotalRows } = await consultaData.getDataByfiltersHeader(filtrosTotales);

        setTotalDataToTable(nroTotalRows);
        setDataToTable(dataTable);

      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }

    } else {
      showAlert("¡Atención!", `<b>Tiene que seleccionar un Centro Geográfico</b>`, "warning");
      return false;
    }
  };

  const ClearFiltersConsulta = async () => {
    setSelectedCentro(null);
    setSelectedAlmacen(null);
    try {

      setFiltroTextosIni('');
      const filtroTotal = `?page=${nroPagina}&pageSize=${nroFilasPagina}`;

      setIsloading(true);
      const { dataTable, nroTotalRows } = await consultaData.getDataByfiltersHeader(filtroTotal);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleCentroChange = async (option: dataOption | null) => {
    setSelectedCentro(option);
    setSelectedAlmacen(null);  // Limpiamos Almacén cuando cambie Centro
  };

  // ==============================================================================================
  // ---- Para todo los que interactua con la tabla ---------------------------------

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
    const { dataTable, nroTotalRows } = await consultaData.getDataByfiltersHeader(filterAll);

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
          console.log(JSON.parse(filtersHeaders));
          const filtros = JSON.parse(filtersHeaders);
          const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');
          filtroTotal = `?${concatHeaderFiltros}&page=${nroPagina}&pageSize=${nroFilasPagina}`;
        } catch (error) {
          console.log('Error al parsear:', error);
        }
      } else if (filtersHeaders) {
        // -- no hay filtro de cabecera seleccionado
        filtroTotal = `?page=${nroPagina}&pageSize=${nroFilasPagina}`;
      }

      // -- si hay filtros de arriba
      if (filtroTextosIni.length > 0) {
        filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
      }

      const { dataTable, nroTotalRows } = await consultaData.getDataByfiltersHeader(filtroTotal);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
      setIsloading(false);
    }

    fetchData();

  }, [filtersHeaders]);


  // ==============================================================================================

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <CabeceraPage isWithBackground={false} objData={objData} />
      </Box>

      <Grid container spacing={2} sx={{ mt: 3, paddingLeft: { xs: 0, md: 3 } }}>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label htmlFor="centro-geografico" style={{ marginBottom: '4px' }}>Centro Geográfico</label>
          <AsyncSelect
            id='centro-geografico'
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'centro')}
            placeholder="Seleccione una opción"
            styles={reactSelectStyles}
            value={selectedCentro}
            onChange={handleCentroChange}
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
        </Grid>

        <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label htmlFor="almacen" style={{ marginBottom: '4px' }}>Almacén</label>
          <AsyncSelect
            id='almacen'
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'almacen', selectedCentro?.value)}
            placeholder="Seleccione una opción"
            styles={reactSelectStyles}
            value={selectedAlmacen}
            onChange={setSelectedAlmacen}
            noOptionsMessage={() => 'No hay opciones disponibles'}
            isDisabled={!selectedCentro}
          />
        </Grid>

        <Grid item xs={12} sm={5} sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'start' }, mt: 3 }}>
          <Button
            variant="btnPrimeroCustomNormal"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={loadDataConsulta}
          >
            Filtrar
          </Button>

          <Button
            variant="btnPrimeroCustomInvertNormal"
            color="primary"
            startIcon={<ReplayIcon />}
            onClick={ClearFiltersConsulta}
          >
            Limpiar
          </Button>
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
    </>
  );
};
