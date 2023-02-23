import React, { useState } from 'react';
import { initialState } from '../initial-state'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';


function ElemMapControllers({ data, setData }) {

  const [checked, setChecked] = useState([false, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, checked[1]]);
    _setDataChecked(event.target.name, event.target.checked)
  };

  const handleChange2 = (event) => {
    setChecked([checked[0], event.target.checked]);
    _setDataChecked(event.target.name, event.target.checked)
  };

  const handleChange3 = (event) => {
    setChecked([false, false]);
    _setMapNull()
  };

  /**
   * Mudar estado dos botões checkbox e assim verificar se é para retirar ou adicionar shapes no mapa.
   *
   */
  function _setDataChecked(shape, checked) {
    setData(prev => {
      return checked ? {
        ...prev,
        shapes: {
          ...prev.shapes,
          ...prev.shapes[shape].checked = checked,

        }
      } : {
        ...prev,
        shapes: {
          ...prev.shapes,
          [shape]: { checked: checked, shapes: [] }
        }
      }
    }

    )
  }

  function _setMapNull() {
    /* retirar figuras desenhadas no mapa */
    data.overlays.circles.forEach(c => {
      c.draw.setMap(null);
    });
    data.overlays.polygons.forEach(c => {
      c.draw.setMap(null);
    });
    data.overlays.rectangles.forEach(c => {
      c.draw.setMap(null);
    });
    /* limpar objetos */
    setData(prev => {
      return {
        ...prev,
        overlays: initialState().overlays,
        system: initialState().system,
        shapes: initialState().shapes,

      }
    });
  }

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Shapes</FormLabel>
      <Box>
        <Checkbox name="poroso" checked={checked[0]} onChange={handleChange1} />
        <FormLabel id="demo-controlled-radio-buttons-group">Poroso</FormLabel>
        <Checkbox name="fraturado" checked={checked[1]} onChange={handleChange2} />
        <FormLabel id="demo-controlled-radio-buttons-group">Fraturado</FormLabel>
        {/** limpar */}
        <Button sx={{marginLeft: '1rem', marginRight: '1rem'}} onClick={handleChange3}><LayersClearIcon /></Button>
      </Box>
    </FormControl>
  )
}

export default ElemMapControllers;
