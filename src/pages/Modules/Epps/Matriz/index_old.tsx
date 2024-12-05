import React, { useEffect, useState } from 'react'
import CabeceraPage from '../../../../components/CabeceraPage';
import Grid from '@mui/material/Grid';
import { Box, Button, TextField } from '@mui/material';
import { CloudUpload, Add, PictureAsPdf } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import RightDrawer from './../../../../components/DrawerDerecho.tsx'
import DrawerImport from '../../../../components/DrawerImport.tsx';
import Select from 'react-select';
import { gerenciaMatriz } from './../../../../api/matriz/gerencia.ts'
import { puestoMatriz } from './../../../../api/matriz/puesto.ts'
import { areaMatriz } from './../../../../api/matriz/area.ts'
import { departamentoMatriz } from './../../../../api/matriz/departamento.ts'
import { reactSelectStyles } from './../../../../styles/Fields/reactSelectStyles.ts';
import DataTable from '../../../../components/TableComponent.tsx';
import { useHeaders } from './TableStructure/headers.tsx';
import { dataEppMatriz } from '../../../../api/matriz/eppMatriz';
import DrawerEditMatriz from '../../../../components/DrawerEditMatriz.tsx';

const objData = {
  firstData: "EPP",
  secondData: "Matrices de EPP"
};

interface dataOption {
  value: number;
  label: string;
}

export const Matriz: React.FC = () => {

  // -- funciones que se emiten desde el header
  const handleDelete = (id: string) => {
    alert(`Eliminando el ID: ${id}`);
  };

  const handleEdit = (id: number, departamento: string) => {
    openModalEditarMatriz(id);
  };


  const { headers, dataReturn, filtersHeaders } = useHeaders(handleEdit, handleDelete);
  const [dataToTable, setDataToTable] = useState([]);
  const [activeLoading, setActiveLoading] = useState(false);
  const [openModalEpp, setopenModalEpp] = useState(false);
  const [openModalImp, setOpenModalImp] = useState(false);
  const [openModalEditMatriz, setOpenModalEditMatriz] = useState(false);
  const [gerenciaOptions, setGerenciaOptions] = useState([]);
  const [puestoOptions, setPuestoOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState<dataOption[]>([]);
  const [departamentoOptions, setDepartamentoOptions] = useState<dataOption[]>([]);
  const [idRowMatrizEdit, setIdRowMatrizEdit] = useState(null);

  const [formValues, setFormValues] = useState({
    puesto: null as dataOption | null,
    epp: '',
    gerencia: null as dataOption | null,
    area: null as dataOption | null,
    departamento: null as dataOption | null,
  });



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const openNewEpp = () => {
    setopenModalEpp(true);
  }
  const closeModalEpp = () => {
    setopenModalEpp(false);
  }

  const openModalImport = () => {
    setOpenModalImp(true);
  }

  const closeModalImport = () => {
    setOpenModalImp(false);
  }

  const openModalEditarMatriz = (id: number) => {
    setIdRowMatrizEdit(id);
    setOpenModalEditMatriz(true);

  }

  const closeModalEditarMatriz = () => {
    setOpenModalEditMatriz(false);
  }




  const loadDatosGerencia = async () => {
    try {

      const dataPuestos = await puestoMatriz.getAll();
      const optionsPuestos = dataPuestos.map(item => ({
        value: item.id_appointment,
        label: item.name
      }));
      setPuestoOptions(optionsPuestos);

      const dataGerencia = await gerenciaMatriz.getAll();
      const options = dataGerencia.map(item => ({
        value: item.id_management,
        label: item.name
      }));
      setGerenciaOptions(options);

    } catch (error) {
      console.error("Error al cargar datos de gerencia:", error);
    }
  }

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

    try {
      setActiveLoading(true);
      const dataFiltrada = await dataEppMatriz.getDataByfilters(formValues);
      setDataToTable(dataFiltrada);
      setActiveLoading(false);
      console.log(dataFiltrada)
    } catch (error) {
      console.error("Error al cargar los datos por los filtros:", error);
    }
  }



  useEffect(() => {
    loadDatosGerencia()
  }, []);


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
              onClick={openNewEpp}
            >
              Nuevo EPP
            </Button>

            <Button
              variant="btnPrimeroCustomInvertNormal"
              color="primary"
              startIcon={<CloudUpload />}
              onClick={openModalImport}
            >
              Importar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="start" sx={{ p: { xs: 2, md: 3 } }}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label htmlFor="puesto" style={{ marginBottom: '4px' }}>Puesto</label>
          <Select
            id="puesto"
            name="puesto"
            options={puestoOptions}
            value={formValues.puesto}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'puesto')}
            styles={reactSelectStyles}
            isClearable
            placeholder="Seleccione"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label htmlFor="epp" style={{ marginBottom: '4px' }}>EPP</label>
          <TextField
            variant="outlined"
            id="epp"
            size="small"
            name="epp"
            value={formValues.epp}
            onChange={handleChange}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="gerencia" style={{ marginBottom: '4px' }}>Gerencia</label>
          <Select
            id="gerencia"
            name="gerencia"
            options={gerenciaOptions}
            value={formValues.gerencia}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'gerencia')}
            styles={reactSelectStyles}
            isClearable
            placeholder="Seleccione"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="area" style={{ marginBottom: '4px' }}>Área</label>
          <Select
            id="area"
            name="area"
            options={areaOptions}
            value={formValues.area}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'area')}
            isDisabled={!formValues.gerencia}
            isClearable
            placeholder="Seleccione"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <label htmlFor="departamento" style={{ marginBottom: '4px' }}>Departamento</label>
          <Select
            id="departamento"
            name="departamento"
            options={departamentoOptions}
            value={formValues.departamento}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'departamento')}
            isDisabled={!formValues.area}
            isClearable
            placeholder="Seleccione"
          />
        </Grid>


        <Grid item xs={12} sm={8} md={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
          <Button
            variant="btnPrimeroCustomNormal"
            startIcon={<SearchIcon />}
            sx={{ ml: 1 }}
            onClick={loadDataByFiltros}
          >
            Filtrar
          </Button>
        </Grid>


      </Grid >


      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <DataTable
            headers={headers}
            dataRows={dataToTable}
            haveCheckbox={false}
            haveCollapse={false}
            isloading={activeLoading}
          />
        </Grid>
      </Grid>


      <RightDrawer isOpen={openModalEpp} onClose={closeModalEpp} />
      <DrawerImport isOpen={openModalImp} onClose={closeModalImport} />
      <DrawerEditMatriz isOpen={openModalEditMatriz} onClose={closeModalEditarMatriz} idrow={idRowMatrizEdit} />

    </>
  )
}