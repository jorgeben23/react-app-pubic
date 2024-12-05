import React, { useEffect, useState } from 'react'
import CabeceraPage from '../../../../components/CabeceraPage';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import { CloudUpload, Add, PictureAsPdf } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import RightDrawer from './../../../../components/DrawerDerecho.tsx'
import DrawerImport from '../../../../components/DrawerImport.tsx';
import AsyncSelect from 'react-select/async';
import { reactSelectStyles } from './../../../../styles/Fields/reactSelectStyles.ts';
import DataTable from '../../../../components/TableComponent.tsx';
import { useHeaders } from './TableStructure/headers.tsx';
import DrawerEditMatriz from '../../../../components/DrawerEditMatriz.tsx';
import { matrizData } from '../../../../api/matriz/matrizData.ts';
import { CustomSweetAlert } from '../../../../config/Theme.config.tsx';
import ReplayIcon from '@mui/icons-material/Replay';

const objData = {
  firstData: "EPP",
  secondData: "Matrices de EPP"
};

interface dataOption {
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

export const Matriz: React.FC = () => {

  // -- funciones que se emiten desde el header
  const handleDelete = async (id: string) => {

    CustomSweetAlert.fire({
      title: '¡Atención!',
      html: `<b>¿Esta seguro que desea eliminar este registro?</b>`,
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí, sí deseo",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          const data = await matrizData.deleteMatrizById(id);
          await showAlert("¡Éxito!", `<b>${data.data.message}</b>`, "success");
          await ClearFiltersConsulta();
        } catch (error) {
          console.log(error);
        }

      }
    });
  };

  const handleEdit = (id: string) => {
    openModalEditarMatriz(id);
  };


  const { headers, dataReturn, filtersHeaders } = useHeaders(handleEdit, handleDelete);

  const [dataToTable, setDataToTable] = useState([]);
  const [totalDataToTable, setTotalDataToTable] = useState(0);
  const [openModalEpp, setopenModalEpp] = useState(false);
  const [openModalImp, setOpenModalImp] = useState(false);
  const [openModalEditMatriz, setOpenModalEditMatriz] = useState(false);
  const [areaOptions, setAreaOptions] = useState<dataOption[]>([]);
  const [departamentoOptions, setDepartamentoOptions] = useState<dataOption[]>([]);
  const [idRowMatrizEdit, setIdRowMatrizEdit] = useState(null);
  const [isloading, setIsloading] = useState<boolean>(false);

  // -- Variables para filtros totales
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [nroFilasPagina, setNroFilasPagina] = useState<number>(5);
  const [filtrosCabecera, setFiltrosCabecera] = useState({});
  const [filtroTextosIni, setFiltroTextosIni] = useState('');

  // -- Para limpieza

  const [ bandLimpiar , setBandLimpiar ] = useState<boolean>(false);




  const [formValues, setFormValues] = useState({
    puesto: null as dataOption | null,
    epp: null as dataOption | null,
    gerencia: null as dataOption | null,
    area: null as dataOption | null,
    departamento: null as dataOption | null,
  });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormValues(prevState => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSelectChange = (selectedOption: dataOption | null, fieldName: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: selectedOption,
    }));

    if (fieldName === 'gerencia' && selectedOption) {
      loadAreaData(selectedOption.value);
      setFormValues(prevState => ({ ...prevState, area: null, departamento: null }));
    }

    if (fieldName === 'area' && selectedOption) {
      loadDepartamentoData(selectedOption.value);
      setFormValues(prevState => ({ ...prevState, departamento: null }));
    }

    if (fieldName === 'gerencia' && !selectedOption) {
      setAreaOptions([]);
      setDepartamentoOptions([]);
      setFormValues(prevState => ({ ...prevState, area: null, departamento: null }));
    }

    if (fieldName === 'area' && !selectedOption) {
      setDepartamentoOptions([]);
      setFormValues(prevState => ({ ...prevState, departamento: null }));
    }
  };

  const openModalEditarMatriz = (id: string) => {
    setIdRowMatrizEdit(id);
    setOpenModalEditMatriz(true);

  }

  const loadOptions = async (inputValue: string, type: string) => {
    if (inputValue.length < 3) return [];

    let dataOptions = [];
    if (type === 'puesto') {
      const data = await matrizData.getOptionsPuesto(inputValue);
      dataOptions = data.map((item) => ({ value: item.idPosition, label: item.name }));
    }
    else if (type === 'epp') {
      const data = await matrizData.getOptionsEpps(inputValue);
      dataOptions = data.map((item) => ({ value: item.idEpp, label: item.name }));
    }
    else if (type === 'gerencia') {
      const data = await matrizData.getOptionsGerencia(inputValue);
      dataOptions = data.map((item) => ({ value: item.idOrganicStructure, label: item.name }));
    }
    else if (type === 'area') {
      const data = await matrizData.getOptionsArea(inputValue);
      dataOptions = data.filter(item => item.idParent == formValues.gerencia?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
    }
    else if (type === 'departamento') {
      const data = await matrizData.getOptionsDepartamento(inputValue);
      dataOptions = data.filter(item => item.idParent == formValues.area?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
    }

    return dataOptions;
  };


  const loadAreaData = async (gerenciaId: number) => {
    try {
      const dataAreas = await areaMatriz.getAreasByGerenciaId(gerenciaId);
      const optionsAreas = dataAreas.map((item: any) => ({
        value: item.id_area,
        label: item.name,
      }));
      setAreaOptions(optionsAreas);
    } catch (error) {
      console.error("Error al cargar áreas:", error);
    }
  };

  const loadDepartamentoData = async (areaId: number) => {
    try {
      const dataDepartamentos = await departamentoMatriz.getDepartamentosByAreaId(areaId);
      const optionsDepartamentos = dataDepartamentos.map((item: any) => ({
        value: item.id_department,
        label: item.name,
      }));
      setDepartamentoOptions(optionsDepartamentos);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };


  const loadDataByFiltros = async () => {
    const hasSelectedFilters = formValues.puesto || formValues.epp || formValues.departamento;

    if (!hasSelectedFilters) {
      showAlert("¡Atención!", `<b>Tiene que seleccionar al menos un filtro.</b>`, "warning");
      return false;
    }

    try {
      let filtrosTotales = '?';
      let filtrosToInteractPagination = '?';
      const params = [];
      const paginationParams = [];

      // Construir arrays de parámetros para cada filtro si existe
      if (formValues.puesto) {
        params.push(`idAppointment=${formValues.puesto.value}`);
        paginationParams.push(`idAppointment=${formValues.puesto.value}`);
      }

      if (formValues.epp) {
        params.push(`idEpp=${formValues.epp.value}`);
        paginationParams.push(`idEpp=${formValues.epp.value}`);
      }

      if (formValues.departamento) {
        params.push(`idOrganicStructure=${formValues.departamento.value}`);
        paginationParams.push(`idOrganicStructure=${formValues.departamento.value}`);
      }

      params.push(`page=${nroPagina}`, `pageSize=${nroFilasPagina}`);

      filtrosTotales += params.join('&');
      filtrosToInteractPagination += paginationParams.join('&');

      // Si no hay parámetros, eliminar el signo de interrogación
      if (paginationParams.length === 0) {
        filtrosToInteractPagination = '';
      }
      if (params.length === 0) {
        filtrosTotales = '';
      }

      setFiltroTextosIni(filtrosToInteractPagination);
      setIsloading(true);

      const { dataTable, nroTotalRows } = await matrizData.getDataByfiltersHeader(filtrosTotales);

      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);

    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };




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
    const { dataTable, nroTotalRows } = await matrizData.getDataByfiltersHeader(filterAll);
    setBandLimpiar(false);
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

      const { dataTable, nroTotalRows } = await matrizData.getDataByfiltersHeader(filtroTotal);
      setBandLimpiar(false);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
      setIsloading(false);
    }

    fetchData();

  }, [filtersHeaders]);

  const ClearFiltersConsulta = async () => {
    try {

      console.log(`aqui se preciona`)

      setFormValues({
        puesto: null,
        epp: null,
        gerencia: null,
        area: null,
        departamento: null,
      });

      setFiltroTextosIni('');
      setNroPagina(1);
      setNroFilasPagina(5);
      setBandLimpiar(true);
      // const filtroTotal = `?page=${nroPagina}&pageSize=${nroFilasPagina}`;
      const filtroTotal = `?page=1&pageSize=5`;

      setIsloading(true);
      console.log(filtroTotal)
      const { dataTable, nroTotalRows } = await matrizData.getDataByfiltersHeader(filtroTotal);
      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);


    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }


  };


  // ==============================================================================================




  return (
    <>
      <Grid container sx={{ mb: 4 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <CabeceraPage isWithBackground={false} objData={objData} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            sx={{
              padding: { xs: 2, md: 3 },
              overflowX: { xs: 'auto', md: 'unset' },
              whiteSpace: 'nowrap',
              maxWidth: { xs: '100vw', md: 'none' }
            }}>
            <Button
              variant="btnPrimeroCustomNormal"
              color="warning"
              startIcon={<PictureAsPdf />}
            >
              PDF
            </Button>

            <Button
              variant="btnPrimeroCustomNormal"
              color="primary"
              startIcon={<Add />}
              onClick={() => setopenModalEpp(true)}
            >
              Nuevo EPP
            </Button>

            {/* <Button
              variant="btnPrimeroCustomInvertNormal"
              color="primary"
              startIcon={<CloudUpload />}
              onClick={() => setOpenModalImp(true)}
            >
              Importar
            </Button> */}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="start" sx={{ p: { xs: 2, md: 3 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="puesto" style={{ marginBottom: '4px' }}>Puesto</label>
          <AsyncSelect
            id="puesto"
            name="puesto"
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'puesto')}
            value={formValues.puesto}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'puesto')}
            styles={reactSelectStyles}
            isClearable
            placeholder="Seleccione"
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="epp" style={{ marginBottom: '4px' }}>Epp</label>
          <AsyncSelect
            id="epp"
            name="epp"
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'epp')}
            value={formValues.epp}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'epp')}
            styles={reactSelectStyles}
            isClearable
            placeholder="Seleccione"
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="gerencia" style={{ marginBottom: '4px' }}>Gerencia</label>
          <AsyncSelect
            id="gerencia"
            name="gerencia"
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'gerencia')}
            value={formValues.gerencia}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'gerencia')}
            styles={reactSelectStyles}
            isClearable
            placeholder="Seleccione"
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />

        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="area" style={{ marginBottom: '4px' }}>Área</label>
          <AsyncSelect
            id="area"
            name="area"
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'area')}
            value={formValues.area}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'area')}
            styles={reactSelectStyles}
            isDisabled={!formValues.gerencia}
            isClearable
            placeholder="Seleccione"
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="departamento" style={{ marginBottom: '4px' }}>Departamento</label>
          <AsyncSelect
            id="departamento"
            name="departamento"
            cacheOptions
            loadOptions={(inputValue) => loadOptions(inputValue, 'departamento')}
            value={formValues.departamento}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'departamento')}
            styles={reactSelectStyles}
            isDisabled={!formValues.area}
            isClearable
            placeholder="Seleccione"
            noOptionsMessage={() => 'No hay opciones disponibles'}
          />
        </Grid>


        <Grid
          item xs={12} sm={8}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: 2,
            gap: 1
          }}
        >
          <Button
            variant="btnPrimeroCustomNormal"
            startIcon={<SearchIcon />}
            onClick={loadDataByFiltros}
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
            doClear={bandLimpiar}
          />
        </Grid>
      </Grid>

      <RightDrawer isOpen={openModalEpp} onClose={() => setopenModalEpp(false)} reloadTable={ClearFiltersConsulta} />
      <DrawerImport isOpen={openModalImp} onClose={() => setOpenModalImp(false)} />
      <DrawerEditMatriz isOpen={openModalEditMatriz} onClose={() => setOpenModalEditMatriz(false)} idrow={idRowMatrizEdit} reloadTable={ClearFiltersConsulta} />
    </>
  )
}
