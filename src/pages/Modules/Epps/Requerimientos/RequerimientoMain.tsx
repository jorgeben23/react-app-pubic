import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CabeceraPage from "../../../../components/CabeceraPage";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import DataTable from "../../../../components/TableComponent";
import { useHeaders } from "./TableStructure/headers";
import { dataRequerimiento } from './../../../../api/requerimiento/requerimientoData';

const objData = {
  firstData: "EPP",
  secondData: "Requerimientos"
};


export const RequerimientoMain: React.FC = () => {

  const { headers, dataReturn, filtersHeaders } = useHeaders();
  const [dataToTable, setDataToTable] = useState([]);
  const [totalDataToTable, setTotalDataToTable] = useState(0);
  const [isloading, setIsloading] = useState<boolean>(false);

  // -- Variables para filtros totales
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [nroFilasPagina, setNroFilasPagina] = useState<number>(5);
  const [filtrosCabecera, setFiltrosCabecera] = useState({});
  const [filtroTextosIni, setFiltroTextosIni] = useState('');


  const navigate = useNavigate();
  const sendToNewReq = () => {
    navigate('/requerimientos/newRequerimiento');
  }

  // useEffect(() => {
  //   const fetchData = async () => {

  //     setIsloading(true);
  //     setFiltrosCabecera(filtersHeaders);
  //     let filtroTotal = '';
  //       // -- no hay filtro de cabecera seleccionado
  //     filtroTotal = `?page=1&pageSize=5`;
      
  //     // -- si hay filtros de arriba
  //     if (filtroTextosIni.length > 0) {
  //       filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
  //     }
  //     // const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);

  //     const { dataTable = [], nroTotalRows = 0 } = (await dataRequerimiento.getDataRequerimientos(filtroTotal)) || {};

  //     setTotalDataToTable(nroTotalRows);
  //     setDataToTable(dataTable);
  //     setIsloading(false);
  //   }

  //   fetchData();
  // }, [])


  // ==============================================================================================
  // ---- Para todo los que interactua con la tabla ---------------------------------

  // --- Para la paginacion 
  const handlePaginationChange = async (pageInfo: { currentPage: number; rowsPerPage: number }) => {

    let filterAll = '';
    const { currentPage, rowsPerPage } = pageInfo;
    setNroPagina(currentPage);
    setNroFilasPagina(rowsPerPage);

    if (Object.keys(filtrosCabecera).length > 0) {

      const filtrosHeaders = JSON.parse(filtrosCabecera);
      const concatfilter = filtrosHeaders.map(item => `${item.field}=${item.value}`).join('&');
      filterAll = `?${concatfilter}&page=${currentPage}&pageSize=${rowsPerPage}`;

    } else {
      filterAll = `?page=${currentPage}&pageSize=${rowsPerPage}`;

    }

    // -- si hay filtros de arriba
    if (filtroTextosIni.length > 0) {
      filterAll = `${filtroTextosIni}&${filterAll.slice(1)}`;
    }

    setIsloading(true);
    const { dataTable, nroTotalRows } = await dataRequerimiento.getDataByfiltersHeader(filterAll);

    setTotalDataToTable(nroTotalRows);
    setDataToTable(dataTable);
    setIsloading(false);
  }

  useEffect(() => {

    const fetchData = async () => {

      setIsloading(true);
      setFiltrosCabecera(filtersHeaders);
      let filtroTotal = '';

      if (filtersHeaders && typeof filtersHeaders === 'string') {
        try {
          // console.log(JSON.parse(filtersHeaders));
          const filtros = JSON.parse(filtersHeaders);
          const concatHeaderFiltros = filtros.map(item => `${item.field}=${item.value}`).join('&');
          filtroTotal = `?${concatHeaderFiltros}&page=1&pageSize=5`;
        } catch (error) {
          console.log('Error al parsear:', error);
        }
      } else if (filtersHeaders) {
        // -- no hay filtro de cabecera seleccionado
        filtroTotal = `?page=1&pageSize=5`;
      }

      // -- si hay filtros de arriba
      if (filtroTextosIni.length > 0) {
        filtroTotal = `${filtroTextosIni}&${filtroTotal.slice(1)}`;
      }

      // const { dataTable, nroTotalRows } = await baseData.getDataByfiltersHeader(filtroTotal);

      const { dataTable = [], nroTotalRows = 0 } = (await dataRequerimiento.getDataByfiltersHeader(filtroTotal)) || {};

      setTotalDataToTable(nroTotalRows);
      setDataToTable(dataTable);
      setIsloading(false);
    }

    fetchData();

  }, [filtersHeaders]);

  // ==============================================================================================


  return (
    <>


      <Grid container>
        <Grid item xs={12} sm={8}>
          <Box sx={{ mt: 2 }}>
            <CabeceraPage isWithBackground={false} objData={objData} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="flex-end" gap={2} sx={{ padding: { xs: 3, md: 5 } }}>
            <Button
              variant="btnPrimeroCustomNormal"
              color="warning"
              onClick={sendToNewReq}
            >
              <AddIcon sx={{ mr: 1 }} />
              SOLICITUD
            </Button>
          </Box>
        </Grid>
      </Grid>



      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <DataTable
            headers={headers}
            dataRows={dataToTable}
            haveCheckbox={false}
            haveCollapse={true}
            isloading={isloading}
            totalRows={totalDataToTable}
            onPaginationChange={handlePaginationChange}
          />
        </Grid>
      </Grid>
    </>
  );
}

