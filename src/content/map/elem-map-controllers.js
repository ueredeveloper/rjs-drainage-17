import React, { useContext, useState } from 'react';
import { initialState } from '../initial-state'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { SystemContext } from '../elem-content';


function ElemMapControllers() {

  const [system, setSystem, overlays, setOverlays ] = useContext(SystemContext)

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
    /*
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

    )*/
  }

  function _setMapNull() {
    /* retirar figuras desenhadas no mapa */

    /*
    data.overlays.circles.forEach(c => {
      c.draw.setMap(null);
    });
    data.overlays.polygons.forEach(c => {
      c.draw.setMap(null);
    });
    data.overlays.rectangles.forEach(c => {
      c.draw.setMap(null);
    });
    //limpar objetos 
    setData(prev => {
      return {
        ...prev,
        overlays: initialState.overlays,
        system: initialState.system,
        shapes: initialState.shapes,

      }
    });*/
  }

  return (
    <FormControl style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ my: 1 }}>Shapes</FormLabel>
      <Paper elevation={3} style={{ padding: 1, margin: 1 }}>
        <Box>
          <Checkbox color="secondary" name="poroso" checked={checked[0]} onChange={handleChange1} />
          <FormLabel color="secondary" id="demo-controlled-radio-buttons-group">Poroso</FormLabel>
          <Checkbox color="secondary" name="fraturado" checked={checked[1]} onChange={handleChange2} />
          <FormLabel id="demo-controlled-radio-buttons-group">Fraturado</FormLabel>
          {/** limpar */}
          <Button sx={{ marginLeft: '1rem', marginRight: '1rem' }} onClick={handleChange3}><LayersClearIcon color="secondary" /></Button>
        </Box>
      </Paper>
    </FormControl>
  )
}

export default ElemMapControllers;
