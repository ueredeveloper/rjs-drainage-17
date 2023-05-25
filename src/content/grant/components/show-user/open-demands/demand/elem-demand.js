import React, { useContext, useEffect, useState } from 'react';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TableCell, TableRow } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { findPointsInASystem } from '../../../../../../services';
import { CircularProgress, Fade } from '@mui/material';
import { analyseItsAvaiable } from '../../../../../../tools';
import { SystemContext } from '../../../../../elem-content';

export function ElemDemand({ demand, user, setUser }) {
    // mostrar barra de progresso ao clicar
    const [loading, setLoading] = useState(false);

    const [system, setSystem] = useContext(SystemContext)

    const [age, setAge] = React.useState(1);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function onClick() {
        setLoading((prevLoading) => !prevLoading);

        // setar usuário
        setUser(prev => {
            return {
                ...prev,
                us_nome: demand.us_nome,
                sub_tp_id: demand.sub_tp_id,
                tp_id: demand.sub_tp_id,
                dt_demanda: demand.dt_demanda,
                int_shape: {
                    coordinates: [demand.int_longitude, demand.int_latitude],
                },
                int_latitude: demand.int_latitude,
                int_longitude: demand.int_longitude
            }
        });


        let { sub_tp_id, int_latitude, int_longitude } = demand;
        console.log(sub_tp_id, int_latitude, int_longitude)

        findPointsInASystem(sub_tp_id, int_latitude, int_longitude)
            .then(points => {

                console.log(points)

                let _markers = [user, ...points._points]
                let { _hg_info } = points
                // verificar disponibilidade com o ponto (user) adicionado.
                let _hg_analyse = analyseItsAvaiable(_hg_info, _markers);

                setSystem(prev => {
                    return {
                        ...prev,
                        point: {
                            tp_id: sub_tp_id,
                            lat: int_latitude,
                            lng: int_longitude
                        },
                        markers: _markers,
                        _hg_analyse: _hg_analyse
                    }
                })
            })
            .then(() => { setLoading(false); })
    }

    return (
        <TableRow key="1" sx={{ bgcolor: '#ECECEC' }}>
            <TableCell>{demand.int_latitude}</TableCell>
            <TableCell>{demand.int_longitude}</TableCell>
            {/** mostra vazões em janeiro */}
            {
                demand.dt_demanda.demandas.length !== 0
                    ?
                    <TableCell>{demand.dt_demanda.demandas[0].vazao_lh}</TableCell>
                    :
                    <TableCell>{''}</TableCell>
            }
            {
                demand.dt_demanda.demandas.length !== 0
                    ?
                    <TableCell>{demand.dt_demanda.demandas[0].vazao_ld}</TableCell>
                    :
                    <TableCell>{''}</TableCell>
            }
            <TableCell>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Quantidade</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        {Array.apply(null, Array(10)).map((a, i) => (<MenuItem key={'menu_' + i} value={++i}>{i}</MenuItem>))}

                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex' }}>
                    {loading ? <Fade
                        sx={{ alignSelf: 'center', color: "secondary.main", margin: 1.5 }}
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress size={25} />
                    </Fade>
                        :
                        <IconButton
                            color="secondary"
                            size="large"

                            onClick={() => { onClick() }}>
                            <DoneAllIcon />
                        </IconButton>}
                </Box>
            </TableCell>
        </TableRow>
    )
}