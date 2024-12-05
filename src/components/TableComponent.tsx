import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Row from './Table/RowTable';
import { GridColDef } from '@mui/x-data-grid';
import { Container, Grid } from '@mui/material';
import { themePalette } from '../config/Theme.config';

interface DataTableProps {
  headers: GridColDef[];
  dataRows: any[];
  haveCheckbox?: boolean;
  haveCollapse?: boolean;
  isloading?: boolean;
  onPageChange?: (newPage: number) => void;
  totalRows: number;
  onPaginationChange: (pageInfo: { currentPage: number; rowsPerPage: number }) => void;
  onRowSelectionChange?: (selectedRows: string[]) => void;
  doClear?: boolean;
  changePage?:number;
}

const CustomPagination: React.FC<{
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const pageCount = Math.ceil(count / rowsPerPage);

  const getPageNumbers = () => {
    const totalPages = 5;
    const halfWay = Math.floor(totalPages / 2);
    const isNearStart = page < halfWay;
    const isNearEnd = page > pageCount - halfWay;

    if (pageCount <= totalPages) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (isNearStart) {
      return [1, 2, 3, 4, 5];
    } else if (isNearEnd) {
      return [pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    } else {
      return [page - 1, page, page + 1, page + 2, page + 3];
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" sx={{ p: 1 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2, fontWeight: 'bold' }}>
                Filas por página:
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                size="small"
                sx={{ bgcolor: 'white' }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                onClick={() => onPageChange(null, page - 1)}
                disabled={page === 0}
                sx={{ minWidth: 0, p: 1, color: themePalette.BG_COLOR_WEAK_ORANGE }}
              >
                <ArrowBackIcon />
              </Button>

              {getPageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => onPageChange(null, pageNum - 1)}
                  variant={page === pageNum - 1 ? 'contained' : 'outlined'}
                  sx={{
                    mx: 1,
                    minWidth: 0,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    p: 0,
                    bgcolor: page === pageNum - 1 ? themePalette.BG_COLOR_STRONG_ORANGE : themePalette.BG_COLOR_WHITE,
                    color: page === pageNum - 1 ? themePalette.BG_COLOR_WHITE : themePalette.BG_COLOR_STRONG_ORANGE,
                    borderColor: page === pageNum - 1 ? themePalette.BG_COLOR_STRONG_ORANGE : themePalette.BG_COLOR_GRAY,
                  }}
                >
                  {pageNum}
                </Button>
              ))}

              <Button
                onClick={() => onPageChange(null, page + 1)}
                disabled={page >= pageCount - 1}
                sx={{ minWidth: 0, p: 1, color: themePalette.BG_COLOR_WEAK_ORANGE }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
              Página {page + 1} de {pageCount} | Total: {count} registros
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const DataTable: React.FC<DataTableProps> = ({
  headers,
  dataRows,
  haveCheckbox = false,
  haveCollapse = false,
  isloading = false,
  totalRows,
  onPaginationChange,
  onRowSelectionChange,
  doClear = false,
  changePage
}) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(isloading);

  // Actualizar el estado de loading cuando cambian los datos
  React.useEffect(() => {

    // console.log(dataRows)
    setLoading(isloading);
  }, [isloading]);

  // --- Para poder Setear el valor que hara limpieza 
  React.useEffect( () => {

    if(doClear == true) {
      setPage(0);
      setRowsPerPage(5);
    }
  }, [doClear ]);

  React.useEffect ( () => {
    setPage(0);
    setRowsPerPage(5);
  },[changePage] );



  // Monitorear cambios en dataRows
  React.useEffect(() => {
    // console.log('Datos actualizados en el array :', selectedRows);
    if (haveCheckbox && onRowSelectionChange) {
      onRowSelectionChange(selectedRows);
    }
  }, [selectedRows, haveCheckbox, onRowSelectionChange]);

  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = dataRows.map((row) => row.idRequirement);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelectedRows) => 
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((selectedId) => selectedId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handlePaginationChange = (newPage: number, newRowsPerPage: number) => {
    onPaginationChange({ currentPage: newPage + 1, rowsPerPage: newRowsPerPage });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    handlePaginationChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    handlePaginationChange(0, newRowsPerPage);
  };

  const isSelected = (id: string) => {
    return selectedRows.includes(id);
  }

  return (
    <Box sx={{ overflowX: 'auto', width: '100%', padding: 2, maxWidth: { xs: '420px', sm: '720px', md: '100%' } }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  {/* Para el contador */}
                </TableCell>

                {haveCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < dataRows.length}
                      checked={selectedRows.length === dataRows.length}
                      onChange={handleSelectAllRows}
                    />
                  </TableCell>
                )}
                {haveCollapse && <TableCell sx={{ width: '15px !important' }} />}
                {headers.map((header) => (
                  <TableCell
                    key={header.field}
                    align={header.align || 'center'}
                    style={{ width: header.width, maxWidth: header.width }}
                    sx={{ textAlign: 'center !important', fontWeight: 'bold !important'}}
                  >
                    {header.renderHeader ? (
                      header.renderHeader({
                        colDef: header,
                        headerName: header.headerName,
                        onFilterChange: (value: string) => {
                          console.log(`Filtrar ${header.field}:`, value);
                        },
                        isSortable: true,
                        isOnlySorteable: false,
                      })
                    ) : (
                      header.headerName
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell 
                    colSpan={headers.length + (haveCheckbox ? 1 : 0) + (haveCollapse ? 1 : 0)}
                    sx={{ 
                      border: 'none',
                      height: '200px',
                      position: 'relative'
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        color: themePalette.BG_COLOR_GREEN
                      }}
                    >
                      <CircularProgress sx={{ mr: 2 }} />
                      Cargando...
                    </Box>
                  </TableCell>
                </TableRow>
              ) : dataRows.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={headers.length + (haveCheckbox ? 1 : 0) + (haveCollapse ? 1 : 0)} 
                    align="center"
                  >
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              ) : (
                dataRows.map((row, index) => (
                  <Row
                    // key={row.id || index}
                    key={`${row.id || row.identificador}-${index}`}
                    row={row}
                    index={index}
                    isSelected={isSelected(row.idRequirement)}
                    handleCheckboxClick={() => handleSelectRow(row.idRequirement)}
                    withCheck={haveCheckbox}
                    withCollapse={haveCollapse}
                    headers={headers}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomPagination
          count={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );


};

export default DataTable;