import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { IconButton } from '@mui/material';
import { themePalette } from '../../../../../config/Theme.config';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';


// Hook de debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


// Componente principal
export const useHeadersSecondTable = (onAceptarVericado: (id: string) => void, onRechazarVerificado: (id: string) => void, onEliminarVerificado: (id: string) => void) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [dataReturnSecond, setdataReturnSecond] = useState([]);
  const [filtersHeadersSecond, setfiltersHeadersSecond] = useState({});
  const debouncedFilterValues = useDebounce(filterValues, 500);
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    const filterJson: { field: string; value: string }[] = [];
    Object.entries(debouncedFilterValues).forEach(([field, value]) => {
      if (value) {
        filterJson.push({ field, value })
      }
    });

    if (filterJson.length > 0) {
      const filtros = JSON.stringify(filterJson);
      setdataReturnSecond([]);
      setfiltersHeadersSecond(filtros)

    } else {
      // -- no hay filtros
      setfiltersHeadersSecond({})
    }
  }, [debouncedFilterValues]);

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [field]: value }));
  };


  const handleSortClick = (field: string) => {
    console.log(`Sorting by: ${field}`);
  };

  // -- aqui va la logica donde se limpiaran las cabeceras

  const limpiezaFiltros = () => {
    setFilterValues({});
    setResetTrigger((prev) => { return prev + 1} );
  }




  const headersSecond: GridColDef[] = [
  
    {
      field: 'code',
      headerName: 'Código Interno',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('code', value)}
          onSortClick={() => handleSortClick('code')}
          isSortable={true}
          isOnlySorteable={false}
          resetTrigger={resetTrigger}
        />
      ),
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ fontWeight: 'bold' }}>{params.value}</span>
      ),
    },
    {
      field: 'codeSap',
      headerName: 'Código SAP',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('codeSap', value)}
          onSortClick={() => handleSortClick('codeSap')}
          isSortable={true}
          isOnlySorteable={false}
          resetTrigger={resetTrigger}
        />
      ),
    },
    {
      field: 'document',
      headerName: 'DNI',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('document', value)}
          onSortClick={() => handleSortClick('document')}
          isSortable={true}
          isOnlySorteable={false}
          resetTrigger={resetTrigger}
        />
      ),
    },
    {
      field: 'fullName',
      headerName: 'Registró',
      flex: 1,
      width: 200
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('date', value)}
          onSortClick={() => handleSortClick('date')}
          isSortable={true}
          isOnlySorteable={false}
          resetTrigger={resetTrigger}
        />
      ),
    },
    {
      field: 'comment',
      headerName: 'Comentario',
      flex: 1,
      width: 200,
    },
    {
      field: 'approved',
      headerName: 'Estado',
      flex: 1,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {

        const tipoSel = params.row.approved.toUpperCase(); // Corregido

        return (
          <>
            {tipoSel === 'APROBADO' ? (
              <span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_GREEN }}>{params.row.approved}</span>
            ) : (
              <span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_RED }}>{params.row.approved}</span>
            )}
          </>
        );
      }

    },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 1,
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        params.row.approved !== "APROBADO" ? (
          <>
              <IconButton
                  onClick={() => onAceptarVericado(params.row.idRequirement)}
                  sx={{ color: themePalette.BG_COLOR_GREEN, marginRight: '8px' }}
                  title="Aceptar"
              >
                  <CheckCircleIcon />
              </IconButton>
  
              <IconButton
                  onClick={() => onRechazarVerificado(params.row.idRequirement)}
                  sx={{ color: themePalette.BG_COLOR_RED }}
                  title="Rechazar"
              >
                  <CancelIcon />
              </IconButton>
  
              <IconButton
                  onClick={() => onEliminarVerificado(params.row.idRequirement)}
                  sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }}
                  title="Eliminar"
              >
                  <DeleteIcon />
              </IconButton>
          </>
      ) : null 
      ),
    },
  ];

  return { headersSecond, dataReturnSecond, filtersHeadersSecond, limpiezaFiltros };
};