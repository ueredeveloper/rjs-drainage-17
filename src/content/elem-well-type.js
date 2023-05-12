import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Paper, TableContainer } from '@mui/material';
/**
* Elemento de escolha do tipo de poço, se 1 - manual (poroso), ou 2 - tubular (fraturado).
* @param tp_id Tipo de poço, se manual ou tubular.
* @param setData Hooks de mudança de estado da variável inicial data.
*/
function ElemWellType({ tp_id, setData }) {

  const [_tp_id, _setTpId] = useState(tp_id);

  const handleChange = (event) => {

    _setTpId(event.target.value);

    setData(prev => {
      return {
        ...prev,
        overlays: {
          ...prev.overlays,
          marker: {
            ...prev.overlays.marker,
            info: {
              ...prev.overlays.marker.info,
              tp_id: _tp_id
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    setData(prev => {
      return {
        ...prev,
        overlays: {
          ...prev.overlays,
          marker: {
            ...prev.overlays.marker,
            info: {
              ...prev.overlays.marker.info,
              tp_id: _tp_id
            }
          }
        }
      }
    });
  }, [_tp_id])
  /**
   * Atualizar o tipo de poço.
   */
  useEffect(()=>{
    _setTpId(tp_id);
  }, [tp_id])

  return (
    <FormControl style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Tipo do Poço</FormLabel>
      <Paper elevation={3} style={{ margin: 0 }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={_tp_id}
        onChange={handleChange}
        sx={{ display: 'flex', flexFlow: 'row wrap', marginLeft: 1, my: 0, ml: 1}}
      >
        <FormControlLabel  value="1" control={<Radio color="secondary" />} label="Manual/Tubular Raso" />
        <FormControlLabel value="2" control={<Radio color="secondary" />} label="Tubular Profundo" />
      </RadioGroup>
      </Paper>
    </FormControl>
  )
}

export default ElemWellType;