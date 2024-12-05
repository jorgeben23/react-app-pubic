import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CabeceraPage from '../../../../components/CabeceraPage';
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import DrawerImport from '../../../../components/DrawerImport';
import AsyncSelect from 'react-select/async';
import { reactSelectStyles } from '../../../../styles/Fields/reactSelectStyles';
import { dataReportes } from './../../../../api/reportes/reportesData';
import DataTable from '../../../../components/TableComponent';
import { useHeaders } from './TableStructure/headers';

const objData = {
  firstData: "EPP",
  secondData: "Reportes EPP"
};

interface DataOption {
  value: number;
  label: string;
}

interface FormValues {
  dni: string;
  nombre: string;
  inicio: string;
  fin: string;
  gerencia: DataOption | null;
  estado: DataOption | null;
}

export const Reportes: React.FC = () => {

  const { headers, dataReturn, filtersHeaders } = useHeaders();
  const [dataToTable, setDataToTable] = useState([]);

  const [formValues, setFormValues] = useState<FormValues>({
    dni: '',
    nombre: '',
    inicio: '',
    fin: '',
    gerencia: null,
    estado: null,
  });

  const [formDataEstadistico, setFormDataEstadistico] = useState({
    masUtilizado1: '',
    nromasUtilizados1: '',
    masUtilizado2: '',
    nromasUtilizados2: '',
    masconsumidor1: '',
    nromasconsumidor1: '',
    masconsumidor2: '',
    nromasconsumidor2: ''
  });

  const [isOpenModalImport, setIsOpenModalImport] = useState(false);

  const handleChange = (name: keyof FormValues, value: string | DataOption | null) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormValues({
      dni: '',
      nombre: '',
      inicio: '',
      fin: '',
      gerencia: null,
      estado: null
    });
  };

  const handleFilter = async () => {
    console.log('Valores de filtros:', {
      ...formValues,
      gerencia: formValues.gerencia ? formValues.gerencia.value : null,
      estado: formValues.estado ? formValues.estado.value : null
    });

    try {
      const dataHaciaTable = await dataReportes.getDataAll();
      setDataToTable(dataHaciaTable);

    } catch (error) {
      console.log(error)
    }


  };

  const loadOptions = async (inputValue: string, type: 'gerencia' | 'estado'): Promise<DataOption[]> => {
    if (inputValue.length < 3) {
      return [];
    }
    try {
      let dataOptions;
      if (type === 'gerencia') {
        dataOptions = await dataReportes.getOptionsGerencia(inputValue);
        return dataOptions.map((item: { id_management: number; name: string }) => ({
          value: item.id_management,
          label: item.name
        }));
      } else if (type === 'estado') {
        dataOptions = await dataReportes.getOptionsEstado(inputValue);
        return dataOptions.map((item: { id_state: number; name: string }) => ({
          value: item.id_state,
          label: item.name
        }));
      }
      return [];
    } catch (error) {
      console.error("Error al obtener opciones:", error);
      return [];
    }
  };

  const loadDataEstadisticoInit = async () => {
    try {

      const dataEstadistico = await dataReportes.getDataEstadisticoInit()[0];
      if (dataEstadistico) {
        setFormDataEstadistico({
          masUtilizado1: dataEstadistico.masUtilizado1,
          nromasUtilizados1: dataEstadistico.nromasUtilizados1,
          masUtilizado2: dataEstadistico.masUtilizado2,
          nromasUtilizados2: dataEstadistico.nromasUtilizados2,
          masconsumidor1: dataEstadistico.masconsumidor1,
          nromasconsumidor1: dataEstadistico.nromasconsumidor1,
          masconsumidor2: dataEstadistico.masconsumidor2,
          nromasconsumidor2: dataEstadistico.nromasconsumidor2
        });
      } else {
        console.log(`no existe data estadistico`)
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    loadDataEstadisticoInit();
  }, []);

  return (
    <>
      <Grid container sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: 2 }}>
            <CabeceraPage isWithBackground={false} objData={objData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mt: 2 }}>
            <Box>
              <Typography variant="subtitle1" color="primary" fontWeight="bold" gutterBottom>
                Más utilizados:
              </Typography>
              <Box>
                <Typography variant="body2">• {formDataEstadistico.masUtilizado1}: {formDataEstadistico.nromasUtilizados1}</Typography>
                <Typography variant="body2">• {formDataEstadistico.masUtilizado2}: {formDataEstadistico.nromasUtilizados2}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle1" color="primary" fontWeight="bold" gutterBottom>
                Consumidores:
              </Typography>
              <Box>
                <Typography variant="body2">• {formDataEstadistico.masconsumidor1}: {formDataEstadistico.nromasconsumidor1}</Typography>
                <Typography variant="body2">• {formDataEstadistico.masconsumidor2}: {formDataEstadistico.nromasconsumidor2}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" sx={{ p: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="dni" style={{ marginBottom: '4px' }}>DNI o Código de personal</label>
          <TextField
            id="dni"
            value={formValues.dni}
            onChange={(e) => handleChange('dni', e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="nombre" style={{ marginBottom: '4px' }}>Nombre o Código de EPP</label>
          <TextField
            id="nombre"
            value={formValues.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="inicio" style={{ marginBottom: '4px' }}>Inicio</label>
          <TextField
            id="inicio"
            value={formValues.inicio}
            onChange={(e) => handleChange('inicio', e.target.value)}
            variant="outlined"
            size="small"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="fin" style={{ marginBottom: '4px' }}>Fin</label>
          <TextField
            id="fin"
            value={formValues.fin}
            onChange={(e) => handleChange('fin', e.target.value)}
            variant="outlined"
            size="small"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="gerencia" style={{ marginBottom: '4px' }}>Gerencia</label>
          <AsyncSelect<DataOption>
            id="gerencia"
            name="gerencia"
            loadOptions={(inputValue: string) => loadOptions(inputValue, 'gerencia')}
            defaultOptions
            placeholder="Escriba búsqueda"
            styles={reactSelectStyles}
            isClearable
            value={formValues.gerencia}
            onChange={(selectedOption) => handleChange('gerencia', selectedOption)}
            noOptionsMessage={() => 'No hay opciones'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <label htmlFor="estado" style={{ marginBottom: '4px' }}>Vencido / por vencer</label>
          <AsyncSelect<DataOption>
            id="estado"
            name="estado"
            loadOptions={(inputValue: string) => loadOptions(inputValue, 'estado')}
            defaultOptions
            placeholder="Escriba búsqueda"
            styles={reactSelectStyles}
            isClearable
            value={formValues.estado}
            onChange={(selectedOption) => handleChange('estado', selectedOption)}
            noOptionsMessage={() => 'No hay opciones'}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'start' }, gap: 2, pl: 3 }}>
          <Button variant="btnPrimeroCustomInvertNormal" fullWidth onClick={handleReset}>
            <ReplayIcon />
            Limpiar
          </Button>

          <Button variant="btnPrimeroCustomNormal" fullWidth onClick={handleFilter}>
            <SearchIcon />
            Filtrar
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'end' },
          gap: 2,
          pr: 3,
          marginTop: { xs: 2, md: 0 },
          overflowX: { xs: 'auto', sm: 'unset' },
          whiteSpace: 'nowrap',
          maxWidth: { xs: '100vw', sm: 'none' },
          paddingLeft: { xs: 2, md: 0 }
        }}>
          <Button variant="btnPrimeroCustomInvertNormal" color="success" fullWidth onClick={() => setIsOpenModalImport(true)}>
            <CloudUploadIcon sx={{ mr: 1 }} />
            Importar
          </Button>

          <Button variant="btnPrimeroCustomNormal" color="info" fullWidth>
            <FileDownloadIcon sx={{ mr: 1 }} />
            Exportar
          </Button>

          <Button variant="btnPrimeroCustomInvertNormal" fullWidth>
            <DescriptionIcon sx={{ mr: 1 }} />
            Ficha
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
            isloading={false}
          />
        </Grid>
      </Grid>

      <DrawerImport isOpen={isOpenModalImport} onClose={() => setIsOpenModalImport(false)} />
    </>
  );
};