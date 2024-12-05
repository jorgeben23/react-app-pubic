import * as React from 'react';
import { TableRow, TableCell, IconButton, Collapse, Checkbox, Box, Table, TableBody, TableHead } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { themePalette } from '../../config/Theme.config';
import { dataRequerimiento } from './../../api/requerimiento/requerimientoData';

const Row = (props: { row: any; isSelected: boolean; handleCheckboxClick: () => void; withCheck: boolean; withCollapse: boolean, headers: any[], index: number }) => {
  const { row, isSelected, handleCheckboxClick, withCheck, withCollapse, headers, index } = props;
  const [open, setOpen] = React.useState(false);
  const [dataToCollapse, setDataToCollapse] = React.useState([]);

  const handleCollapseClick = () => {

    setOpen(!open);
    setDataToCollapse(row.details);

  };

  return (
    <React.Fragment>
      <TableRow sx={{
        '& > *': { borderBottom: 'unset' },
        backgroundColor: index % 2 === 0 ? themePalette.BG_COLOR_WEAK_GRAY : 'white'
      }}>

        {/* Agregado para el contador por fila  */}
        <TableCell
          sx={{
            textAlign: 'center !important',
            width: 70,
            fontWeight: "bolder"
          }}
        >
          {index + 1}
        </TableCell>


        {withCheck && (
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} onClick={handleCheckboxClick} />
          </TableCell>
        )}

        {withCollapse ? (
          <TableCell>
            {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}> */}
            <IconButton aria-label="expand row" size="small" onClick={handleCollapseClick}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : withCollapse ? (
          <TableCell />
        ) : null}

        {headers.map((header) => (
          <TableCell
            key={header.field}
            align={header.align || 'left'}
            style={{ width: header.width }}
            sx={{ textAlign: 'center !important' }}
          >
            {header.renderCell ? header.renderCell({ value: row[header.field as keyof typeof row], row }) : row[header.field as keyof typeof row]}
          </TableCell>
        ))}
      </TableRow>

      {withCollapse && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ border: `2px solid ${themePalette.BG_COLOR_WEAK_GRAY}`, p: 0 }}>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>EPP</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CANTIDAD</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CANTIDAD ENVIADA</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CANTIDAD PENDIENTE</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ALMACÉN</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ESTADO</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataToCollapse.map((detail, index) => (
                      <TableRow key={index} sx={{ textAlign: 'center', backgroundColor: index % 2 === 0 ? themePalette.BG_COLOR_WEAK_GRAY : 'white' }}>
                        <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>{detail.eppName}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{detail.quantity}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{detail.quantityDelivered}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{detail.quantityPending}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{detail.storeName}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{(detail.emergency.toUpperCase() == 'NORMAL') ? 'Normal' : 'Emergencia'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default Row;
