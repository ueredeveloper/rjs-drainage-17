import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Wrapper } from "@googlemaps/react-wrapper";
import ElemMap from './elem-map';
import ElemMapControllers from './elem-map-controllers'


/**
* Element Home Map
*
*/
function ElemMapContent({ mode, center, zoom, onClick, map, setMap, data, setData }) {

  return (
    <Box style={{height: '20rem'}} >
      <Wrapper apiKey={"AIzaSyDELUXEV5kZ2MNn47NVRgCcDX-96Vtyj0w"} libraries={["drawing"]}>
        <ElemMap mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} />
      </Wrapper>
      
      
      
    </Box>
  )
}

export default ElemMapContent;