import { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomColumnHeader from '../../../../../components/Table/CustomColumnHeader';
import { dataReportes } from './../../../../../api/reportes/reportesData.ts';
import { themePalette } from '../../../../../config/Theme.config.tsx';

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

      // aqui hace la conexion con el backend para traer la data
      const filtros = JSON.stringify(filterJson);
      const getDataFromFilters = dataReportes.getDataByfiltersHeader(filtros);
      setdataReturn(getDataFromFilters);
      setfiltersHeaders(filtros)
      console.log(getDataFromFilters)
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
      field: 'numero',
      headerName: '',
      flex: 1,
      width: 20,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ fontWeight: 'bold' }}>{params.value}</span>
      ),
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      flex: 1,
      width: 200,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('fecha', value)}
          onSortClick={() => handleSortClick('fecha')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ fontWeight: 'bold' }}>{params.value}</span>
      ),
    },
    {
      field: 'epp',
      headerName: 'EPP',
      flex: 1,
      width: 250,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('epp', value)}
          onSortClick={() => handleSortClick('epp')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'unidad',
      headerName: 'Unidad',
      flex: 1,
      width: 170,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('unidad', value)}
          onSortClick={() => handleSortClick('unidad')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
    },
    {
      field: 'estadocambio',
      headerName: 'Estado de Cambio',
      flex: 1,
      width: 230,
      renderHeader: (params) => (
        <CustomColumnHeader
          {...params}
          headerName={params.colDef.headerName}
          onFilterChange={(value) => handleFilterChange('estadocambio', value)}
          onSortClick={() => handleSortClick('estadocambio')}
          isSortable={true}
          isOnlySorteable={false}
        />
      ),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {params.row.isVencido == 0 ? (<span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_GREEN }}>{params.value}</span>) : (<span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_RED }}>{params.value}</span>)}

          </>
        );
      }

    },
{
  field: 'cantidad',
    headerName: 'Cantidad',
      flex: 1,
        width: 120,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('cantidad', value)}
              onSortClick={() => handleSortClick('cantidad')}
              isSortable={true}
              isOnlySorteable={false}
            />
          ),
    },
{
  field: 'dni',
    headerName: 'DNI',
      flex: 1,
        width: 200,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('dni', value)}
              onSortClick={() => handleSortClick('dni')}
              isSortable={true}
              isOnlySorteable={false}
            />
          ),
    },
{
  field: 'nombre',
    headerName: 'Nombre',
      flex: 1,
        width: 200,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('nombre', value)}
              onSortClick={() => handleSortClick('nombre')}
              isSortable={true}
              isOnlySorteable={false}
            />
          ),
    },
{
  field: 'gerencia',
    headerName: 'Gerencia',
      flex: 1,
        width: 200,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('gerencia', value)}
              onSortClick={() => handleSortClick('gerencia')}
              isSortable={true}
              isOnlySorteable={false}
            />
          ),
    },
{
  field: 'puesto',
    headerName: 'Puesto',
      flex: 1,
        width: 200,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('puesto', value)}
              onSortClick={() => handleSortClick('puesto')}
              isSortable={true}
              isOnlySorteable={false}
            />
          )
    },
{
  field: 'estado',
    headerName: 'Estado',
      flex: 1,
        width: 200,
          renderHeader: (params) => (
            <CustomColumnHeader
              {...params}
              headerName={params.colDef.headerName}
              onFilterChange={(value) => handleFilterChange('estado', value)}
              onSortClick={() => handleSortClick('estado')}
              isSortable={true}
              isOnlySorteable={false}
            />
          ),
          renderCell: (params: GridRenderCellParams) => {
            return (
              <>
                {params.row.isInactivo == 0 ? (<span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_GREEN }}>{params.value}</span>) : (<span style={{ fontWeight: 'bold', color: themePalette.BG_COLOR_RED }}>{params.value}</span>)}
    
              </>
            );
          }
    },
  ];

return { headers, dataReturn, filtersHeaders };
};