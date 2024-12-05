import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { themePalette } from '../../../../../config/Theme.config';

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
export const useHeaders = () => {
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
      console.log(filtros)

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
        />
      ),
    },
    {
      field: 'fullName',
      headerName: 'Colaborador',
      flex: 1,
      width: 200,
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
        return (
          <>
          { params.value.toUpperCase() == 'NORMAL' ? ( <span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_GREEN }}>{params.value}</span>) : (<span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_RED }}>{params.value}</span>)}
         
          </>
        )
      }
    },
  ];

  return { headers, dataReturn, filtersHeaders };
};