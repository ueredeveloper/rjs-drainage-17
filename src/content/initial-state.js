const initialState = () => {
    return (
        {
            overlays: {
                markers: [{
                    'id': 0,
                    'us_id': 0,
                    'sub_tp_id': 0,
                    'us_nome': '',
                    'us_cpf_cnpj': '',
                    'us_doc_id': 0,
                    'doc_end': 0,
                    'doc_sei': '',
                    'proc_sei': '',
                    'end_id': 0,
                    'end_logradouro': '',
                    'int_latitude': '',
                    'int_longitude': '',
                    'dt_demanda': {
                      'demandas': [],
                      'vol_anual_ma': '0'
                    },
                    'int_shape': { 'coordinates': [] }
              
                  }],
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
                    uh_label: "",
                    uh_nome: ""
                },
                hg_analyse: {
                    uh: "",
                    sistema: "",
                    cod_plan: "",
                    q_ex: 0,
                    n_points: 0,
                    q_points: 0,
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

export { initialState }