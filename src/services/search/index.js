//const url = 'https://njs-drainage.ueredeveloper.repl.co';
const url = 'https://ec96a2d0-8ba3-41ec-9211-9dbcf7faee95-00-1dq8pdj62qrea.hacker.replit.dev'

/**
* Buscar a shape solicitada no servidor
* @param us_nome Nome do usuário de recursos hídricos.
* @param us_cpf_cnpj CPF ou CNPJ do usuário de recursos hídr
* @param doc_sei Número do documento no portal SEI.
* @param proc_sei Número do processo.
*
  */
export async function getUsers (us_nome, us_cpf_cnpj, doc_sei, proc_sei) {

    let response = await fetch(url + `/azure/getUsuarios?us_nome=${us_nome}&us_cpf_cnpj=${us_cpf_cnpj}&doc_sei=${doc_sei}&proc_sei=${proc_sei}`, {
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
  