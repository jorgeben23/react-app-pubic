import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { themePalette } from '../../../../../config/Theme.config';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const useDebounce = (value: { [key: string]: string }, delay: number) => {
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
export const useHeaders = ( onEdit: (id: string ) => void, onDelete: (id: string) => void ) => {
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
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ fontWeight: 'bold' }}>{params.value}</span>
      ),
    },
    {
      field: 'appointmentName',
      headerName: 'Puesto',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('appointmentName', value)}
          onSortClick={() => handleSortClick('appointmentName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'eppName',
      headerName: 'EPP',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('eppName', value)}
          onSortClick={() => handleSortClick('eppName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'lifeTime',
      headerName: 'Tiempo de vida máximo',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('lifeTime', value)}
          onSortClick={() => handleSortClick('lifeTime')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => onEdit(params.row.idEppMatrix)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE, marginRight: '8px' }} title="Editar">
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => onDelete(params.row.idEppMatrix)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }} title="Eliminar">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return { headers, dataReturn, filtersHeaders };
};