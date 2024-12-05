import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams  } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { themePalette } from '../../../../../config/Theme.config.tsx';
import { Box, Chip, IconButton } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BlockIcon from '@mui/icons-material/Block';
import RedoIcon from '@mui/icons-material/Redo';

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
export const useHeaders = (onEdit : (idEmployee : string, document: string) => void , onActivar : (id : string) => void, onInactivar : (id : string) => void ) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [dataReturn, setdataReturn] = useState([]);
  const [filtersHeaders, setfiltersHeaders] = useState({});
  const debouncedFilterValues = useDebounce(filterValues, 500);

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

  const headers: GridColDef[] = [ 
    {
      field: 'code',
      headerName: 'Codigo',
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
      width: 260,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('document', value)}
          onSortClick={() => handleSortClick('document')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'fullName',
      headerName: 'Nombre y Apellidos',
      flex: 1,
      width: 260,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('fullName', value)}
          onSortClick={() => handleSortClick('fullName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'structureName',
      headerName: 'Estructura Organizacional',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('structureName', value)}
          onSortClick={() => handleSortClick('structureName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'positionName',
      headerName: 'Puesto',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('positionName', value)}
          onSortClick={() => handleSortClick('positionName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'roleName',
      headerName: 'Perfil',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('roleName', value)}
          onSortClick={() => handleSortClick('roleName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'ceased',
      headerName: 'Estado en Empresa',
      flex: 1,
      width: 210,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('ceased', value)}
          onSortClick={() => handleSortClick('ceased')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
      renderCell: (params: GridRenderCellParams) => {
        const estadoEnEmpresa = params.row.ceased.toUpperCase();
        return (
          <>
            <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
              <Chip
                label={params.row.ceased}
                variant="filled"
                sx={{
                  margin: 0.5,
                  background: estadoEnEmpresa == 'ACTIVO' ? themePalette.BG_COLOR_GREEN : themePalette.BG_COLOR_RED,
                  color: themePalette.BG_COLOR_WHITE,
                  fontWeight: 'bold'
                }}
              />

            </Box>

          </>
        );
      }
    },
    {
      field: 'active',
      headerName: 'Estado de Usuario',
      flex: 1,
      width: 210,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('active', value)}
          onSortClick={() => handleSortClick('active')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
      renderCell: (params: GridRenderCellParams) => {
        const estadoDeUsuario = params.row.active.toUpperCase();
        return (
          <>
            <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
              <Chip
                label={params.row.active}
                variant="filled"
                sx={{
                  margin: 0.5,
                  background: estadoDeUsuario == 'ACTIVO' ? themePalette.BG_COLOR_GREEN : themePalette.BG_COLOR_RED,
                  color: themePalette.BG_COLOR_WHITE,
                  fontWeight: 'bold'
                }}
              />

            </Box>

          </>
        );
      }
    },
    {
      field: 'costCenterName',
      headerName: 'Centro de Costo',
      flex: 1,
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {

        const estadoDeUsuario = params.row.active.toUpperCase();
        return (

          <Box sx={{ display: 'flex', gap: 2 }}>
            {estadoDeUsuario == 'ACTIVO' ?
              (
                <>
                  <IconButton onClick={() => onEdit(params.row.idEmployee,params.row.document)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }}>
                    <EditNoteIcon />
                  </IconButton>
                  <IconButton onClick={() => onInactivar(params.row.idEmployee)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }} title='Inactivar'>
                    <BlockIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => onActivar(params.row.idEmployee)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }} title='Activar'>
                    <RedoIcon />
                  </IconButton>
                </>
              )}


          </Box>

        );
      }
    },
  ];

  return { headers, dataReturn, filtersHeaders };
};