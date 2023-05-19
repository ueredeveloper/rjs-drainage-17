import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Paper, TableContainer } from '@mui/material';

/**
 * Componente de seleção do tipo de poço: 1 - manual (poroso) ou 2 - tubular (fraturado).
 * @param {object} marker - Dados do usuário.
 * @param {function} setData - Hook para atualizar o estado da variável data.
 */
function ElemWellType({ marker, setMarker, setData }) {

  const [tp_id, setTPId] = useState(marker.tp_id);

  /**
   * Manipulador de evento para alterar o tipo de poço.
   * @param {object} event - Objeto de evento.
   */
  const handleChange = (event) => {
    // event.target.value = 1 || 2
    let value = Number(event.target.value);

    setTPId(value);
    let _marker = marker;
    _marker.tp_id = value;

    setData(prev => {
      return {
        ...prev,
        system: {
          ...prev.system,
          markers: [_marker, ...prev.system.markers.slice(1)]
        }
      };
    });

    setMarker(prev => {
      return {
        ...prev,
        tp_id: value
      }
    })

  };

  /**
   * Atualiza o tipo de poço (tp_id) no marcador principal (posição 0 da array de marcadores).
   * 
   */
  useEffect(() => {
    let _marker = marker;
    _marker.tp_id = tp_id;

    setData(prev => {
      return {
        ...prev,
        system: {
          ...prev.system,
          markers: [_marker, ...prev.system.markers.slice(1)]
        }
      };
    });
  }, [tp_id]);

  /**
   * Atualiza o tipo de poço quando o usuário é alterado.
   */
  useEffect(() => {
    setTPId(marker.tp_id);
  
  }, [marker]);

  return (
    <FormControl style={{ display: "flex", flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Tipo do Poço</FormLabel>
      <Paper elevation={3} style={{ margin: 3 }}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={tp_id}
          onChange={handleChange}
          sx={{ display: 'flex', flexFlow: 'row wrap', ml: 1, my: 1 }}
        >
          <FormControlLabel value="1" control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }} color="secondary" />} label="Manual/Tubular Raso" />
          <FormControlLabel value="2" control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }} color="secondary" />} label="Tubular Profundo" />
        </RadioGroup>
      </Paper>
    </FormControl>
  );
}

export default ElemWellType;
