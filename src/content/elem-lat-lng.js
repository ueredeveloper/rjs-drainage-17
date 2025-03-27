import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import { findPointsInASystem } from '../services';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CircularProgress, Fade, Paper } from '@mui/material';
import { analyseItsAvaiable } from '../tools';
import { SystemContext } from './elem-content';
import AlertContent from "./alert-content"; // Certifique-se de que este componente tenha a lógica de alerta

/**
 * Componente para entrada de coordenadas e busca de pontos em um sistema geográfico.
 * Utiliza contexto para compartilhar estado do sistema e exibe alertas em caso de erro.
 *
 * @returns {JSX.Element} O componente de entrada de coordenadas.
 */
export default function ElemLatLng() {
  const [loading, setLoading] = useState(false);
  const [system, setSystem, map] = useContext(SystemContext);
  const [openAlert, setOpenAlert] = useState(false);
  
  /**
   * Estado para armazenar a mensagem do alerta.
   * @type {string}
   */
  const [alertMessage, setAlertMessage] = useState("");

  /**
   * Estado para armazenar o id do setTimeout (tempo de 4s para o alerta).
   * @type {number | null}
   */
  const [timeoutId, setTimeoutId] = useState(null);

  /**
   * Manipula mudanças nos campos de entrada e formata os valores.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de mudança no campo de entrada.
   */
  const handleChange = (event) => {
    let { name, value } = event.target;
    // Substitui vírgula por ponto e remove espaços em branco nas coordenadas digitadas
    value = value.replace(",", ".").trim().replace(/\s+/g, '');

    // Atualiza a variável system
    setSystem((prev) => ({
      ...prev,
      point: {
        ...prev.point,
        [name]: value,
      },
    }));
  };

  /**
   * Manipula a busca de pontos no sistema com base nas coordenadas fornecidas.
   * Atualiza o estado do sistema e exibe alertas em caso de erro.
   *
   * @async
   */
  async function handle() {
    setLoading(true);
    let { tp_id, lat, lng } = system.point;

    try {
      const points = await findPointsInASystem(tp_id, lat, lng);
      let markers = [
        { int_latitude: lat, int_longitude: lng, dt_demanda: { demandas: [] } },
        ...points._points || []
      ];

      if (points.code !== "XX000") {
        let _hg_analyse = analyseItsAvaiable(points._hg_info, markers);
        setSystem((prev) => ({
          ...prev,
          markers: markers,
          hg_shape: points._hg_shape,
          hg_info: points._hg_info,
          hg_analyse: _hg_analyse,
        }));
      } else {
        setAlertMessage("Coordenadas inválidas. Verifique a latitude e longitude!");
        setOpenAlert(true);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          setOpenAlert(false);
        }, 4000);

        setTimeoutId(newTimeoutId);
      }
    } catch (error) {
      setAlertMessage("Falha na requisição. Verifique a latitude e longitude!");
      setOpenAlert(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setOpenAlert(false);
      }, 4000);

      setTimeoutId(newTimeoutId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormControl style={{ display: "flex", flexDirection: 'column' }}>
      {/* Componente de alerta */}
      <AlertContent openAlert={openAlert} alertMessage={alertMessage} setOpen={setOpenAlert} />

      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 0 }}>Coordenadas</FormLabel>
      <Paper elevation={3} style={{ margin: 3 }}>
        <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>
          <Box sx={{ display: 'flex', flex: 4, flexDirection: 'row' }}>
            <TextField
              sx={{ my: 1, ml: 1, display: 'flex', flexGrow: 1 }}
              label="Latitude"
              color="secondary"
              name="lat"
              value={system.point.lat}
              onChange={handleChange}
              size="small"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handle();
                }
              }}
            />
            <TextField
              sx={{ my: 1, ml: 1, display: 'flex', flexGrow: 1 }}
              color="secondary"
              label="Longitude"
              name="lng"
              value={system.point.lng}
              onChange={handleChange}
              size="small"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handle();
                }
              }}
            />
          </Box>

          {/* Botões */}
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
              <Fade sx={{ color: "secondary.main" }} in={loading} style={{ transitionDelay: loading ? '800ms' : '0ms' }} unmountOnExit>
                <CircularProgress size={25} />
              </Fade>
            ) : (
              <IconButton color="secondary" size="large" onClick={handle}>
                <SearchIcon />
              </IconButton>
            )}
            <IconButton color="secondary" size="large">
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </FormControl>
  );
}
