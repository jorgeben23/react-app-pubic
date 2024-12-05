import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { IconButton } from '@mui/material';
import { themePalette } from '../../../../../config/Theme.config';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


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
export const useHeaders = ( onAceptarRequirementPend : (id:string) => void, onRechazarRequirementPend : (id:string) => void   ) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [dataReturn, setdataReturn] = useState([]);
  const [filtersHeaders, setfiltersHeaders] = useState({});
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
      setdataReturn([]);
      setfiltersHeaders(filtros)

    }else {
      // -- no hay filtros
      setfiltersHeaders({})
    }
  }, [debouncedFilterValues]);

  const handleFilterChange = (field: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [field]: value }));
  };


  const handleSortClick = (field: string) => {
    console.log(`Sorting by: ${field}`);
  };

  // -- aqui va la logica donde se limpiaran las cabeceras

  const limpiezaFiltrosPendientes = () => {
    setFilterValues({});
    setResetTrigger((prev) => { return prev + 1} );
  }



  const headers: GridColDef[] = [
  
    {
      field: 'code',
      headerName: 'Código',
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
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
    
        const tipoSel = params.row.type.toUpperCase(); // Corregido
    
        return (
          <>
            {tipoSel === 'NORMAL' ? (
              <span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_GREEN }}>{params.row.type}</span> 
            ) : (
              <span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_RED }}>{params.row.type}</span> 
            )}
          </>
        );
      }
    
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 1,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => onAceptarRequirementPend(params.row.idRequirement)} sx={{ color: themePalette.BG_COLOR_GREEN, marginRight: '8px' }} title="Aceptar">
            <CheckCircleIcon />
          </IconButton>

          <IconButton onClick={() => onRechazarRequirementPend(params.row.idRequirement)} sx={{ color: themePalette.BG_COLOR_RED }} title="Rechazar">
            <CancelIcon />
          </IconButton >
        </>
      ),
    },
  ];

  return { headers, dataReturn, filtersHeaders, limpiezaFiltrosPendientes };
};