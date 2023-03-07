const initialState = () => {
    return (
        {
            overlays: {
                marker: {
                    id: null,
                    info: { id: null, tp_id: 1 },
                    position: { lat: -15.7749874, lng: -47.9402802 },     
                    user: {},
                },
                markers: [],
                circles: [],
                polygons: [],
                rectangles: []
            },
            system: {
                points: [],
                hg_shape: { type: null, coordinates: [] },
                hg_info: {
                    bacia_nome: "",
                    cod_plan: "",
                    re_cm_ano: 0,
                    sistema: "",
                    uh_codigo: 0,
                    uh_label: ""
                },
                hg_analyse: {
                    uh: "",
                    sistema: "",
                    q_ex: 0,
                    q_points: 0,
                    n_points: 0,
                    q_points_per: 0,
                    vol_avaiable: 0
                }
            },
            shapes: {
                fraturado: { checked: false, shapes: [] },
                poroso: { checked: false, shapes: [] }
            }
        }
    )
};

export {initialState}