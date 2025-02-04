//const url = 'https://njs-drainage-ueredeveloper.replit.app';
const url = 'http://localhost:8080';
//const url = 'https://ec96a2d0-8ba3-41ec-9211-9dbcf7faee95-00-1dq8pdj62qrea.hacker.replit.dev'

/**
* Buscar a shape solicitada no servidor
* @param us_nome Nome do usuário de recursos hídricos.
* @param us_cpf_cnpj CPF ou CNPJ do usuário de recursos hídr
* @param doc_sei Número do documento no portal SEI.
* @param proc_sei Número do processo.
*
  */
async function getUsers(keyword) {

  let response = await fetch(url + `/user/list-by-keyword?keyword=${keyword}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })

  console.log(response)
  return response;
}

/** 
* Buscar as demandas de vazões de acordo com o usuário solicitado.
*/
async function findDemands(end_id) {

  let response = await fetch(url + `/interference/search-by-end-id?endId=${end_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/JSON',
      'Content-Type': 'application/JSON',
    }

  }).then(res => {
    return res.json();
  })

  return response;
}

export { getUsers, findDemands }