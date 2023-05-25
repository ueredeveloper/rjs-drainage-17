import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { findPointsInASystem } from '../services';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CircularProgress, Fade, Paper, TableContainer } from '@mui/material';
import { analyseItsAvaiable } from '../tools';
import { SystemContext } from './elem-content';
import { initialState } from './initial-state';

/**
 * Componente para entrada de coordenadas latitude e longitude.
 * @returns {JSX.Element} O componente de coordenadas latitude e longitude.
 */
export default function ElemLatLng() {

  // Variável de estado para controlar o status de carregamento
  const [loading, setLoading] = useState(false);
  // Contexto do hooks system (elem-content.js)
  const [context, setContext, map] = useContext(SystemContext);

  /**
   * Manipulador de evento chamado quando o valor do campo de entrada muda.
   * @param {Object} event O evento de mudança.
   */
  const handleChange = (event) => {
    let { name, value } = event.target;

    // Atualiza o contexto com os novos valores de latitude e longitude
    setContext((prev) => {
      return {
        ...prev,
        point: {
          ...prev.point,
          [name]: value,
        },
      };
    });

  };

  /**
   * Manipulador de evento chamado quando o botão de busca de pontos no sistema é clicado.
   * Realiza uma busca assíncrona de pontos no sistema com base nos valores de tipo de poço, latitude e longitude.
   * Atualiza o contexto com os novos pontos encontrados e informações relacionadas.
   */
  async function handle() {
    setLoading((prevLoading) => !prevLoading);
    let { tp_id, lat, lng } = context.point;

    await findPointsInASystem(tp_id, lat, lng)
      .then(points => {
        let markers = [initialState.system.markers[0], ...points._points];
        // verificar disponibilidade com o ponto (marker) adicionado.
        let _hg_analyse = analyseItsAvaiable(points._hg_info, markers);
        // Atualiza o contexto com os novos pontos encontrados, informações do hg_info, hg_shape e hg_analyse
        setContext((prev) => {
          return {
            ...prev,
            markers: markers,
            hg_shape: points._hg_shape,
            hg_info: points._hg_info,
            hg_analyse: _hg_analyse,
          };
        });
      })
      .then(
        // centralizar o mapa na nova coordenada
        //() => { map.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) }) }
      )
      .then(() => { setLoading(false); });
  }

  return (
    <FormControl style={{ display: "flex", flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 0 }}>Coordenadas</FormLabel>
      <Paper elevation={3} style={{ margin: 3 }}>
        {/* Caixas de entrada: latitude e longitude */}
        <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}
        >
          <Box sx={{ display: 'flex', flex: 4, flexDirection: 'row' }}>
            <TextField
              sx={{
                my: 1,
                ml: 1,
                display: 'flex',
                flexGrow: 1
              }}
              label="Latitude"
              color="secondary"
              name="lat"
              value={context.point.lat}
              onChange={handleChange}
              size="small"
            />
            <TextField
              sx={{
                my: 1,
                ml: 1,
                display: 'flex',
                flexGrow: 1,

              }}
              color="secondary"
              label="Longitude"
              name="lng"
              value={context.point.lng}
              onChange={handleChange}
              size="small"
            />
          </Box>
          {/* Botões de Manipulação */}
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
              loading ?
                <Fade
                  sx={{ color: "secondary.main" }}
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
                  <CircularProgress size={25} />
                </Fade>
                :
                <IconButton color="secondary" size="large" onClick={() => { handle().then(() => { setLoading(false); }); }}>
                  <SearchIcon />
                </IconButton>
            }
            <IconButton color="secondary" size="large">
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </FormControl>

  )
}