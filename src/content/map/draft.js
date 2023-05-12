<Wrapper apiKey={"AIzaSyDELUXEV5kZ2MNn47NVRgCcDX-96Vtyj0w"} libraries={["drawing"]}>
        <ElemMap mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} />
        {/* Desenhar círculos, polígonos etc */}
        <ElemDrawManager map={map} data={data} setData={setData} />
        {/*marcadores*/}
        {
          data.overlays.markers.map(markers => {
            return markers.points.map((info, ii) => {
              // coordenadas da outorga em formato geometry

              let [x, y] = info.int_shape.coordinates;
              return (
                <ElemMarker
                  key={ii}
                  info={info}
                  // coordenada em formato gmaps
                  options={{ position: { lat: y, lng: x }, map: map }} />)
            })
          })
        }
        {
          data.system.points.map((point, i) => {

            // capturar coordenadas
            let [x, y] = point.int_shape.coordinates;

            return (
              <ElemMarker
                key={i}
                info={{ id: Date.now(), tp_id: point.tp_id }}
                // coordenada em formato gmaps
                options={{ position: { lat: y, lng: x }, map: map }} />)
          })
        }
        {

          renderPolyline(data.system.hg_shape)}

        {
          data.shapes.fraturado.shapes.map((shape, i) => {
            return (
              <ElemPolygon key={i} shape={shape} map={map} />
            )
          })
        }
        {
          data.shapes.poroso.shapes.map((shape, i) => {
            return (
              <ElemPolygon key={i} shape={shape} map={map} />
            )
          })
        }

        {setMarker()}
      </Wrapper>