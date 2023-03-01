const initialState = () => {
    return (
        {
            overlays: {
                marker: {
                    id: null,
                    info: { id: null, tp_id: 1 },
                    position: { lat: -15.7749874, lng: -47.9402802 },     
                    user: {
                        "id": 5220,
                        "us_id": 36426,
                        "us_nome": "LAUNÍLIO DE SOUSA OLIVEIRA",
                        "us_cpf_cnpj": "31373119187",
                        "us_email": null,
                        "us_cep": " ",
                        "us_endereco": "Nucleo Rural Bananal, Chacara 13",
                        "us_caixa_postal": "0",
                        "us_bairro": " ",
                        "us_telefone_1": "6130332677",
                        "us_telefone_2": "",
                        "emp_id": 40996,
                        "emp_endereco": "NÚCLEO RURAL BANANAL, CHÁCARA 13",
                        "int_processo": "197000312/2007",
                        "int_id": 2473,
                        "int_num_ato": "003/2008",
                        "int_latitude": -15.725594,
                        "int_longitude": -47.901416,
                        "int_shape": {
                            "type": "Point",
                            "crs": {
                                "type": "name",
                                "properties": {
                                    "name": "EPSG:4674"
                                }
                            },
                            "coordinates": [
                                -47.901415533999966,
                                -15.72559362499993
                            ]
                        },
                        "int_data_publicacao": "2008-10-03T00:00:00.000Z",
                        "int_data_vencimento": "2099-12-31T00:00:00.000Z",
                        "ti_id": 2,
                        "ti_descricao": "SUBTERRANEA",
                        "sp_id": 4,
                        "sp_descricao": "OUTORGADO",
                        "tp_id": 1,
                        "tp_descricao": "MANUAL    ",
                        "to_tipo_outorga": 3,
                        "to_descricao": "REGISTRO DE USO",
                        "bh_id": 7,
                        "bh_nome": "Rio Paranoá",
                        "uh_id": 34,
                        "uh_nome": "Ribeirão Bananal",
                        "hg_codigo": "022_07_P1",
                        "hg_sistema": "P1",
                        "hg_subsistema": "",
                        "finalidades": {
                            "finalidades": {
                                "id_finalidade": "11791930",
                                "id_tipo_finalidade": "7",
                                "id_interferencia": "2473",
                                "vazao": "1200.0000",
                                "subfinalidade": " ",
                                "descricao": "ABASTECIMENTO HUMANO"
                            }
                        },
                        "demandas": {
                            "demandas": [],
                            "volume": {
                                "vol_a_ma": "1"
                            }
                        }
                    },
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
                    "_q_ex": 100,
                    "_q_ex_per": "100",
                    "_q_points": 50,
                    "_n_points": 39,
                    "_q_points_per": "0.21",
                    "_vol_avaiable": 100
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