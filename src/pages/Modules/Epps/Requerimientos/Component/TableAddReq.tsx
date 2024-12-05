import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Checkbox,
    IconButton,
    Box,
    Paper,
    TableFooter
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import './../../../../../styles/components/TableAddReq/index.css'
import { CustomSweetAlert, themePalette } from '../../../../../config/Theme.config';
import AsyncSelect from 'react-select/async';
import { dataRequerimiento } from './../../../../../api/requerimiento/requerimientoData'
import { reactSelectStyles } from '../../../../../styles/Fields/reactSelectStyles';
import { useNavigate } from 'react-router';

interface Row {
    id: string;
    emergency: boolean;
    epp: string;
    quantity: string;
    warehouse: string;
}

interface Option {
    label: string;
    value: string;
}

interface TableAddRequerimientoProps {
    isNotDisabledAddReq: boolean,
    idEmployee: string,
    idCosto: string,
    idGeografico: string
}

const showAlert = (
    titulo: string,
    mssg: string,
    tipo: "success" | "error" | "warning" | "info"
  ) => {
    CustomSweetAlert.fire({
      title: titulo,
      html: mssg,
      icon: tipo,
      showConfirmButton: true,
      confirmButtonText: "Entendido",
    });
  };

const TableAddRequerimiento: React.FC<TableAddRequerimientoProps> = ({ isNotDisabledAddReq, idEmployee, idCosto, idGeografico }) => {
    const [rows, setRows] = useState<Row[]>([]);
    const [comment, setComment] = useState('');
    const refs = useRef<{ [key: string]: any }>({});

    const generateRandomId = (): string => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomStr}`;
    };

    const navigate = useNavigate();


    useEffect(() => {
        // console.log('idEmployee cambió:', idEmployee);
        // console.log('idCosto cambió:', idCosto);
        // console.log('idGeografico cambió:', idGeografico);
    }, [idEmployee, idCosto, idGeografico]);




    const resetValues = () => {
        setRows([]);
        setComment('');
    };

    const addRow = (): void => {
        const newRow: Row = {
            id: generateRandomId(),
            emergency: false,
            epp: '',
            quantity: '',
            warehouse: ''
        };
        setRows([...rows, newRow]);
    };


    const handleInputChange = (id: string, field: keyof Row, value: string | boolean): void => {
        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
    
        // Solo para el campo de almacen y haga el agregado de los mismos abajo de donde estamos
        if (field === 'warehouse' && value !== '') {
            
            const rowIndex = updatedRows.findIndex(row => row.id === id);
            console.log(rowIndex)
    
            // Verifica si no hay una fila debajo de la fila en donde estamos
            if (rowIndex === updatedRows.length - 1) {
                const newRow: Row = {
                    id: generateRandomId(),
                    emergency: false,
                    epp: '',
                    quantity: '',
                    warehouse: ''
                };
    
                setRows([...updatedRows, newRow]);

                 // Enfocar el campo EPP de la nueva fila
                 setTimeout(() => {
                    const newRowId = newRow.id;
                    if (refs.current[newRowId]) {
                        refs.current[newRowId].focus(); // Enfocar el AsyncSelect
                    }
                }, 0);


            }
        }
    };


    const deleteRow = (id: string): void => {
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
    };

    // Función para cargar opciones de EPP
    const loadEppOptions = useCallback(async (inputValue: string): Promise<Option[]> => {
        if (inputValue.length < 4) {
            return [];
        }
        try {
            const dataEpp = await dataRequerimiento.getEppByIdUser(inputValue,idEmployee);
            return dataEpp.map((item) => ({
                value: item.idEpp,
                label: item.eppName
            }));
        } catch (error) {
            console.error('Error al cargar opciones de EPP:', error);
            return [];
        }
    }, []);

    // Función para cargar opciones de almacén
    const loadWarehouseOptions = useCallback(async (inputValue: string ): Promise<Option[]> => {
        if (inputValue.length < 4) {
            return [];
        }

        if (!idGeografico) {
            console.log('ID Geográfico no disponible aún');
            return [];
        }
        try {
            const dataAlmacen = await dataRequerimiento.getOptionsAlmacen(inputValue,idGeografico.value);
            return dataAlmacen.map((item) => ({
                value: item.idStore,
                label: item.name
            }));
        } catch (error) {
            console.error('Error al cargar opciones de almacén:', error);
            return [];
        }
    }, []);

    const TieneEmergenciaSel = () => {
        return rows.some(row => row.emergency);
    };

    useEffect(() => {
        resetValues();
    }, [idEmployee]);



    // Función para guardar los datos
    const handleSave = () => {


        CustomSweetAlert.fire({
            title: '¡Atención!',
            html: `<b>¿Esta seguro de registrar este nuevo requerimiento?</b>`,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Sí, sí deseo",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {

                const transformedDetails = rows.map(row => ({
                    emergency: row.emergency ? "1" : "0",
                    idEpp: row.epp, 
                    quantity: parseInt(row.quantity, 10), 
                    idStore: row.warehouse 
                }));
        
                const dataToSave = {
                    details : transformedDetails,
                    comment : comment,
                    idCostCenter : idCosto.value,
                    idGeographicCenter : idGeografico.value,
                    idEmployee : idEmployee
                };

                const { bandSuccess, mssgError } = validar_campos_obligatorios(dataToSave);
                if (!bandSuccess) {
                    showAlert("¡Atención!", mssgError, "warning");
                    return false;
                }

                const data = await dataRequerimiento.postNewRequerimiento(dataToSave);

                if(data?.status == 200 ) {
                    showAlert("¡Éxito!", data.data.message, "success");
                    navigate('/requerimientos/listRequerimientos');
                }      
            }
          });

    };



    const validar_campos_obligatorios = (data) => {
        let mssgError = '';
        let bandSuccess = true;
    
        if (!data.idEmployee) {
            mssgError += `<li><b>El campo empleado es obligatorio.</b></li>`;
            bandSuccess = false;
        }
    
        if (!data.idCostCenter) {
            mssgError += `<li><b>El campo centro de costos  es obligatorio.</b></li>`;
            bandSuccess = false;
        }
    
        if (!data.idGeographicCenter) {
            mssgError += `<li><b>El campo centro geográfico es obligatorio.</b></li>`;
            bandSuccess = false;
        }
    
        // Validación de details
        if (!data.details || data.details.length === 0) {
            mssgError += `<li><b>Debe contener al menos un detalle en la lista.</b></li>`;
            bandSuccess = false;
        } else {
            data.details.forEach((detail, index) => {
                if (!detail.idEpp) {
                    mssgError += `<li><b>El detalle ${index + 1} no tiene un EPP  especificado.</b></li>`;
                    bandSuccess = false;
                }
                if (!detail.quantity || detail.quantity <= 0) {
                    mssgError += `<li><b>El detalle ${index + 1} debe tener una cantidad  válida mayor a 0.</b></li>`;
                    bandSuccess = false;
                }
                if (!detail.idStore) {
                    mssgError += `<li><b>El detalle ${index + 1} no tiene un almacén  especificado.</b></li>`;
                    bandSuccess = false;
                }
                if (typeof detail.emergency === "undefined") {
                    mssgError += `<li><b>El detalle ${index + 1} no tiene especificado si es emergencia.</b></li>`;
                    bandSuccess = false;
                }
            });
        }

        return { bandSuccess, mssgError };
    };




    return (
        <Box sx={{
            overflowX: 'auto', width: '100%',
            padding: 2,
            maxWidth: { xs: '420px', sm: '720px', md: '100%' },
        }}>
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: "center",
                    height: '350px'
                }}
                elevation={0}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='style-head-row'>Pedido de emergencia</TableCell>
                            <TableCell className='style-head-row'>EPP solicitante</TableCell>
                            <TableCell className='style-head-row'>Cantidad</TableCell>
                            <TableCell className='style-head-row'>Almacén</TableCell>
                            <TableCell className='style-head-row'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className='style-center-elements'>
                                    <Checkbox
                                        checked={row.emergency}
                                        onChange={(e) => handleInputChange(row.id, 'emergency', e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell sx={{ border: 'none', justifyContent: 'center', alignItems: 'center' }} >
                                    <AsyncSelect
                                        ref={(ref) => (refs.current[row.id] = ref)} // Asignar referencia única por fila
                                        defaultOptions
                                        loadOptions={loadEppOptions}
                                        onChange={(selectedOption) => handleInputChange(row.id, 'epp', selectedOption?.value || '')}
                                        styles={reactSelectStyles}
                                        isClearable
                                        placeholder="Escriba busqueda"
                                        noOptionsMessage={() => 'No hay opciones disponibles'}
                                    />
                                </TableCell>
                                <TableCell sx={{ border: 'none', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                                    <TextField
                                        type="number"
                                        size='small'
                                        value={row.quantity}
                                        onChange={(e) => handleInputChange(row.id, 'quantity', e.target.value)}
                                        sx={{ minWidth: '100px' }}
                                    />
                                </TableCell>
                                <TableCell sx={{ border: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <AsyncSelect
                                        defaultOptions
                                        loadOptions={loadWarehouseOptions}
                                        onChange={(selectedOption) => {
                                            handleInputChange(row.id, 'warehouse', selectedOption?.value || '')
                                        }}
                                        styles={reactSelectStyles}
                                        isClearable
                                        placeholder="Escriba busqueda"
                                        noOptionsMessage={() => 'No hay opciones disponibles'}
                                    />
                                </TableCell>
                                <TableCell sx={{ border: 'none', justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton onClick={() => deleteRow(row.id)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                    <TableFooter>
                        <TableRow sx={{ textAlign: 'center', border: 'none' }}>
                            <TableCell align="center" colSpan={5} sx={{ border: 'none', justifyContent: 'center', textAlign: 'center', mt: 3 }}>
                                <Button
                                    variant="btnPrimeroCustomInvertNormal"
                                    color="warning"
                                    onClick={addRow}
                                    sx={{ mr: 1 }}
                                    disabled={isNotDisabledAddReq}
                                >
                                    <AddIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>
            </TableContainer>

            {TieneEmergenciaSel() && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                    <TextField
                        label="Comentario"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 450 }}
                    />
                </Box>
            )}


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
            }}>

                <Button
                    variant="btnPrimeroCustomNormal"
                    color="primary"
                    onClick={handleSave}
                    disabled={isNotDisabledAddReq}
                >
                    <SaveIcon sx={{ mr: 1 }} />
                    Guardar
                </Button>
            </Box>
        </Box>
    );
}

export default TableAddRequerimiento;