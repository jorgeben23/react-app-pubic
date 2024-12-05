import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';

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
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('name', value)}
          onSortClick={() => handleSortClick('name')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'categoryName',
      headerName: 'Categoría',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('categoryName', value)}
          onSortClick={() => handleSortClick('categoryName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'unit',
      headerName: 'Unidad',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('unit', value)}
          onSortClick={() => handleSortClick('unit')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('stock', value)}
          onSortClick={() => handleSortClick('stock')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'storeName',
      headerName: 'Almacén',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('storeName', value)}
          onSortClick={() => handleSortClick('storeName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'geographicCenterName',
      headerName: 'Centro Geográfico',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('geographicCenterName', value)}
          onSortClick={() => handleSortClick('geographicCenterName')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
  ];

  return { headers, dataReturn, filtersHeaders };
};