import { Box, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CabeceraPage from "../../../../components/CabeceraPage";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { CustomSweetAlert, themePalette } from "../../../../config/Theme.config";
import { useLocation, useNavigate } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import TableAddRequerimiento from './Component/TableAddReq.tsx'
import { reactSelectStyles } from "../../../../styles/Fields/reactSelectStyles.ts";
import { dataRequerimiento } from './../../../../api/requerimiento/requerimientoData.ts'
import AsyncSelect from 'react-select/async';


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
  


interface dataOption {
    value: string;
    label: string;
}


const objData = {
    firstData: "EPP",
    secondData: "Registrar Nuevo Requerimiento"
};

export const NewRequerimiento: React.FC = () => {

    const [showData, setShowData] = useState<boolean>(false);
    const [permitirAddRow, setPermitirAddRow] = useState<boolean>(true);


    const [formValues, setFormValues] = useState({
        idrequerimiento: '',
        dni: '',
        costos: null as dataOption | null,
        geografico: null as dataOption | null,
    });

    const [formDataEmployee, setFormDataEmployee] = useState({
        idEmployee: '',
        fullName: '',
        puesto: '',
        organicStructure: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const loadOptions = async (inputValue: string, type: 'costos' | 'geografico') => {

        if (inputValue.length < 4) {
            return [];
        }
        try {

            let dataOptions;
            if (type === 'costos') {
                dataOptions = await dataRequerimiento.getOptionsCostos(inputValue);
                return dataOptions.map((item) => ({
                    value: item.idCostCenter,
                    label: item.name
                }))
            } else if (type === 'geografico') {

                const idCentroCostos = formValues.costos?.value;
                dataOptions = await dataRequerimiento.getOptionsGeographics(inputValue, idCentroCostos);
                return dataOptions.map((item) => ({
                    value: item.idGeographicCenter,
                    label: item.name
                }))
            }

        } catch (error) {
            console.error("Error fetching options", error);
            return [];
        }
    };


    const navigate = useNavigate();
    const sendToListReq = () => {
        navigate('/requerimientos/listRequerimientos');
    }

    const resetDatarequerimiento = () => {
        setFormDataEmployee({
            idEmployee: '',
            fullName: '',
            puesto: '',
            organicStructure: ''
        });
        setShowData(false);
        setPermitirAddRow(true);
    }

    const enterToBuscarEmploye = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            buscarEmployee();
        }
    }

    const buscarEmployee =  useCallback(async () => {
        const nrodocumento = formValues.dni;
        if (nrodocumento.length < 8 || nrodocumento == '') {
            showAlert("¡Atención!","<b>Debe de ingresar dni valido mayor a 8 caracteres</b>", "warning");
            resetDatarequerimiento();
            return
        }

        try {

            const dataEmployee = await dataRequerimiento.getDataEmployeeByDocument(nrodocumento);
            if (dataEmployee) {

                console.log(dataEmployee)

                const updatedFormValues = {
                    ...formValues,
                    costos: { 
                        value: dataEmployee.idCostCenter, 
                        label: dataEmployee.costCenterName
                    }
                };
    
                setFormValues(updatedFormValues);
                
                setFormDataEmployee({
                    idEmployee: dataEmployee.idEmployee,
                    fullName: dataEmployee.fullName,
                    puesto: dataEmployee.positionName,
                    organicStructure: dataEmployee.structureName
                });

                setShowData(true);
            } else {
                console.log(`no existe empleado para el documento ingresado`)
                resetDatarequerimiento();
            }

        } catch (error) {
            console.log(error)
        }

    }, [formValues.dni]);

    // -- cambio en centro geografico

    const changeGeographicCenter = (selectedOption) => {
        setFormValues({ ...formValues, geografico: selectedOption })
        if (selectedOption) {
            setPermitirAddRow(false);
        }else {
            setPermitirAddRow(true);    
        }
    }



    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                        <CabeceraPage isWithBackground={false} objData={objData} toResponsive={true} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{
                        textAlign: "end",
                        mt: "40px",
                        mr: "50px"
                    }}>
                        <IconButton onClick={sendToListReq}>
                            <ArrowCircleLeftIcon sx={{
                                fontSize: "50px",
                                alignItems: "center",
                                color: themePalette.BG_COLOR_GRAY
                            }} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Grid container sx={{ mt: 2 }}>
                <Grid item>
                    <input type="hidden" name="idrequerimiento" value={formValues.idrequerimiento} onChange={handleInputChange} />
                    <input type="hidden" name="idUser" value={formDataEmployee.idEmployee} onChange={handleInputChange} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 3, pl: 2, pr: 2 }}>
                <Grid item xs={12} md={4}>
                    <label htmlFor="dni" style={{ marginBottom: '4px' }}>Ingerse DNI del colaborador</label>
                    <TextField
                        id="dni"
                        type="text"
                        size="small"
                        sx={{ width: '90%' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton sx={{
                                    background: themePalette.BG_COLOR_WEAK_ORANGE,
                                    color: themePalette.BG_COLOR_WHITE,
                                    fontWeight: "bold",
                                    m: "2px",
                                    '&:hover': {
                                        background: themePalette.BG_COLOR_STRONG_ORANGE,
                                    },
                                }}
                                    onClick={buscarEmployee}
                                >
                                    <SearchIcon />
                                </IconButton>
                            )
                        }}
                        inputProps={{
                            maxLength : 15,
                        }}
                        name="dni"
                        value={formValues.dni}
                        onChange={handleInputChange}
                        onKeyPress={enterToBuscarEmploye}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <label htmlFor="costos" style={{ marginBottom: '4px' }}>Centro de Costos</label>
                    <AsyncSelect
                        id="costos"
                        name="costos"
                        loadOptions={(inputValue) => loadOptions(inputValue, 'costos')}
                        defaultOptions
                        placeholder="Escriba busqueda"
                        styles={reactSelectStyles}
                        isClearable
                        value={formValues.costos}
                        onChange={(selectedOption) =>
                            setFormValues({ ...formValues, costos: selectedOption, geografico: null })
                        }
                        noOptionsMessage={() => 'No hay opciones disponibles'}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <label htmlFor="geografico" style={{ marginBottom: '4px' }}>Centro Geográfico</label>
                    <AsyncSelect
                        id="geografico"
                        name="geografico"
                        loadOptions={(inputValue) => loadOptions(inputValue, 'geografico')}
                        defaultOptions
                        placeholder="Escriba busqueda"
                        styles={reactSelectStyles}
                        isClearable
                        value={formValues.geografico}
                        onChange={(selectedOption) => changeGeographicCenter(selectedOption)}
                        noOptionsMessage={() => 'No hay opciones disponibles'}
                        isDisabled={!formValues.costos}

                    />
                </Grid>
            </Grid>

            <Box component="div" sx={{ display: showData ? 'block' : 'none' }}>
                <Grid container
                    sx={{
                        mt: 3,
                        background: themePalette.BG_COLOR_WEAK_PURPLE,
                        p: { xs: 2, md: 3 },
                        justifyContent: "center",
                        textAlign: { xs: "left", md: "center" },
                    }}
                >

                    <Grid item xs={12} md={3} sx={{ mb: { xs: 2, md: 0 } }}>
                        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                            Nombre :
                        </Box>
                        {formDataEmployee.fullName.toUpperCase()}
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ mb: { xs: 2, md: 0 } }}>
                        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                            Puesto :
                        </Box>
                        {formDataEmployee.puesto.toUpperCase()}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box component="span" sx={{ fontWeight: "bold", mr: 1 }}>
                            Estructura Organizacional :
                        </Box>
                        {formDataEmployee.organicStructure.toUpperCase()}
                    </Grid>
                </Grid>
            </Box>


            <TableAddRequerimiento
                key={`${formDataEmployee.idEmployee}-${formValues.geografico?.value}`}
                isNotDisabledAddReq={permitirAddRow}
                idEmployee={formDataEmployee.idEmployee}
                idCosto={formValues.costos}
                idGeografico={formValues.geografico}
            />


        </>
    );
}

