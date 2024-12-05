import React, { useEffect, useState } from 'react';
import { Drawer, Box, Button, Typography, Grid, TextField } from '@mui/material';
import { reactSelectStyles } from '../styles/Fields/reactSelectStyles.ts';
import AsyncSelect from 'react-select/async';
import { matrizData } from '../api/matriz/matrizData.ts';
import { CustomSweetAlert } from '../config/Theme.config.tsx';

interface RightDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    idrow?: number | undefined | null;
    reloadTable: () => void;
}

interface Option {
    value: number | string;
    label: string;
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

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, idrow, reloadTable }) => {

    const [formValues, setFormValues] = useState({
        puesto: null as Option | null,
        gerencia: null as Option | null,
        area: null as Option | null,
        departamento: null as Option | null,
        epp: null as Option | null,
        vidamax: null as number | null,
        idmatrix: null as string | null,
    });

    useEffect(() => {
        if (isOpen) {
            const loadData = async () => {
                try {
                    const data = await matrizData.getDataMatrizById(idrow);

                    if (data) {

                        setFormValues({
                            puesto: { value: data.idPosition, label: data.positionName },
                            gerencia: { value: data.organicStructure[0].idOrganicStructure, label: data.organicStructure[0].name },
                            area: { value: data.organicStructure[1].idOrganicStructure, label: data.organicStructure[1].name },
                            departamento: { value: data.organicStructure[2].idOrganicStructure, label: data.organicStructure[2].name },
                            epp: { value: data.idEpp, label: data.eppName },
                            vidamax: data.lifeTime,
                            idmatrix: data.idEppMatrix

                        });

                    } else {
                        onClose();
                    }

                } catch (error) {
                    console.log(error);
                }
            };
            resetFormValues();
            loadData();

        }
    }, [isOpen, idrow]);

    const resetFormValues = () => {
        setFormValues({
            puesto: null,
            gerencia: null,
            area: null,
            departamento: null,
            epp: null,
            vidamax: null,
            idmatrix: null,

        });
    };

    const handleClose = () => {
        resetFormValues();
        onClose();
    };

    // --- validar campos llenos 

    const validar_campos_obligatorios = () => {
        let mssgError = '';
        let bandSuccess = true;

        if (formValues.puesto == null) {
            mssgError += `<li><b>El campo puesto es obligatorio.</b></li>`;
            bandSuccess = false;
        }

        if (formValues.departamento == null) {
            mssgError += `<li><b>El campo departamento es obligatorio.</b></li>`;
            bandSuccess = false;
        }

        if (formValues.epp == null) {
            mssgError += `<li><b>El campo de Epp es obligatorio.</b></li>`;
            bandSuccess = false;
        }

        if (formValues.vidamax == 0 || formValues.vidamax == null  ) {
            mssgError += `<li><b>El campo tiempo de vida no puede ser vacio.</b></li>`;
            bandSuccess = false;
        }

        return { bandSuccess, mssgError };
    }


    const handleSave = async () => {

        CustomSweetAlert.fire({
            title: '¡Atención!',
            html: `<b>¿Esta seguro que desea guardar los cambios?</b>`,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Entendido",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    // --- validar antes de enviar

                    const { bandSuccess, mssgError } =  validar_campos_obligatorios();

                    if (bandSuccess) {
                        const resultSend = {
                            idEppMatrix: formValues.idmatrix,
                            idOrganicStructure: formValues.departamento?.value,
                            idPosition: formValues.puesto?.value,
                            idEpp: formValues.epp?.value,
                            lifeTime: formValues.vidamax
                        }

                        console.log(resultSend)
    
                        const data = await matrizData.putMatrizById(resultSend);
                        if (data?.status == 200) {
                            await showAlert("¡Éxito!", `<b>${data.data.message}</b>`, "success");
                            await reloadTable();
                            await onClose();
                        }
                    }else {
                        showAlert("¡Atención!", `<b>${mssgError}</b>`, "warning");
                    }

               
                } catch (error) {
                    console.log(error);
                }
            }
        });

    };

    // -- nuevas funciones para uso del modal 

    const loadOptions = async (inputValue: string, type: string, categoriaId?: number) => {
        if (inputValue.length < 3) return [];

        let dataOptions = [];

        if (type === 'puesto') {
            const data = await matrizData.getOptionsPuesto(inputValue);
            dataOptions = data.map((item) => ({ value: item.idPosition, label: item.name }));
        }
        else if (type === 'gerencia') {
            const data = await matrizData.getOptionsGerencia(inputValue);
            dataOptions = data.map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        } else if (type === 'area') {
            const data = await matrizData.getOptionsArea(inputValue);
            dataOptions = data.filter(item => item.idParent == formValues.gerencia?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        } else if (type === 'departamento') {
            const data = await matrizData.getOptionsDepartamento(inputValue);
            dataOptions = data.filter(item => item.idParent == formValues.area?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        }
        // else if (type === 'categoria') {
        //     const data = await matrizData.getOptionsCategoria(inputValue);
        //     dataOptions = data.map((item) => ({ value: item.idEppCategory, label: item.name }));
        else if (type === 'epp') {
            // const data = await eppMatriz.getEppsByCategoryId(categoriaId);
            // dataOptions = data.map((item) => ({ value: item.id_epp, label: item.name }));
            const data = await matrizData.getOptionsEpps(inputValue);
            dataOptions = data.map((item) => ({ value: item.idEpp, label: item.name }));
        }
        // return dataOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        return dataOptions;
    };

    // -- para hacer un disble de los select de el edit
    const changeGerencia = (selected) => {
       
        formValues.gerencia = null
        formValues.area = null
        formValues.departamento = null
        setFormValues(prev => ({ ...prev, gerencia: selected }))
    }



    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={handleClose}
            disableEscapeKeyDown
            ModalProps={{
                keepMounted: true,
            }}
            BackdropProps={{
                onClick: (e) => e.stopPropagation(),
            }}
        >
            <Box
                sx={{
                    width: { xs: 350, md: 625 },
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                role="presentation"
            >
                <Grid container sx={{ mt: 2, justifyContent: 'center', textAlign: 'start' }}>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <Typography variant="h5" component="h2">
                            Editar EPP
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <label htmlFor="puesto">Puesto</label>
                        <AsyncSelect
                            id='puesto'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'puesto')}
                            value={formValues.puesto}
                            onChange={(selected) => setFormValues(prev => ({ ...prev, puesto: selected }))}
                            placeholder="Seleccione Puesto"
                            isClearable
                            styles={reactSelectStyles}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <label htmlFor="gerencia">Gerencia</label>
                        <AsyncSelect
                            id='gerencia'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'gerencia')}
                            value={formValues.gerencia}
                            onChange={(selected) => changeGerencia(selected) }
                            placeholder="Seleccione gerencia"
                            isClearable
                            styles={reactSelectStyles}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />


                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <label htmlFor="area">Área</label>
                        <AsyncSelect
                            id='area'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'area')}
                            value={formValues.area}
                            onChange={(selected) => setFormValues(prev => ({ ...prev, area: selected }))}
                            placeholder="Seleccione area"
                            isClearable
                            styles={reactSelectStyles}
                            isDisabled={!formValues.gerencia}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 4 }}>

                        <label htmlFor="departamento">Departamento</label>
                        <AsyncSelect
                            id='departamento'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'departamento')}
                            value={formValues.departamento}
                            onChange={(selected) => setFormValues(prev => ({ ...prev, departamento: selected }))}
                            placeholder="Seleccione departamento"
                            isClearable
                            styles={reactSelectStyles}
                            isDisabled={!formValues.area}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />

                    </Grid>

                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <label htmlFor="epp">Epp</label>
                        <AsyncSelect
                            id='epp'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'epp')}
                            value={formValues.epp}
                            onChange={(selected) => setFormValues(prev => ({ ...prev, epp: selected }))}
                            placeholder="Seleccione epp"
                            isClearable
                            styles={reactSelectStyles}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />

                    </Grid>

                    <Grid item xs={12} sx={{ mb: 4 }}>

                        <label htmlFor="vidamax">Tiempo de vida</label>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="Ingrese tiempo de vida"
                            type="number"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            fullWidth
                            value={formValues.vidamax || ''}
                            onChange={(e) => setFormValues(prev => ({
                                ...prev,
                                vidamax: e.target.value ? Number(e.target.value) : null
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 4 }}>
                        <TextField
                            size="small"
                            variant="outlined"
                            placeholder="idEppMatrix"
                            type="text"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            fullWidth
                            value={formValues.idmatrix || ''}
                            onChange={(e) =>
                                setFormValues((prev) => ({
                                    ...prev,
                                    idmatrix: e.target.value,
                                }))
                            }
                            style={{ display: 'none' }}
                        />
                    </Grid>


                </Grid>


                <Grid container>
                    <Grid item xs={12}>
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={1}
                            sx={{
                                padding: { xs: 2, md: 3 },
                                overflowX: { xs: 'auto', md: 'unset' },
                                whiteSpace: 'nowrap',
                                maxWidth: { xs: '100vw', md: 'none' }
                            }}>

                            <Button
                                variant="btnPrimeroCustomInvertNormal"
                                color="primary"
                                onClick={onClose}
                            >
                                Cerrar
                            </Button>

                            <Button
                                variant="btnPrimeroCustomNormal"
                                color="primary"
                                onClick={handleSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default RightDrawer;
