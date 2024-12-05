import React, { useEffect, useState } from 'react';
import { Drawer, Box, Button, Typography, IconButton, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AsyncSelect from 'react-select/async';
import CloseIcon from '@mui/icons-material/Close';


import { reactSelectStyles } from '../styles/Fields/reactSelectStyles.ts';
import { CustomSweetAlert, themePalette } from '../config/Theme.config.tsx';
import { matrizData } from '../api/matriz/matrizData.ts';


interface RightDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    reloadTable: () => void;
}

interface Option {
    value: number;
    label: string;
}

interface EppItem {
    id: string;
    epp: Option | null;
    tiempoVida: Option | null;
}

interface CategoriaItem {
    id: string;
    categoria: Option | null;
    epps: EppItem[];
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

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, reloadTable }) => {
    const [formValues, setFormValues] = useState({
        puesto: null as Option | null,
        gerencia: null as Option | null,
        area: null as Option | null,
        departamento: null as Option | null,
        categorias: [] as CategoriaItem[]
    });

    useEffect(() => {
        if (isOpen) {
            resetFormValues();
        }
    }, [isOpen]);

    const resetFormValues = () => {
        setFormValues({
            puesto: null,
            gerencia: null,
            area: null,
            departamento: null,
            categorias: [],
        });
    };

    const handleClose = () => {
        resetFormValues();
        onClose();
    };



    const loadOptions = async (inputValue: string, type: string, categoriaId?: string) => {
        if (inputValue.length < 3) return [];

        let dataOptions = [];

        if (type === 'puesto') {
            const data = await matrizData.getOptionsPuesto(inputValue);
            dataOptions = data.map((item) => ({ value: item.idPosition, label: item.name }));
        } else if (type === 'gerencia') {
            const data = await matrizData.getOptionsGerencia(inputValue);
            dataOptions = data.map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        } else if (type === 'area') {
            const data = await matrizData.getOptionsArea(inputValue);
            dataOptions = data.filter(item => item.idParent == formValues.gerencia?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        } else if (type === 'departamento') {
            const data = await matrizData.getOptionsDepartamento(inputValue);
            dataOptions = data.filter(item => item.idParent == formValues.area?.value).map((item) => ({ value: item.idOrganicStructure, label: item.name }));
        } else if (type === 'categoria') {
            const data = await matrizData.getOptionsCategoria(inputValue);
            dataOptions = data.map((item) => ({ value: item.idEppCategory, label: item.name }));
        } else if (type === 'epp') {
            if (categoriaId) {
                const data = await matrizData.getEppsByIdCategoria(inputValue, categoriaId);
                dataOptions = data.map((item) => ({ value: item.idEpp, label: item.name }));
            } else {
                showAlert("¡Atención!", `<b>Categoría no seleccionada para cargar EPPs</b>`, "warning");
                return [];
            }
        } else if (type === 'tiempo') {
            const data = await tiempoMatriz.getAll();
            dataOptions = data.map((item) => ({ value: item.id_time, label: item.name }));
        }

        // return dataOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
        return dataOptions;
    };




    const handleGerenciaChange = (selected: Option | null) => {
        setFormValues(prev => ({ ...prev, gerencia: selected, area: null, departamento: null }));
    };

    const handleAreaChange = (selected: Option | null) => {
        setFormValues(prev => ({ ...prev, area: selected, departamento: null }));
    };

    const handleCategoriaChange = (categoriaId: string, selected: Option | null) => {

        const categoriaAlreadyExists = formValues.categorias.some(
            cat => cat.id !== categoriaId && cat.categoria?.value === selected?.value
        );
    
        if (categoriaAlreadyExists) {
            showAlert(
                "¡Atención!", 
                `<b>La categoría seleccionada ya existe en la lista.</b>`, 
                "warning"
            );
            return;
        }

        

        setFormValues(prev => ({
            ...prev,
            categorias: prev.categorias.map(cat =>
                cat.id === categoriaId ? { ...cat, categoria: selected } : cat
            )
        }));
    };

    const addEppItem = (categoriaId: string) => {
        setFormValues(prev => ({
            ...prev,
            categorias: prev.categorias.map(cat =>
                cat.id === categoriaId
                    ? { ...cat, epps: [...cat.epps, { id: Math.random().toString(36).substr(2, 9), epp: null, tiempoVida: null }] }
                    : cat
            )
        }));
    };


    const removeEppItem = (categoriaId: string, eppId: string) => {
        setFormValues(prev => ({
            ...prev,
            categorias: prev.categorias.map(cat =>
                cat.id === categoriaId
                    ? { ...cat, epps: cat.epps.filter(epp => epp.id !== eppId) }
                    : cat
            )
        }));
    };

    const addCategoriaItem = () => {
        setFormValues(prev => ({
            ...prev,
            categorias: [...prev.categorias, {
                id: Math.random().toString(36).substr(2, 9),
                categoria: null,
                epps: [{ id: Math.random().toString(36).substr(2, 9), epp: null, tiempoVida: null }]
            }]
        }));
    };

    const removeCategoriaItem = (categoriaId: string) => {
        setFormValues(prev => ({
            ...prev,
            categorias: prev.categorias.filter(cat => cat.id !== categoriaId)
        }));
    };

    const handleSave = async () => {

        CustomSweetAlert.fire({
            title: '¡Atención!',
            html: `<b>¿Esta seguro que desea guardar?</b>`,
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Entendido",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const { bandSuccess, mssgError } = validar_campos_obligatorios();
                if (!bandSuccess) {
                    showAlert("¡Atención!", mssgError, "warning");
                    return false;
                }

                const resultAjustado = {
                    idOrganicStructure: formValues.departamento?.value,
                    idPosition: formValues.puesto?.value,
                    listEpp: formValues.categorias.flatMap(categoria =>
                        categoria.epps.map(epp => ({
                            idEpp: epp.epp?.value,
                            lifeTime: epp.tiempoVida
                        }))
                    )
                };

                const data = await matrizData.postRegisterNewMatriz(resultAjustado);
                if ( data?.status == 200){
                    await showAlert("¡Éxito!",`<b>${data.data.message}</b>`,"success");
                    await reloadTable();
                    await onClose();
                }
            }
        });
    };

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

        if (formValues.categorias.length === 0) {
            mssgError += `<li><b>Debe contener al menos un listado de Epps.</b></li>`;
            bandSuccess = false;
        } else {
            for (let i = 0; i < formValues.categorias.length; i++) {
                const categoria = formValues.categorias[i];
                if (categoria.categoria === null) {
                    mssgError += `<li><b>La categoría ${i + 1} no tiene una categoría seleccionada.</b></li>`;
                    bandSuccess = false;
                }
                for (let j = 0; j < categoria.epps.length; j++) {
                    const epp = categoria.epps[j];
                    if (epp.epp === null) {
                        mssgError += `<li><b>La categoría ${i + 1}, EPP ${j + 1} no tiene un EPP seleccionado.</b></li>`;
                        bandSuccess = false;
                    }
                    if (epp.tiempoVida === null) {
                        mssgError += `<li><b>La categoría ${i + 1}, EPP ${j + 1} no tiene un tiempo de vida seleccionado.</b></li>`;
                        bandSuccess = false;
                    }
                }
            }
        }


        return { bandSuccess, mssgError };
    }

    const handleEppChange = (categoriaId: string, eppId: string, selected: Option | null) => {

        // Validar si el EPP ya existe en la lista antes de agregarlo
        if (eppAlreadyExists(categoriaId, eppId, selected?.value)) {
            showAlert(
                "¡Atención!",
                `<b>El EPP seleccionado ya existe en la lista.</b>`,
                "warning"
            );
            return;
        }

        setFormValues((prev) => ({
            ...prev,
            categorias: prev.categorias.map((cat) =>
                cat.id === categoriaId
                    ? { ...cat, epps: cat.epps.map((e, i) => (e.id === eppId ? { ...e, epp: selected } : e)) }
                    : cat
            ),
        }));
    };

    const eppAlreadyExists = (categoriaId: string, eppId: string, idEpp: number) => {

        return formValues.categorias.some((categoria) => {
            if (categoria.id === categoriaId) {
                return categoria.epps.some((epp) => epp.id !== eppId && epp.epp?.value === idEpp);
            }
            return false;
        });
    };

    // -- funcion para hacer el change de los valores traidos de la api al cambiar el puesto si es que hubiera

    const changeValueToOrganicByPuesto = async (selected) => {


        try {

            if (selected && selected.value) {

                const data = await matrizData.getOrganicByPositionId(selected.value);
    
                if (data.length > 0) {
                    setFormValues({
                        puesto: selected,
                        gerencia: {value: data[0]['idOrganicStructure'], label: data[0]['name'] },
                        area: {value: data[1]['idOrganicStructure'], label: data[1]['name'] },
                        departamento: {value: data[2]['idOrganicStructure'], label: data[2]['name'] },
                        categorias: []
                    });
                }else {
                    setFormValues({
                        puesto: selected || null,
                        gerencia: null,
                        area: null,
                        departamento: null,
                        categorias: []
                    });
                }
                
            }else {
                setFormValues({
                    puesto: null,
                    gerencia: null,
                    area: null,
                    departamento: null,
                    categorias: []
                });
            }

        } catch (error) {
            console.log(error);
        }

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
                    width: { xs: 350, md: 800 },
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                role="presentation"
            >
                <Grid container sx={{ mt: 2, justifyContent: 'center', textAlign: 'start' }}>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <Typography variant="h5" component="h2">
                            Registro de Matriz
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <label htmlFor="puesto">Puesto</label>
                        <AsyncSelect
                            id='puesto'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'puesto')}
                            value={formValues.puesto}
                            onChange={(selected) => changeValueToOrganicByPuesto(selected)}
                            isClearable
                            placeholder="Seleccione Puesto"
                            styles={reactSelectStyles}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <label htmlFor="gerencia">Gerencia</label>
                        <AsyncSelect
                            id='gerencia'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'gerencia')}
                            value={formValues.gerencia}
                            onChange={handleGerenciaChange}
                            placeholder="Seleccione Gerencia"
                            isClearable
                            styles={reactSelectStyles}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <label htmlFor="area">Área</label>
                        <AsyncSelect
                            id='area'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'area')}
                            value={formValues.area}
                            onChange={handleAreaChange}
                            placeholder="Seleccione Área"
                            isClearable
                            styles={reactSelectStyles}
                            isDisabled={!formValues.gerencia}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <label htmlFor="departamento">Departamento</label>
                        <AsyncSelect
                            id='departamento'
                            loadOptions={(inputValue) => loadOptions(inputValue, 'departamento')}
                            value={formValues.departamento}
                            onChange={(selected) => setFormValues(prev => ({ ...prev, departamento: selected }))}
                            placeholder="Seleccione Departamento"
                            isClearable
                            styles={reactSelectStyles}
                            isDisabled={!formValues.area}
                            noOptionsMessage={() => 'No hay opciones disponibles'}
                        />
                    </Grid>
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: 'calc(100% - 160px)',
                        mb: 2,
                    }}>
                        {formValues.categorias.map((categoriaItem, index) => (
                            <Box
                                sx={{
                                    border: `2px dashed ${themePalette.BG_COLOR_STRONG_ORANGE}`,
                                    borderRadius: '8px',
                                    padding: '16px',
                                    mt: 2,
                                    position: 'relative',
                                }}
                                key={categoriaItem.id}
                            >
                                <IconButton
                                    onClick={() => removeCategoriaItem(categoriaItem.id)}
                                    sx={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        color: themePalette.BG_COLOR_STRONG_ORANGE,
                                        mb: 2
                                    }}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={12}>
                                        <label htmlFor="categoria">Categoria</label>
                                        <AsyncSelect
                                            id='categoria'
                                            loadOptions={(inputValue) => loadOptions(inputValue, 'categoria')}
                                            value={categoriaItem.categoria}
                                            onChange={(selected) => handleCategoriaChange(categoriaItem.id, selected)}
                                            placeholder="Seleccione Categoria"
                                            isClearable
                                            styles={reactSelectStyles}
                                            noOptionsMessage={() => 'No hay opciones disponibles'}
                                        />
                                    </Grid>
                                    {categoriaItem.epps.map((eppItem, eppIndex) => (
                                        <React.Fragment key={eppItem.id}>
                                            <Grid item xs={8}>
                                                <label htmlFor="epp">EPP</label>
                                                <AsyncSelect
                                                    id='epp'
                                                    loadOptions={(inputValue) => loadOptions(inputValue, 'epp', categoriaItem.categoria?.value)}
                                                    value={eppItem.epp}
                                                    onChange={(selected) => handleEppChange(categoriaItem.id, eppItem.id, selected)}
                                                    placeholder="EPP"
                                                    isClearable
                                                    styles={reactSelectStyles}
                                                    noOptionsMessage={() => 'No hay opciones disponibles'}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <label htmlFor="tiempo">Tiempo de vida</label>
                                                <TextField
                                                    id="tiempo-vida"
                                                    type="number"
                                                    size="small"
                                                    variant="outlined"
                                                    value={eppItem.tiempoVida !== null && eppItem.tiempoVida !== undefined ? eppItem.tiempoVida : ''}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : null;
                                                        setFormValues(prev => ({
                                                            ...prev,
                                                            categorias: prev.categorias.map((cat) =>
                                                                cat.id === categoriaItem.id ? {
                                                                    ...cat,
                                                                    epps: cat.epps.map((e, i) =>
                                                                        i === eppIndex ? { ...e, tiempoVida: newValue } : e
                                                                    )
                                                                } : cat
                                                            )
                                                        }));
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton onClick={() => removeEppItem(categoriaItem.id, eppItem.id)} sx={{ color: themePalette.BG_COLOR_WEAK_ORANGE, mt: 3 }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            variant="btnPrimeroCustomNormal"
                                            color="primary"
                                            sx={{
                                                width: '1px !important',
                                                height: '12px !important',
                                                textAlign: 'center !important'
                                            }}
                                            onClick={() => addEppItem(categoriaItem.id)}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sx={{ justifyContent: 'center', textAlign: 'center' }}>
                        <Button
                            variant="btnPrimeroCustomInvertNormal"
                            color="warning"
                            onClick={addCategoriaItem}
                        >
                            <AddIcon />
                        </Button>
                    </Grid>
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